import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api/api-response";
import type { EventoParaPropuesta } from "@/shared/types/enviar-propuesta-proveedor.types";

const VARIANTES: EventoParaPropuesta["categorias"][number]["variant"][] = [
  "pink",
  "violet",
  "orange",
  "mint",
];

function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-HN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

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

  const idProveedor = perfilProveedor.id_proveedor;

  // Seguridad: el evento debe seguir recibiendo ofertas
  const { data: evento, error } = await supabase
    .from("tbl_eventos")
    .select(
      "id_evento, titulo, descripcion, fecha_evento, ubicacion, cantidad_invitados, presupuesto_min, presupuesto_max, estado"
    )
    .eq("id_evento", id_evento)
    .eq("estado", "recibiendo_ofertas")
    .maybeSingle();

  if (error || !evento) return apiError("Evento no disponible para ofertar", 404);

  // Bloquea re-ofertar si ya mandó una oferta a este evento
  const { data: ofertaExistente } = await supabase
    .from("tbl_ofertas")
    .select("id_evento")
    .eq("id_evento", id_evento)
    .eq("id_proveedor", idProveedor)
    .maybeSingle();
  if (ofertaExistente) return apiError("Ya enviaste una oferta para este evento", 409);

  // Servicios del evento ∩ servicios del proveedor
  const [{ data: pedidosDb }, { data: ofrecidosDb }] = await Promise.all([
    supabase
      .from("tbl_evento_servicios")
      .select("id_servicio, tbl_servicios ( nombre )")
      .eq("id_evento", id_evento),
    supabase.from("tbl_proveedor_servicios").select("id_servicio").eq("id_proveedor", idProveedor),
  ]);

  interface PedidoRow {
    id_servicio: number;
    tbl_servicios: { nombre: string } | null;
  }
  const idsOfrecidos = new Set((ofrecidosDb ?? []).map((s) => s.id_servicio as number));

  const serviciosDisponibles = ((pedidosDb ?? []) as PedidoRow[])
    .filter((p) => idsOfrecidos.has(p.id_servicio) && p.tbl_servicios?.nombre)
    .map((p) => ({ id_servicio: p.id_servicio, nombre: p.tbl_servicios!.nombre }));

  if (serviciosDisponibles.length === 0) {
    return apiError("No ofrecés ninguno de los servicios que este evento solicita", 403);
  }

  const resultado: EventoParaPropuesta = {
    id_evento: evento.id_evento,
    titulo: evento.titulo,
    fecha: formatFecha(evento.fecha_evento),
    ubicacion: evento.ubicacion,
    cantidadPersonas: evento.cantidad_invitados,
    descripcion: evento.descripcion,
    presupuesto:
      evento.presupuesto_min && evento.presupuesto_max
        ? `L${(evento.presupuesto_min / 1000).toFixed(0)}k-L${(evento.presupuesto_max / 1000).toFixed(0)}k HN`
        : "Por definir",
    categorias: serviciosDisponibles.map((s, i) => ({
      label: s.nombre,
      variant: VARIANTES[i % VARIANTES.length],
    })),
    serviciosDisponibles,
  };

  return apiSuccess(resultado);
}