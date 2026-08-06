import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UsuarioSesion, RolUsuario } from "@/shared/types/auth.types";
import { apiError, apiSuccess } from "@/lib/api/api-response";

export async function POST(request: NextRequest) {
  const { correo, contrasena } = await request.json();

  if (!correo || !contrasena) {
    return apiError("Correo y contraseña son obligatorios", 400);
  }

  const supabase = await createServerSupabaseClient();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: correo,
    password: contrasena,
  });

  if (authError || !authData.user) {
    return apiError("Correo o contraseña incorrectos", 401);
  }

  const { data: perfil, error: perfilError } = await supabase
    .from("tbl_usuarios")
    .select("rol, nombre_completo")
    .eq("id_usuario", authData.user.id)
    .single();

  if (perfilError || !perfil) {
    return apiError("No se encontró el perfil del usuario", 404);
  }

  const data: UsuarioSesion = {
    id: authData.user.id,
    correo: authData.user.email!,
    // El enum real de la DB incluye 'admin', pero RolUsuario lo excluye
    // a propósito (esta app no maneja sesiones de admin vía este login).
    rol: perfil.rol as RolUsuario,
    nombre: perfil.nombre_completo,
  };

  return apiSuccess(data);
}