/**
 * Ubicación sugerida:
 *   src/modules/cliente/notificaciones/types/notificaciones.types.ts
 */

export interface NotificacionItem {
  /** Clave compuesta id_evento-id_proveedor (tbl_ofertas no tiene PK propia) */
  id: string;
  tipo: "nueva_oferta";
  titulo: string;
  mensaje: string;
  fecha: string; // ISO
  nueva: boolean;
  href: string;
}