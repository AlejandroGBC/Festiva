export interface StatsInicio{
    ingresosMes: string;
    ingresosVariacion : string;
    eventosActivos : number;
    eventosEnNegociacion : number;
    calificacion : number;
    cantidadResenas : number;
    tasaRespuesta : string;
}

export interface EventoRecomendado{
    id: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    cantidadPersonas: number;
    categorias: string[]
    rangoPrecio: string;
}

export interface InicioViewProps {
    stats: StatsInicio;
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