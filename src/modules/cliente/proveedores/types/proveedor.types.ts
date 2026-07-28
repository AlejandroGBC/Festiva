/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/types/proveedor.types.ts
 */

export interface ProveedorTarjeta {
  id_proveedor: string;
  nombre_comercial: string;
  categoria: string;
  ciudad: string;
  foto_url: string | null;
  calificacion: number | null;
  cantidad_calificaciones: number;
  precio_desde: number | null;
  destacado: boolean;
}