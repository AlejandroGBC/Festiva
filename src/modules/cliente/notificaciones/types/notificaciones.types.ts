export interface NotificacionItem {
  /** Clave compuesta id_evento-id_proveedor o id_evento para reseñas */
  id: string;
  tipo: "nueva_oferta" | "resena_pendiente";
  titulo: string;
  mensaje: string;
  fecha: string; // ISO
  nueva: boolean;
  href: string;
}