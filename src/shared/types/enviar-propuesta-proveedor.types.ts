export interface ServicioIncluido {
  id: string;
  titulo: string;
  descripcion: string;
  incluido: boolean;
}

export interface EventoParaPropuesta {
  id_evento: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  cantidadPersonas: number;
  descripcion: string;
  presupuesto: string;
  categorias: { label: string; variant: "pink" | "violet" | "orange" | "mint" }[];
  serviciosDisponibles: { id_servicio: number; nombre: string }[];
}

export interface EnviarPropuestaPayload {
  id_evento: string;
  precio_total: number;
  mensaje: string;
  servicios_incluidos: number[]; // ids de tbl_servicios
}