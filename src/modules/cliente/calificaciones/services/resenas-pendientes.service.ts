/**
 * src/modules/cliente/calificaciones/services/resenas-pendientes.service.ts
 *
 * Corre en el SERVIDOR. Detecta si el cliente autenticado tiene
 * algún evento finalizado con proveedores pagados sin calificar.
 * Se usa en la pantalla de inicio para mostrar el banner global.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ResenasPendientesInfo {
  /** true si hay al menos 1 contratación pagada sin calificación */
  tienePendientes: boolean;
  /** ID del primer evento que tiene reseñas pendientes (para el link del banner) */
  idEvento: string | null;
  /** Título del evento para mostrarlo en el banner */
  tituloEvento: string | null;
}

export async function getResenasPendientes(): Promise<ResenasPendientesInfo> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { tienePendientes: false, idEvento: null, tituloEvento: null };

  // 1. Obtener eventos finalizados del cliente
  const { data: eventosFinalizados } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo")
    .eq("id_cliente", user.id)
    .eq("estado", "finalizado");

  if (!eventosFinalizados || eventosFinalizados.length === 0) {
    return { tienePendientes: false, idEvento: null, tituloEvento: null };
  }

  // 2. Para cada evento finalizado, buscar si tiene contrataciones
  //    pagadas que aún no tienen calificación
  for (const evento of eventosFinalizados) {
    // Contrataciones del evento
    const { data: contrataciones } = await supabase
      .from("tbl_contrataciones")
      .select("id_contratacion")
      .eq("id_evento", evento.id_evento);

    if (!contrataciones || contrataciones.length === 0) continue;

    const idsContrataciones = contrataciones.map((c) => c.id_contratacion);

    // Contrataciones con pago confirmado
    const { data: pagadas } = await supabase
      .from("tbl_pagos")
      .select("id_pago")
      .in("id_pago", idsContrataciones)
      .eq("estado_pago", "pagado");

    if (!pagadas || pagadas.length === 0) continue;

    const idsPagadas = pagadas.map((p) => p.id_pago);

    // ¿Cuántas ya tienen calificación?
    const { count: totalCalificadas } = await supabase
      .from("tbl_calificaciones")
      .select("id_contratacion", { count: "exact", head: true })
      .in("id_contratacion", idsPagadas);

    const pendientes = idsPagadas.length - (totalCalificadas ?? 0);

    if (pendientes > 0) {
      // Encontramos el primer evento con reseñas pendientes
      return {
        tienePendientes: true,
        idEvento: evento.id_evento,
        tituloEvento: evento.titulo,
      };
    }
  }

  return { tienePendientes: false, idEvento: null, tituloEvento: null };
}
