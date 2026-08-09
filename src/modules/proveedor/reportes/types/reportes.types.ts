export interface DatosReportes {
  ingresos: number;          
  egresos: number;           
  porcentajeIngresos: number; 
  historial: HistorialPago[]; 
  ingresosUltimosMeses: IngresosUltimosMeses[]; 
}

export interface HistorialPago {
  idPago: string;
  montoPago: number;
  nombreEvento: string;
  fechaPago: string | null; 
}

export interface IngresosUltimosMeses {
  mes: string;
  valor: number;
}