export interface PagoCliente {
  idPago: string;
  nombreEvento: string;
  nombreProveedor: string;
  fechaPago: string | null;
  montoTotal: number;        // Lo que pagó el cliente (precio íntegro)
  metodoPago: string | null;
  tarjetaMascara: string | null;
}

export interface ResumenPagosCliente {
  totalGastado: number;      // suma de monto_total
  pagos: PagoCliente[];
}
