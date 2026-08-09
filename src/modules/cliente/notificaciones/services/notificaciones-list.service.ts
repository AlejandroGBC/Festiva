/**
 * Corre en el SERVIDOR. Deriva "notificaciones" a partir de ofertas
 * recientes en vez de leer una tabla dedicada (no existe tbl_notificaciones).
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { NotificacionItem } from "@/modules/cliente/notificaciones/types/notificaciones.types";
import { getAllResenasPendientes } from "@/modules/cliente/calificaciones/services/resenas-pendientes.service";

export async function getNotificaciones(): Promise<NotificacionItem[]> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente, notificaciones_vistas_en")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return [];

  const { data: eventosDb } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo")
    .eq("id_cliente", perfilCliente.id_cliente);
  if (!eventosDb || eventosDb.length === 0) return [];

  const idsEventos = eventosDb.map((e) => e.id_evento);
  const tituloPorEvento = new Map(eventosDb.map((e) => [e.id_evento, e.titulo]));

  const { data: ofertasDb, error } = await supabase
    .from("tbl_ofertas")
    .select(
      `
      id_evento,
      id_proveedor,
      creada_en,
      tbl_perfiles_proveedor ( nombre_comercial )
    `
    )
    .in("id_evento", idsEventos)
    .order("creada_en", { ascending: false })
    .limit(30);

  if (error || !ofertasDb) return [];

  const vistasEn = perfilCliente.notificaciones_vistas_en
    ? new Date(perfilCliente.notificaciones_vistas_en)
    : null;

  interface OfertaNotifRow {
    id_evento: string;
    id_proveedor: string;
    creada_en: string;
    tbl_perfiles_proveedor: { nombre_comercial: string } | null;
  }

  const notificaciones: NotificacionItem[] = (ofertasDb as OfertaNotifRow[]).map((o) => ({
    id: `${o.id_evento}-${o.id_proveedor}`,
    tipo: "nueva_oferta" as const,
    titulo: "Nueva oferta recibida",
    mensaje: `${o.tbl_perfiles_proveedor?.nombre_comercial ?? "Un proveedor"} envió una oferta para "${
      tituloPorEvento.get(o.id_evento) ?? "tu evento"
    }"`,
    fecha: o.creada_en,
    nueva: !vistasEn || new Date(o.creada_en) > vistasEn,
    href: "/cliente/ofertas",
  }));

  // Agregar notificaciones de eventos finalizados con reseñas pendientes
  try {
    const resenasPendientes = await getAllResenasPendientes();
    for (const resena of resenasPendientes) {
      notificaciones.push({
        id: `resena-${resena.idEvento}`,
        tipo: "resena_pendiente" as const,
        titulo: "🎉 ¡Tu evento finalizó!",
        mensaje: `¿Cómo te fue en "${resena.tituloEvento}"? Califica a tus proveedores.`,
        fecha: resena.fechaEvento, // Usamos la fecha del evento como fecha de la notificación
        nueva: !vistasEn || new Date(resena.fechaEvento) > vistasEn,
        href: `/cliente/eventos/${resena.idEvento}/calificar`,
      });
    }
  } catch (err) {
    console.error("Error al obtener reseñas pendientes para notificaciones:", err);
  }

  // Ordenar todas las notificaciones por fecha (más recientes primero)
  return notificaciones.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export async function contarNotificacionesNuevas(): Promise<number> {
  const notificaciones = await getNotificaciones();
  return notificaciones.filter((n) => n.nueva).length;
}