import { createClient } from "@/lib/supabase/client";

export interface ActualizarDatosPersonalesDTO {
  nombreCompleto: string;
  telefono: string;
}

export async function actualizarDatosPersonales(
  payload: ActualizarDatosPersonalesDTO
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Debes iniciar sesión");

  if (!payload.nombreCompleto.trim()) {
    throw new Error("El nombre no puede estar vacío");
  }

  const { error } = await supabase
    .from("tbl_usuarios")
    .update({
      nombre_completo: payload.nombreCompleto.trim(),
      telefono: payload.telefono.trim() || null,
    })
    .eq("id_usuario", user.id);

  if (error) throw error;
}

export async function cambiarContrasena(nuevaContrasena: string): Promise<void> {
  const supabase = createClient();

  if (nuevaContrasena.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  const { error } = await supabase.auth.updateUser({ password: nuevaContrasena });
  if (error) throw error;
}