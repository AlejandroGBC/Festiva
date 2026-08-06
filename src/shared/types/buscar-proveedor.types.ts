export interface CategoriaChip {
  label: string;
  variant: "pink" | "violet" | "orange" | "mint";
}

export interface EstadoEventoDisponible {
  tipo: "nuevo" | "vence_pronto";
  label: string;
}

export interface EventoDisponible {
  id: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  cantidadPersonas: number;
  categorias: CategoriaChip[];
  descripcion: string;
  presupuesto: string;
  estado?: EstadoEventoDisponible;
}