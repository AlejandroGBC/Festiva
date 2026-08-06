"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/services/evento-gestion.service.ts
 */

import { createClient } from "@/lib/supabase/client";

export interface ActualizarEventoDTO {
  titulo: string;
  descripcion: string;
  fecha_evento: string;
  ubicacion: string;
  cantidad_invitados: number;
  presupuesto_min: number | null;
  presupuesto_max: number | null;
}

export async function actualizarEvento(
  idEvento: string,
  payload: ActualizarEventoDTO
): Promise<void> {
  const supabase = createClient();

  if (!payload.titulo.trim()) throw new Error("El nombre del evento es obligatorio");
  if (!payload.descripcion.trim()) throw new Error("La descripción es obligatoria");
  if (!payload.fecha_evento) throw new Error("La fecha es obligatoria");
  if (!payload.ubicacion.trim()) throw new Error("La ubicación es obligatoria");
  if (!payload.cantidad_invitados || payload.cantidad_invitados <= 0) {
    throw new Error("La cantidad de invitados debe ser mayor a 0");
  }

  const { error } = await supabase
    .from("tbl_eventos")
    .update(payload)
    .eq("id_evento", idEvento);

  if (error) throw error;
}

export async function cancelarEvento(idEvento: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("tbl_eventos")
    .update({ estado: "cancelado" })
    .eq("id_evento", idEvento);
  if (error) throw error;
}

export async function finalizarEvento(idEvento: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("tbl_eventos")
    .update({ estado: "finalizado" })
    .eq("id_evento", idEvento);
  if (error) throw error;
}

export async function eliminarEvento(idEvento: string): Promise<void> {
  const supabase = createClient();

  // Solo se puede borrar de verdad si todavía no tiene ninguna oferta
  // (si ya tiene, hay que cancelar en vez de borrar — evita perder
  // ofertas reales de proveedores por un delete en cascada).
  const { count } = await supabase
    .from("tbl_ofertas")
    .select("id_evento", { count: "exact", head: true })
    .eq("id_evento", idEvento);

  if (count && count > 0) {
    throw new Error(
      "Este evento ya tiene ofertas — no se puede eliminar. Cancelalo en vez de borrarlo."
    );
  }

  const { error } = await supabase.from("tbl_eventos").delete().eq("id_evento", idEvento);
  if (error) throw error;
}