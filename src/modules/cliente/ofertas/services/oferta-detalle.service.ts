/**
 * Ubicación sugerida:
 *   src/modules/cliente/ofertas/services/oferta-detalle.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OfertaDetalle } from "@/modules/cliente/ofertas/types/oferta-detalle.types";

export async function getOfertaDetalle(
  idEvento: string,
  idProveedor: string
): Promise<OfertaDetalle | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return null;

  // La oferta + el evento al que pertenece, verificando en el mismo
  // filtro que el evento sea del cliente logueado (seguridad).
  const { data: oferta, error } = await supabase
    .from("tbl_ofertas")
    .select(
      `
      id_evento,
      id_proveedor,
      precio_total,
      descripcion_servicio,
      estado,
      creada_en,
      tbl_eventos!inner ( titulo, fecha_evento, id_cliente )
    `
    )
    .eq("id_evento", idEvento)
    .eq("id_proveedor", idProveedor)
    .eq("tbl_eventos.id_cliente", perfilCliente.id_cliente)
    .maybeSingle();

  if (error || !oferta) return null;

  interface OfertaRow {
    id_evento: string;
    id_proveedor: string;
    precio_total: number;
    descripcion_servicio: string | null;
    estado: OfertaDetalle["estado"] | null;
    creada_en: string | null;
    tbl_eventos: { titulo: string; fecha_evento: string; id_cliente: string } | null;
  }
  const of = oferta as unknown as OfertaRow;

  const [perfilRes, telefonoRes, serviciosRes, itemsRes, calificacionesRes] = await Promise.all([
    supabase
      .from("tbl_perfiles_proveedor")
      .select("nombre_comercial, ubicacion_base")
      .eq("id_proveedor", idProveedor)
      .maybeSingle(),

    supabase.from("tbl_usuarios").select("telefono").eq("id_usuario", idProveedor).maybeSingle(),

    supabase
      .from("tbl_proveedor_servicios")
      .select("tbl_servicios ( nombre )")
      .eq("id_proveedor", idProveedor),

    supabase
      .from("tbl_oferta_servicios")
      .select("tbl_servicios ( nombre )")
      .eq("id_evento", idEvento)
      .eq("id_proveedor", idProveedor),

    // Rating general del proveedor (todas sus contrataciones, no solo esta)
    supabase
      .from("tbl_contrataciones")
      .select("id_contratacion")
      .eq("id_proveedor", idProveedor),
  ]);

  interface ServicioRow {
    tbl_servicios: { nombre: string } | null;
  }
  const serviciosCubiertos = ((serviciosRes.data ?? []) as ServicioRow[])
    .map((s) => s.tbl_servicios?.nombre)
    .filter((n): n is string => Boolean(n));

  const categoria = serviciosCubiertos.length > 0
    ? serviciosCubiertos.join(" + ")
    : "Servicio";

  const itemsIncluidos = (itemsRes.data ?? []).map((i) => i.tbl_servicios?.nombre ?? "Servicio");

  let calificacionPromedio: number | null = null;
  const idsContrataciones = (calificacionesRes.data ?? []).map((c) => c.id_contratacion as string);
  if (idsContrataciones.length > 0) {
    const { data: calificacionesDb } = await supabase
      .from("tbl_calificaciones")
      .select("puntuacion")
      .in("id_contratacion", idsContrataciones);

    const puntuaciones = (calificacionesDb ?? []).map((c) => c.puntuacion as number);
    if (puntuaciones.length > 0) {
      const suma = puntuaciones.reduce((acc, p) => acc + p, 0);
      calificacionPromedio = Math.round((suma / puntuaciones.length) * 10) / 10;
    }
  }

  return {
    id_evento: of.id_evento,
    id_proveedor: of.id_proveedor,
    evento_titulo: of.tbl_eventos?.titulo ?? "Evento",
    evento_fecha: of.tbl_eventos?.fecha_evento ?? "",
    proveedor_nombre: perfilRes.data?.nombre_comercial ?? "Proveedor",
    proveedor_categoria: categoria,
    servicios_cubiertos: serviciosCubiertos,
    proveedor_ubicacion: perfilRes.data?.ubicacion_base ?? "",
    proveedor_telefono: telefonoRes.data?.telefono ?? null,
    proveedor_calificacion: calificacionPromedio,
    precio_total: of.precio_total,
    descripcion_servicio: of.descripcion_servicio,
    estado: of.estado ?? "enviada",
    creada_en: of.creada_en ?? new Date().toISOString(),
    items_incluidos: itemsIncluidos,
  };
}