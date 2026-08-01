import { Enums } from "@/shared/types/supabase.types";

export type EstadoPropuesta = Enums<"estado_oferta_enum">;

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