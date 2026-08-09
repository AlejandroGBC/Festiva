export interface OfertaListado {
  id_evento: string;
  evento_titulo: string;
  id_proveedor: string;
  proveedor_nombre: string;
  precio_total: number | null;
  descripcion_servicio: string | null;
  estado: "enviada" | "aceptada" | "rechazada" | "cancelada";
  creada_en: string;
  calificacion_promedio: number | null;
  proveedor_foto_url: string | null
}

export interface EventoFiltro {
  id_evento: string;
  titulo: string;
  cantidad_ofertas: number;
}