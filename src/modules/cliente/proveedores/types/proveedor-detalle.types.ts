/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/types/proveedor-detalle.types.ts
 */

export interface TrabajoPortafolio {
  id_portafolio: string;
  titulo: string;
  /** Primera imagen asociada a ese trabajo (portada). null si no subió ninguna. */
  imagen_portada: string | null;
}

export interface ResenaProveedor {
  id_calificacion: string;
  puntuacion: number;
  comentario: string | null;
  creada_en: string;
}

export interface ProveedorDetalle {
  id_proveedor: string;
  nombre_comercial: string;
  descripcion: string | null;
  ubicacion_base: string;
  especialidades: string[];
  calificacion_promedio: number | null;
  cantidad_calificaciones: number;
  cantidad_eventos_realizados: number;
  /** Año en que se registró como proveedor — para "Miembro desde 2023". */
  miembro_desde: number;
  portafolio: TrabajoPortafolio[];
  resenas: ResenaProveedor[];
}