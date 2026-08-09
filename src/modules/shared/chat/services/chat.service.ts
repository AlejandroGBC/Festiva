import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ConversacionListado, ConversacionDetalle, RolChat } from "../types/chat.types";

export async function getConversaciones(rol: RolChat): Promise<ConversacionListado[]> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  if (rol === "cliente") {
    const { data: perfilCliente } = await supabase
      .from("tbl_perfiles_cliente")
      .select("id_cliente")
      .eq("id_cliente", user.id)
      .maybeSingle();
    if (!perfilCliente) return [];
  }

  // Realizamos JOIN anidado a tbl_usuarios desde tbl_perfiles_proveedor
  let query = supabase
    .from("tbl_conversaciones")
    .select(
      `
      id_conversacion,
      id_evento,
      id_proveedor,
      tbl_eventos!inner ( titulo, id_cliente ),
      tbl_perfiles_proveedor (
        nombre_comercial,
        tbl_usuarios ( foto_perfil_url )
      )
    `
    )
    .order("creado_en", { ascending: false });

  query =
    rol === "cliente"
      ? query.eq("tbl_eventos.id_cliente", user.id)
      : query.eq("id_proveedor", user.id);

  const { data: conversacionesDb } = await query;

  interface ConversacionRow {
    id_conversacion: string;
    id_evento: string;
    id_proveedor: string;
    tbl_eventos: { titulo: string; id_cliente: string } | null;
    tbl_perfiles_proveedor: {
      nombre_comercial: string;
      tbl_usuarios: { foto_perfil_url: string | null } | null;
    } | null;
  }
  const conversaciones = (conversacionesDb ?? []) as unknown as ConversacionRow[];
  if (conversaciones.length === 0) return [];

  let clientePorId = new Map<string, { nombre: string; foto?: string | null }>();
  if (rol === "proveedor") {
    const idsClientes = Array.from(
      new Set(conversaciones.map((c) => c.tbl_eventos?.id_cliente).filter((id): id is string => Boolean(id)))
    );
    if (idsClientes.length > 0) {
      const { data: clientesDb } = await supabase
        .from("tbl_usuarios")
        .select("id_usuario, nombre_completo, foto_perfil_url")
        .in("id_usuario", idsClientes);
      
      clientePorId = new Map(
        (clientesDb ?? []).map((u) => [
          u.id_usuario as string,
          { nombre: u.nombre_completo as string, foto: u.foto_perfil_url as string | null },
        ])
      );
    }
  }

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

    const noLeidos = mensajesDeEsta.filter(
      (m) => m.id_remitente !== user.id && m.leido_en === null
    ).length;

    const infoCliente = clientePorId.get(c.tbl_eventos?.id_cliente ?? "");
    
    const nombreOtro =
      rol === "cliente"
        ? c.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor"
        : infoCliente?.nombre ?? "Cliente";

    const fotoPerfilOtro =
      rol === "cliente"
        ? c.tbl_perfiles_proveedor?.tbl_usuarios?.foto_perfil_url
        : infoCliente?.foto;

    return {
      id_conversacion: c.id_conversacion,
      id_evento: c.id_evento,
      id_proveedor: c.id_proveedor,
      nombre_otro: nombreOtro,
      foto_perfil_otro_url: fotoPerfilOtro ?? null,
      evento_titulo: c.tbl_eventos?.titulo ?? "Evento",
      ultimo_mensaje: ultimo?.contenido ?? null,
      ultimo_mensaje_en: ultimo?.creado_en ?? null,
      mensajes_no_leidos: noLeidos,
    };
  });
}

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
      tbl_perfiles_proveedor (
        nombre_comercial,
        tbl_usuarios ( foto_perfil_url )
      )
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
    tbl_perfiles_proveedor: {
      nombre_comercial: string;
      tbl_usuarios: { foto_perfil_url: string | null } | null;
    } | null;
  }
  const conv = conversacion as unknown as ConversacionRow;

  const esCliente = conv.tbl_eventos?.id_cliente === user.id;
  const esProveedor = conv.id_proveedor === user.id;

  if (!esCliente && !esProveedor) return null;

  let nombreOtro = "Usuario";
  let fotoPerfilOtroUrl: string | null = null;

  if (esCliente) {
    nombreOtro = conv.tbl_perfiles_proveedor?.nombre_comercial ?? "Proveedor";
    fotoPerfilOtroUrl = conv.tbl_perfiles_proveedor?.tbl_usuarios?.foto_perfil_url ?? null;
  } else if (conv.tbl_eventos?.id_cliente) {
    const { data: clienteUsuario } = await supabase
      .from("tbl_usuarios")
      .select("nombre_completo, foto_perfil_url")
      .eq("id_usuario", conv.tbl_eventos.id_cliente)
      .maybeSingle();
    nombreOtro = clienteUsuario?.nombre_completo ?? "Cliente";
    fotoPerfilOtroUrl = clienteUsuario?.foto_perfil_url ?? null;
  }

  const { data: mensajesDb } = await supabase
    .from("tbl_mensajes")
    .select("id_mensaje, id_conversacion, id_remitente, contenido, leido_en, creado_en")
    .eq("id_conversacion", idConversacion)
    .order("creado_en", { ascending: true });

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
    foto_perfil_otro_url: fotoPerfilOtroUrl,
    evento_titulo: conv.tbl_eventos?.titulo ?? "Evento",
    mensajes: (mensajesDb ?? []) as ConversacionDetalle["mensajes"],
  };
}

export async function buscarOCrearConversacion(
  idEvento: string,
  idProveedor: string,
  rol: RolChat
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
  if (!evento) return null;

  if (rol === "cliente" && evento.id_cliente !== user.id) return null;
  if (rol === "proveedor" && idProveedor !== user.id) return null;

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