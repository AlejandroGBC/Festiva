export interface PagoProveedor {
  idPago: string;
  idEvento: string;          // Para navegar al detalle del evento
  nombreEvento: string;
  fechaPago: string | null;
  montoTotal: number;        // Lo que pagó el cliente
  comisionFestiva: number;   // 7% de comisión descontada
  montoProveedor: number;    // Neto recibido por el proveedor
  metodoPago: string | null;
  tarjetaMascara: string | null;
}

export interface ResumenPagosProveedor {
  totalRecibido: number;     // suma de monto_proveedor
  totalComisiones: number;   // suma de comision_festiva
  pagos: PagoProveedor[];
}
