import { Enums } from "@/shared/types/supabase.types";

export type RolUsuario = Enums<"tipo_usuario_enum">;

export interface UsuarioSesion {
  id: string;
  correo: string;
  rol: RolUsuario;
  nombre: string;
}