/** 
Constante y cálculo de comisión de la plataforma Festiva.

Flujo:
- El cliente paga el precio que puso del proveedor y nosotros (Festiva) descontamos la comisión antes de transferir al proveedor.
- La tasa fija se puede cambiar en COMISION_FESTIVA_PCT.
 */


export const COMISION_FESTIVA_PCT = 0.07; //Tasa de comisión.

export interface ResultadoComision {
  monto_total: number; //precioo integro que paga cliente
  comision_festiva: number; //Comisión que retiene Festiva
  monto_proveedor: number; // Monto neto que recibe el proveedor.
}

/**
  Función para calcular la distribución del pago entre proveedor y Festiva.
 
  @param montoTotal - Precio íntegro que pagará el cliente
  @returns Objeto con `monto_total`, `comision_festiva` y `monto_proveedor`.
 
  @example
  calcularComision(20_000)
  { monto_total: 20000, comision_festiva: 1400, monto_proveedor: 18600 }
 */
export function calcularComision(montoTotal: number): ResultadoComision {
  const comision_festiva = Math.round(montoTotal * COMISION_FESTIVA_PCT);
  const monto_proveedor = montoTotal - comision_festiva;
  return { monto_total: montoTotal, comision_festiva, monto_proveedor };
}
