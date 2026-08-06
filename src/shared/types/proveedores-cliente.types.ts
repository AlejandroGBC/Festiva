export type OrdenProveedores = "recomendados" | "mejor_calificados";

export interface EtiquetaCategoria {
  label: string;
  variant: "pink" | "violet" | "orange" | "mint";
}

export interface ProveedorListado {
  id: string;
  nombreComercial: string;
  iniciales: string;
  calificacion: number;
  cantidadResenas: number;
  verificado: boolean;
  imagenes: string[]; // vista previa del portafolio
  etiquetas: EtiquetaCategoria[];
  descripcion: string;
  precioDesde: number;
}