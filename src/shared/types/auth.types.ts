export type RolUsuario = "cliente" | "proveedor" | "admin";

export interface UsuarioSesion {
  id: string;
  correo: string;
  rol: RolUsuario;
  nombre: string;
}