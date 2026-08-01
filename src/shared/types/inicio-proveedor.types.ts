export interface EstadisticaProveedor {
  label: string;
  valor: string;
  detalle: string;
  detalleColor?: string;
  detalleIcon?: React.ReactNode;
}

export interface EventoRecomendado {
  id: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  cantidadPersonas: number;
  categorias: { label: string; variant: "pink" | "violet" | "orange" }[];
  rangoPrecio: string;
  icon: React.ReactNode;
  iconBg: string;
}