"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function enviarMensaje(idConversacion: string, contenido: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { error } = await supabase.from("tbl_mensajes").insert({
    id_conversacion: idConversacion,
    id_remitente: user.id,
    contenido,
  });

  if (error) throw new Error("No se pudo enviar el mensaje");
}