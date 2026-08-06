/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/services/iniciar-conversacion.service.ts
 *
 * Corre en el SERVIDOR. Lo llama la página /cliente/chat/iniciar/[id_evento]/[id_proveedor].
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

/** Devuelve el id_conversacion existente para ese evento+proveedor, o
 *  crea uno nuevo si todavía no existe. Devuelve null si el evento no
 *  es del cliente logueado (seguridad). */
export async function buscarOCrearConversacion(
  idEvento: string,
  idProveedor: string
): Promise<string | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento, id_cliente")
    .eq("id_evento", idEvento)
    .maybeSingle();

  if (!evento || evento.id_cliente !== user.id) return null;

  const { data: existente } = await supabase
    .from("tbl_conversaciones")
    .select("id_conversacion")
    .eq("id_evento", idEvento)
    .eq("id_proveedor", idProveedor)
    .maybeSingle();

  if (existente) return existente.id_conversacion;

  const { data: nueva, error } = await supabase
    .from("tbl_conversaciones")
    .insert({ id_evento: idEvento, id_proveedor: idProveedor })
    .select("id_conversacion")
    .single();

  if (error || !nueva) return null;
  return nueva.id_conversacion;
}