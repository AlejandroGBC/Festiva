/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/services/conversaciones-list.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ConversacionListado } from "@/modules/cliente/chat/types/chat.types";

export async function getConversaciones(): Promise<ConversacionListado[]> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return [];

  // Conversaciones cuyo evento es del cliente logueado (mismo patrón de
  // filtro sobre tabla embebida que ya usamos en oferta-detalle.service.ts)
  const { data: conversacionesDb } = await supabase
    .from("tbl_conversaciones")
    .select(
      `
      id_conversacion,
      id_evento,
      id_proveedor,
      tbl_eventos!inner ( titulo, id_cliente ),
      tbl_perfiles_proveedor ( nombre_comercial )
    `
    )
    .eq("tbl_eventos.id_cliente", perfilCliente.id_cliente)
    .order("creado_en", { ascending: false });

  interface ConversacionRow {
    id_conversacion: string;
    id_evento: string;
    id_proveedor: string;
    tbl_eventos: { titulo: string; id_cliente: string } | null;
    tbl_perfiles_proveedor: { nombre_comercial: string } | null;
  }
  const conversaciones = (conversacionesDb ?? []) as unknown as ConversacionRow[];

  if (conversaciones.length === 0) return [];

  // Último mensaje + no leídos de cada conversación — se calcula acá
  // en vez de con una query agregada, mismo estilo que el resto del
  // proyecto (queries simples + join manual en JS).
  const idsConversaciones = conversaciones.map((c) => c.id_conversacion);

  const { data: mensajesDb } = await supabase
    .from("tbl_mensajes")
    .select("id_conversacion, id_remitente, contenido, leido_en, creado_en")
    .in("id_conversacion", idsConversaciones)
    .order("creado_en", { ascending: true });

  interface MensajeRow {
    id_conversacion: string;
    id_remitente: string;
    contenido: string;
    leido_en: string | null;
    creado_en: string;
  }
  const mensajes = (mensajesDb ?? []) as MensajeRow[];

  return conversaciones.map((c) => {
    const mensajesDeEsta = mensajes.filter((m) => m.id_conversacion === c.id_conversacion);
    const ultimo = mensajesDeEsta[mensajesDeEsta.length - 1];

    // No leídos: mensajes que NO mandé yo (los mandó el proveedor) y
    // que todavía no tienen leido_en.
    const noLeidos = mensajesDeEsta.filter(
      (m) => m.id_remitente !== user.id && m.leido_en === null
    ).length;

    return {
      id_conversacion: c.id_conversacion,
      id_evento: c.id_evento,
      id_proveedor: c.id_proveedor,
      proveedor_nombre: c.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor",
      evento_titulo: c.tbl_eventos?.titulo ?? "Evento",
      ultimo_mensaje: ultimo?.contenido ?? null,
      ultimo_mensaje_en: ultimo?.creado_en ?? null,
      mensajes_no_leidos: noLeidos,
    };
  });
}