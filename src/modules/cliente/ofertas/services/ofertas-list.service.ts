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

  // 1. Eventos del cliente
  const { data: eventosDb, error: eventosError } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo")
    .eq("id_cliente", perfilCliente.id_cliente);

  if (eventosError || !eventosDb || eventosDb.length === 0) return VACIO;

  const idsEventos = eventosDb.map((e) => e.id_evento);

  // 2. Ofertas con JOIN anidado hacia tbl_usuarios para obtener la foto
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
      tbl_perfiles_proveedor (
        nombre_comercial,
        tbl_usuarios (
          foto_perfil_url
        )
      )
    `
    )
    .in("id_evento", idsEventos)
    .order("creada_en", { ascending: false });

  if (ofertasError) {
    console.error("Error al obtener ofertas:", ofertasError);
    return VACIO;
  }

  const eventoTituloPorId = new Map(eventosDb.map((e) => [e.id_evento, e.titulo]));

  // Interface actualizada para reflejar la relación con tbl_usuarios
  interface OfertaConProveedorRow {
    id_evento: string;
    id_proveedor: string;
    precio_total: number;
    descripcion_servicio: string | null;
    estado: OfertaListado["estado"];
    creada_en: string;
    tbl_perfiles_proveedor: {
      nombre_comercial: string;
      tbl_usuarios: {
        foto_perfil_url: string | null;
      } | null;
    } | null;
  }

  const ofertasTipadas = (ofertasDb ?? []) as unknown as OfertaConProveedorRow[];

  // 3. Calificación promedio por proveedor
  const idsProveedores = Array.from(
    new Set(ofertasTipadas.map((o) => o.id_proveedor))
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

  const ofertas: OfertaListado[] = ofertasTipadas.map((o) => ({
    id_evento: o.id_evento,
    evento_titulo: eventoTituloPorId.get(o.id_evento) ?? "Evento",
    id_proveedor: o.id_proveedor,
    proveedor_nombre: o.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor",
    proveedor_foto_url: o.tbl_perfiles_proveedor?.tbl_usuarios?.foto_perfil_url ?? null,
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