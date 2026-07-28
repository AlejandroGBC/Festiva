import type { LucideIcon } from "lucide-react";

export type MarcaTarjeta = "visa" | "mastercard";

export interface ItemResumenPago {
  id: string;
  nombre: string;
  monto: number;
  icon: LucideIcon;
  destacado?: boolean; // para resaltar la fila de comisión en violeta
}

export interface MetodoPago {
  id: string;
  marca: MarcaTarjeta;
  ultimosDigitos: string;
  vencimiento: string;
}