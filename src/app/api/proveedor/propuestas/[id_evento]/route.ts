import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/api-response";
import { PropuestaDetalle } from "@/shared/types/propuestas-proveedor.types";

interface RouteParams {
  params: Promise<{ id_evento: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id_evento } = await params;
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("No autenticado", 401);

  const { data: perfilProveedor } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor")
    .eq("id_proveedor", user.id)
    .maybeSingle();
  if (!perfilProveedor) return apiError("No se encontró el perfil de proveedor", 404);

  // Seguridad: solo puede ver el detalle de SU PROPIA oferta
  const { data: ofertaDb, error } = await supabase
    .from("tbl_ofertas")
    .select(
      `
      id_evento,
      precio_total,
      descripcion_servicio,
      estado,
      creada_en,
      tbl_eventos (
        titulo,
        descripcion,
        fecha_evento,
        ubicacion,
        cantidad_invitados,
        presupuesto_min,
        presupuesto_max,
        id_cliente
      )
    `
    )
    .eq("id_evento", id_evento)
    .eq("id_proveedor", perfilProveedor.id_proveedor)
    .maybeSingle();

  if (error || !ofertaDb || !ofertaDb.tbl_eventos) {
    return apiError("Propuesta no encontrada", 404);
  }

  interface OfertaDetalleRow {
    id_evento: string;
    precio_total: number;
    descripcion_servicio: string | null;
    estado: PropuestaDetalle["estado"];
    creada_en: string;
    tbl_eventos: {
      titulo: string;
      descripcion: string;
      fecha_evento: string;
      ubicacion: string;
      cantidad_invitados: number;
      presupuesto_min: number | null;
      presupuesto_max: number | null;
      id_cliente: string;
    };
  }
  const of = ofertaDb as unknown as OfertaDetalleRow;

  const [coberturaRes] = await Promise.all([
    supabase
      .from("tbl_oferta_servicios")
      .select("tbl_servicios ( nombre )")
      .eq("id_evento", id_evento)
      .eq("id_proveedor", perfilProveedor.id_proveedor),

  ]);

  interface ServicioRow {
    tbl_servicios: { nombre: string } | null;
  }
  const servicios = ((coberturaRes.data ?? []) as ServicioRow[])
    .map((s) => s.tbl_servicios?.nombre)
    .filter((n): n is string => Boolean(n));

  const detalle: PropuestaDetalle = {
    id_evento: of.id_evento,
    id_cliente: of.tbl_eventos.id_cliente,
    tituloEvento: of.tbl_eventos.titulo,
    descripcionEvento: of.tbl_eventos.descripcion,
    ubicacion: of.tbl_eventos.ubicacion,
    fechaEvento: of.tbl_eventos.fecha_evento,
    cantidadInvitados: of.tbl_eventos.cantidad_invitados,
    presupuestoMin: of.tbl_eventos.presupuesto_min,
    presupuestoMax: of.tbl_eventos.presupuesto_max,
    precioTotal: of.precio_total,
    descripcionServicio: of.descripcion_servicio,
    estado: of.estado,
    creadaEn: of.creada_en,
    servicios,
  };

  return apiSuccess(detalle);
}