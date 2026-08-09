export interface Mensaje {
  id_mensaje: string;
  id_conversacion: string;
  id_remitente: string;
  contenido: string;
  leido_en: string | null;
  creado_en: string;
}

export interface ConversacionListado {
  id_conversacion: string;
  id_evento: string;
  id_proveedor: string;
  nombre_otro: string;
  foto_perfil_otro_url?: string | null;
  evento_titulo: string;
  ultimo_mensaje: string | null;
  ultimo_mensaje_en: string | null;
  mensajes_no_leidos: number;
}

export interface ConversacionDetalle {
  id_conversacion: string;
  id_evento: string;
  id_proveedor: string;
  nombre_otro: string;
  foto_perfil_otro_url?: string | null;
  evento_titulo: string;
  mensajes: Mensaje[];
}

export type RolChat = "cliente" | "proveedor";