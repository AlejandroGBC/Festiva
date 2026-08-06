/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/services/conversacion-detalle.service.ts
 *   (y también sirve tal cual para el módulo proveedor, si le copiás
 *   la ruta de import de createServerSupabaseClient)
 *
 * Corre en el SERVIDOR. Funciona sin importar si quien la llama es el
 * cliente dueño del evento o el proveedor de la conversación — el
 * nombre_otro que devuelve se ajusta solo según quién esté mirando.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ConversacionDetalle } from "@/modules/cliente/chat/types/chat.types";

export async function getConversacionDetalle(
  idConversacion: string
): Promise<ConversacionDetalle | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: conversacion, error } = await supabase
    .from("tbl_conversaciones")
    .select(
      `
      id_conversacion,
      id_evento,
      id_proveedor,
      tbl_eventos ( titulo, id_cliente ),
      tbl_perfiles_proveedor ( nombre_comercial )
    `
    )
    .eq("id_conversacion", idConversacion)
    .maybeSingle();

  if (error || !conversacion) return null;

  interface ConversacionRow {
    id_conversacion: string;
    id_evento: string;
    id_proveedor: string;
    tbl_eventos: { titulo: string; id_cliente: string } | null;
    tbl_perfiles_proveedor: { nombre_comercial: string } | null;
  }
  const conv = conversacion as unknown as ConversacionRow;

  const esCliente = conv.tbl_eventos?.id_cliente === user.id;
  const esProveedor = conv.id_proveedor === user.id;

  // Ni cliente dueño del evento ni proveedor de la conversación — no
  // participa. La RLS ya lo bloquearía a nivel DB, pero devolvemos
  // null acá también para que la página haga notFound() en vez de
  // depender solo de la policy.
  if (!esCliente && !esProveedor) return null;

  // El nombre "del otro" cambia según quién está mirando: si soy
  // cliente, el otro es el proveedor; si soy proveedor, el otro es el
  // cliente (hay que ir a buscar su nombre a tbl_usuarios).
  let nombreOtro = "Usuario";
  if (esCliente) {
    nombreOtro = conv.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor";
  } else if (conv.tbl_eventos?.id_cliente) {
    const { data: clienteUsuario } = await supabase
      .from("tbl_usuarios")
      .select("nombre_completo")
      .eq("id_usuario", conv.tbl_eventos.id_cliente)
      .maybeSingle();
    nombreOtro = clienteUsuario?.nombre_completo ?? "Cliente";
  }

  const { data: mensajesDb } = await supabase
    .from("tbl_mensajes")
    .select("id_mensaje, id_conversacion, id_remitente, contenido, leido_en, creado_en")
    .eq("id_conversacion", idConversacion)
    .order("creado_en", { ascending: true });

  // Marcar como leídos los mensajes del OTRO participante (no los
  // míos) que todavía no tenían leido_en. No esperamos el resultado
  // para no bloquear el render.
  supabase
    .from("tbl_mensajes")
    .update({ leido_en: new Date().toISOString() })
    .eq("id_conversacion", idConversacion)
    .neq("id_remitente", user.id)
    .is("leido_en", null)
    .then(() => {});

  return {
    id_conversacion: conv.id_conversacion,
    id_evento: conv.id_evento,
    id_proveedor: conv.id_proveedor,
    nombre_otro: nombreOtro,
    evento_titulo: conv.tbl_eventos?.titulo ?? "Evento",
    mensajes: (mensajesDb ?? []) as ConversacionDetalle["mensajes"],
  };
}