/**
 * Ubicación sugerida:
 *   src/modules/cliente/ofertas/types/oferta-detalle.types.ts
 */

export interface OfertaDetalle {
  id_evento: string;
  id_proveedor: string;
  evento_titulo: string;
  evento_fecha: string;
  proveedor_nombre: string;
  proveedor_categoria: string;
  proveedor_ubicacion: string;
  proveedor_telefono: string | null;
  proveedor_calificacion: number | null;
  precio_total: number;
  servicios_cubiertos: string[];
  descripcion_servicio: string | null;
  estado: "enviada" | "aceptada" | "rechazada" | "cancelada";
  creada_en: string;
  items_incluidos: string[];
}