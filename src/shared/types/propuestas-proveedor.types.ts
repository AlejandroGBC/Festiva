export type EstadoPropuesta = "enviada" | "aceptada" | "rechazada" | "cancelada";
export type TabPropuestas = "enviadas" | "aceptadas" | "rechazadas";

export interface Propuesta {
  id: string;
  tituloEvento: string;
  ubicacion: string;
  fechaEvento: string;
  cantidadInvitados: number;
  actividadReciente: string; // "Enviada hace 2h"
  precioTotal: number;
  estado: EstadoPropuesta;
  servicios?: string[]; // si viene vacío, la tarjeta muestra "Ver detalle" en vez de "Chat + Ver"
  progresoPago?: number; // 0-100, solo aplica si estado === "aceptada"
}