export interface StatsInicio{
    ingresosMes: string;
    ingresosVariacion : string;
    eventosActivos : number;
    eventosEnNegociacion : number;
    calificacion : number;
    cantidadResenas : number;
    tasaRespuesta : string;
}

export interface InicioViewProps {
    stats: StatsInicio;
    eventos : EventoRecomendado[];
}

export interface StatsGridProps {
  ingresosMes: string;
  ingresosVariacion: string;
  eventosActivos: number;
  eventosEnNegociacion: number;
  calificacion: number;
  cantidadResenas: number;
  tasaRespuesta: string;
}

export interface EventoRecomendado {
  id_evento: string;         
  titulo: string;
  fecha: string;
  ubicacion: string;
  cantidadPersonas: number;
  categorias_evento: { label: string; variant: string }[];
  rangoPrecio: string;
  puntuacion: number;       
}