import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getPerfilProveedorServer() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: usuario } = await supabase
    .from("tbl_usuarios")
    .select("nombre_completo, correo, telefono")
    .eq("id_usuario", user.id)
    .maybeSingle();

  const { data: perfilProv } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("nombre_comercial")
    .eq("id_proveedor", user.id)
    .maybeSingle();

  if (!usuario) return null;

  return {
    nombreCompleto: perfilProv?.nombre_comercial || usuario.nombre_completo,
    correo: usuario.correo,
    telefono: usuario.telefono,
  };
}