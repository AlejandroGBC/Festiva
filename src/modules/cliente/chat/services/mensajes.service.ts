"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/services/mensajes.service.ts
 *
 * A diferencia de los otros *.service.ts del proyecto (que corren en
 * servidor), este corre en el CLIENTE — porque enviar un mensaje es
 * una acción disparada por el usuario en vivo, y así el mismo cliente
 * de Supabase que ya está suscrito a Realtime hace el insert. La RLS
 * de tbl_mensajes ya garantiza que nadie pueda mandar un mensaje
 * haciéndose pasar por otro usuario ni escribir en una conversación
 * ajena, así que no hace falta pasar por una API route.
 */

import { createClient } from "@/lib/supabase/client";

export async function enviarMensaje(idConversacion: string, contenido: string): Promise<void> {
  const texto = contenido.trim();
  if (!texto) return;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No hay sesión activa");

  const { error } = await supabase.from("tbl_mensajes").insert({
    id_conversacion: idConversacion,
    id_remitente: user.id,
    contenido: texto,
  });

  if (error) throw new Error(error.message);
}