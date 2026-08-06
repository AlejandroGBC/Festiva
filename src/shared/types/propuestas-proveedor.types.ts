import { Enums } from "@/shared/types/supabase.types";

export type EstadoPropuesta = Enums<"estado_oferta_enum">;

export type TabPropuestas = "enviadas" | "aceptadas" | "rechazadas";

export interface Propuesta {
  id: string;              // usamos id_evento como id, ya que id_proveedor es siempre el usuario logueado
  id_evento: string;
  id_cliente: string;      // necesario para armar el link del chat
  tituloEvento: string;
  ubicacion: string;
  fechaEvento: string;
  cantidadInvitados: number;
  actividadReciente: string;
  precioTotal: number;
  estado: EstadoPropuesta;
  servicios?: string[];
  progresoPago?: number;
}

export interface PropuestaDetalle {
  id_evento: string;
  id_cliente: string;
  tituloEvento: string;
  descripcionEvento: string;
  ubicacion: string;
  fechaEvento: string;
  cantidadInvitados: number;
  presupuestoMin: number | null;
  presupuestoMax: number | null;
  precioTotal: number;
  descripcionServicio: string | null;
  estado: EstadoPropuesta;
  creadaEn: string;
  servicios: string[];
}