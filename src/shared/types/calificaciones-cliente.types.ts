export interface ProveedorCalificado {
  nombreComercial: string;
  iniciales: string;
  servicio: string;
  evento: string;
}

/** Datos de una contratación que aún no tiene calificación. */
export interface ContratacionParaCalificar {
  id_contratacion: string;
  id_proveedor: string;
  nombre_comercial: string;
  iniciales: string;
  servicios: string[];
  titulo_evento: string;
}