export type EstadoContratacion = "confirmado" | "pendiente";
export type TimelineStatus = "completado" | "actual" | "pendiente";
export type TimelineIcono = "check" | "calendar" | "award";

export interface ProveedorContratado {
  id: string;
  nombreComercial: string;
  iniciales: string;
  servicio: string;
  monto: number;
  estado: EstadoContratacion;
}

export interface TimelinePaso {
  titulo: string;
  descripcion: string;
  fecha: string;
  status: TimelineStatus;
  icon: TimelineIcono;
}