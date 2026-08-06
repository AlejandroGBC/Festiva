/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/types/evento-detalle.types.ts
 */

export type EstadoEvento = "recibiendo_ofertas" | "en_proceso" | "finalizado" | "cancelado";

export interface ProveedorContratado {
  id_contratacion: string;
  id_proveedor: string;
  nombre_comercial: string;
  /** Categoría a mostrar — servicio en común entre lo pedido por el
   * evento y lo que ofrece el proveedor; si no hay match, cae al
   * primer servicio del proveedor, y si tampoco hay, a un texto genérico. */
  categoria: string;
  precio_total: number;
  /** true = tbl_pagos.estado_pago === "pagado" para esta contratación.
   * Cualquier otro estado (pendiente/fallido/reembolsado) o ausencia
   * de registro de pago se trata como no confirmado. */
  confirmado: boolean;
  /** Teléfono del proveedor (tbl_usuarios.telefono) para el botón de
   * WhatsApp. null si todavía no lo cargó. */
  telefono: string | null;
}

export type EstadoHito = "completado" | "actual" | "pendiente";

export interface TimelineHito {
  id: "publicado" | "ofertas" | "seleccionados" | "pago" | "realizado";
  titulo: string;
  descripcion: string;
  /** Ya formateada para mostrar (ej. "15 mayo, 2026" o "18-25 mayo, 2026"). null si el hito todavía no ocurrió. */
  fecha: string | null;
  estado: EstadoHito;
}

export interface EventoDetalle {
  id_evento: string;
  titulo: string;
  descripcion: string;
  fecha_evento: string;
  ubicacion: string;
  cantidad_invitados: number;
  presupuesto_min: number | null;
  presupuesto_max: number | null;
  estado: EstadoEvento;
  id_tipo_evento: number;
  tipo_evento: string;
  servicios: string[];
  cantidad_ofertas: number;
  creado_en: string;

  // ── Datos para la vista enriquecida ──
  proveedores_contratados: ProveedorContratado[];
  timeline: TimelineHito[];
  /** 0-100, calculado en el service a partir de los 5 hitos del timeline. */
  progreso_porcentaje: number;
}