export interface RegistroProveedorFormData {
  nombreEmpresa: string;
  correo: string;
  especialidad: string;
  serviciosAdicionales: string[];
  ciudad: string;
  descripcion: string;
  contrasena: string;
}

export interface RegistroProveedorPayload extends RegistroProveedorFormData {}

export interface ServicioOption {
  id: string;
  label: string;
}