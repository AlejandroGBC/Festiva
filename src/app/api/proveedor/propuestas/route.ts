import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiError, apiSuccess } from "@/lib/api/api-response";
import { EstadoPropuesta, Propuesta } from "@/shared/types/propuestas-proveedor.types";
import { formatFecha, tiempoRelativo } from "@/shared/utils/tiempo";

interface OfertaRow {
  id_evento: string;
  precio_total: number;
  estado: EstadoPropuesta;
  creada_en: string;
  tbl_eventos: {
    titulo: string;
    ubicacion: string;
    fecha_evento: string;
    cantidad_invitados: number;
    id_cliente: string;
  } | null;
}

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return apiError("No autenticado", 401);
  }

  const { data: perfilProveedor, error: perfilError } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor")
    .eq("id_proveedor", user.id)
    .maybeSingle();

  if (perfilError || !perfilProveedor) {
    return apiError("No se encontró el perfil de proveedor", 404);
  }

  const idProveedor = perfilProveedor.id_proveedor;

  // ── Ofertas del proveedor, con datos del evento asociado ──
  const { data: ofertasDb, error } = await supabase
    .from("tbl_ofertas")
    .select(
      `
      id_evento,
      precio_total,
      estado,
      creada_en,
      tbl_eventos ( titulo, ubicacion, fecha_evento, cantidad_invitados, id_cliente )
    `
    )
    .eq("id_proveedor", idProveedor)
    .order("creada_en", { ascending: false });

  if (error || !ofertasDb) {
    return apiSuccess([]);
  }

  const ofertas = (ofertasDb as unknown as OfertaRow[]).filter((o) => o.tbl_eventos !== null);
  const idsEventos = ofertas.map((o) => o.id_evento);

  if (idsEventos.length === 0) {
    return apiSuccess([]);
  }

  // ── Servicios que esta oferta cubre, por evento ──
  const { data: coberturaDb } = await supabase
    .from("tbl_oferta_servicios")
    .select("id_evento, tbl_servicios ( nombre )")
    .eq("id_proveedor", idProveedor)
    .in("id_evento", idsEventos);

  interface CoberturaRow {
    id_evento: string;
    tbl_servicios: { nombre: string } | null;
  }
  const serviciosPorEvento = new Map<string, string[]>();
  for (const row of (coberturaDb ?? []) as CoberturaRow[]) {
    const nombre = row.tbl_servicios?.nombre;
    if (!nombre) continue;
    const lista = serviciosPorEvento.get(row.id_evento) ?? [];
    lista.push(nombre);
    serviciosPorEvento.set(row.id_evento, lista);
  }

  // ── Progreso de pago (solo relevante para ofertas aceptadas) ──
  const idsEventosAceptados = ofertas.filter((o) => o.estado === "aceptada").map((o) => o.id_evento);
  const progresoPorEvento = new Map<string, number>();

  if (idsEventosAceptados.length > 0) {
    const { data: contratacionesDb } = await supabase
      .from("tbl_contrataciones")
      .select("id_contratacion, id_evento")
      .eq("id_proveedor", idProveedor)
      .in("id_evento", idsEventosAceptados);

    const idsContrataciones = (contratacionesDb ?? []).map((c) => c.id_contratacion as string);

    if (idsContrataciones.length > 0) {
      const { data: pagosDb } = await supabase
        .from("tbl_pagos")
        .select("id_pago, estado_pago")
        .in("id_pago", idsContrataciones);

      const estadoPorContratacion = new Map(
        (pagosDb ?? []).map((p) => [p.id_pago as string, p.estado_pago as string])
      );

      for (const c of contratacionesDb ?? []) {
        const estadoPago = estadoPorContratacion.get(c.id_contratacion as string);
        progresoPorEvento.set(c.id_evento as string, estadoPago === "pagado" ? 100 : 0);
      }
    }
  }

  // ── Armar respuesta ──
  const propuestas: Propuesta[] = ofertas.map((o) => {
    const evento = o.tbl_eventos!;
    const esAceptada = o.estado === "aceptada";

    return {
      id: o.id_evento,
      id_evento: o.id_evento,
      id_cliente: evento.id_cliente,
      tituloEvento: evento.titulo,
      ubicacion: evento.ubicacion,
      fechaEvento: formatFecha(evento.fecha_evento),
      cantidadInvitados: evento.cantidad_invitados,
      actividadReciente: esAceptada ? "" : `Enviada ${tiempoRelativo(o.creada_en)}`,
      precioTotal: o.precio_total,
      estado: o.estado,
      servicios: esAceptada ? undefined : serviciosPorEvento.get(o.id_evento) ?? [],
      progresoPago: esAceptada ? progresoPorEvento.get(o.id_evento) ?? 0 : undefined,
    };
  });

  return apiSuccess(propuestas);
}