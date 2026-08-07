import type { LucideIcon } from "lucide-react";

export type MarcaTarjeta = "visa" | "mastercard";

/**
  Datos que necesita la page de confirmación de pago.
  El cliente solo ve el precio íntegro del proveedor
  la comisión es un cálculo interno guardado en tbl_pagos.
 */
export interface ResumenPago {
  id_contratacion: string;
  id_evento: string;
  nombre_proveedor: string; 
  servicio: string; // sservicios cubiertos por esta contratación
  monto_total: number; // precio integro que paga el cliente
}

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