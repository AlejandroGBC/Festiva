export interface RegistroProveedorFormData {
  nombreEmpresa: string;
  correo: string;
  contrasena: string;
  rol: "proveedor";
  ciudad: string;
  descripcion: string;
  especialidad: string;
  serviciosAdicionales: number[];
}

export interface RegistroProveedorPayload {
  nombreCompleto: string;
  correo: string;
  contrasena: string;
  rol: "proveedor";
  ciudad: string;
  descripcion: string;
  especialidad: string;
  serviciosAdicionales: number[];
}

export interface ServicioOption {
  id: string;
  label: string;
}