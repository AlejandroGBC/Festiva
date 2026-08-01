/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/types/chat.types.ts
 */

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
  proveedor_nombre: string;
  evento_titulo: string;
  ultimo_mensaje: string | null;
  ultimo_mensaje_en: string | null;
  mensajes_no_leidos: number;
}

export interface ConversacionDetalle {
  id_conversacion: string;
  id_evento: string;
  id_proveedor: string;
  /** Nombre de la OTRA persona en la conversación — si quien mira es
   * el cliente, es el nombre del proveedor; si quien mira es el
   * proveedor, es el nombre del cliente. */
  nombre_otro: string;
  evento_titulo: string;
  mensajes: Mensaje[];
}