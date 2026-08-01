export interface PuntoIngresoMensual {
  mes: string;
  monto: number;
}

export type TipoTransaccion = "ingreso" | "comision";

export interface TransaccionHistorial {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  monto: number;
  tipo: TipoTransaccion;
}