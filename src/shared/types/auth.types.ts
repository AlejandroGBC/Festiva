export type RolUsuario = "cliente" | "proveedor";

export interface UsuarioSesion {
  id: string;
  correo: string;
  rol: RolUsuario;
  nombre: string;
}