/**
 * Ubicación sugerida:
 *   src/modules/cliente/ofertas/services/ofertas-list.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx (Server Component),
 * sin hook, según la regla del proyecto.
 *
 * Cadena de relaciones real (confirmada por ERD):
 *   tbl_ofertas.id_evento     → tbl_eventos.id_evento
 *   tbl_ofertas.id_proveedor  → tbl_perfiles_proveedor.id_proveedor
 *   tbl_calificaciones.id_contratacion → tbl_contrataciones.id_contratacion
 *   tbl_contrataciones.id_proveedor    → tbl_perfiles_proveedor.id_proveedor
 * (la calificación es por trabajo confirmado, no por oferta directa)
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  OfertaListado,
  EventoFiltro,
} from "@/modules/cliente/ofertas/types/ofertas.types";

export interface OfertasRecibidasData {
  eventos: EventoFiltro[];
  ofertas: OfertaListado[];
}

const VACIO: OfertasRecibidasData = { eventos: [], ofertas: [] };

export async function getOfertasRecibidas(): Promise<OfertasRecibidasData> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return VACIO;

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return VACIO;

  // 1. Eventos del cliente (para los filtros y para saber el título)
  const { data: eventosDb, error: eventosError } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo")
    .eq("id_cliente", perfilCliente.id_cliente);

  if (eventosError || !eventosDb || eventosDb.length === 0) return VACIO;

  const idsEventos = eventosDb.map((e) => e.id_evento);

  // 2. Ofertas de esos eventos, con el nombre comercial del proveedor
  const { data: ofertasDb, error: ofertasError } = await supabase
    .from("tbl_ofertas")
    .select(
      `
      id_evento,
      id_proveedor,
      precio_total,
      descripcion_servicio,
      estado,
      creada_en,
      tbl_perfiles_proveedor ( nombre_comercial )
    `
    )
    .in("id_evento", idsEventos)
    .order("creada_en", { ascending: false });

  if (ofertasError) {
    console.error("Error al obtener ofertas:", ofertasError);
    return VACIO;
  }

  const eventoTituloPorId = new Map(eventosDb.map((e) => [e.id_evento, e.titulo]));

  // 3. Calificación promedio por proveedor (best-effort: si falla, seguimos sin ella)
  const idsProveedores = Array.from(
    new Set((ofertasDb ?? []).map((o: any) => o.id_proveedor as string))
  );
  const calificacionPorProveedor = new Map<string, number>();

  if (idsProveedores.length > 0) {
    const { data: contratacionesDb } = await supabase
      .from("tbl_contrataciones")
      .select("id_contratacion, id_proveedor")
      .in("id_proveedor", idsProveedores);

    if (contratacionesDb && contratacionesDb.length > 0) {
      const contratacionAProveedor = new Map(
        contratacionesDb.map((c) => [c.id_contratacion, c.id_proveedor])
      );
      const idsContrataciones = contratacionesDb.map((c) => c.id_contratacion);

      const { data: calificacionesDb } = await supabase
        .from("tbl_calificaciones")
        .select("id_contratacion, puntuacion")
        .in("id_contratacion", idsContrataciones);

      if (calificacionesDb) {
        const acumulado = new Map<string, { suma: number; cantidad: number }>();
        for (const cal of calificacionesDb) {
          const idProveedor = contratacionAProveedor.get(cal.id_contratacion);
          if (!idProveedor) continue;
          const actual = acumulado.get(idProveedor) ?? { suma: 0, cantidad: 0 };
          actual.suma += cal.puntuacion;
          actual.cantidad += 1;
          acumulado.set(idProveedor, actual);
        }
        Array.from(acumulado.entries()).forEach(([idProveedor, { suma, cantidad }]) => {
          calificacionPorProveedor.set(idProveedor, Math.round((suma / cantidad) * 10) / 10);
        });
      }
    }
  }

  const ofertas: OfertaListado[] = (ofertasDb ?? []).map((o: any) => ({
    id_evento: o.id_evento,
    evento_titulo: eventoTituloPorId.get(o.id_evento) ?? "Evento",
    id_proveedor: o.id_proveedor,
    proveedor_nombre: o.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor",
    precio_total: o.precio_total,
    descripcion_servicio: o.descripcion_servicio,
    estado: o.estado,
    creada_en: o.creada_en,
    calificacion_promedio: calificacionPorProveedor.get(o.id_proveedor) ?? null,
  }));

  const eventos: EventoFiltro[] = eventosDb.map((e) => ({
    id_evento: e.id_evento,
    titulo: e.titulo,
    cantidad_ofertas: ofertas.filter((o) => o.id_evento === e.id_evento).length,
  }));

  return { eventos, ofertas };
}