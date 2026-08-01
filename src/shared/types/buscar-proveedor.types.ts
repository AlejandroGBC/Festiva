export type EstadoUrgencia = "nuevo" | "vence_pronto" | null;

export interface EventoDisponible {
  id: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  cantidadPersonas: number;
  categorias: { label: string; variant: "pink" | "violet" | "orange" | "mint" }[];
  descripcion: string;
  presupuesto: string;
  estado?: { tipo: EstadoUrgencia; label: string };
}