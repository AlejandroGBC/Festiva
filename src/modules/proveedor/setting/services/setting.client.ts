import { createClient } from "@/lib/supabase/client";

export async function actualizarDatosProveedor(payload: { nombreCompleto: string; telefono: string }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Debes iniciar sesión");

    const { error: errUsuario } = await supabase
        .from("tbl_usuarios")
        .update({ telefono: payload.telefono.trim() || null })
        .eq("id_usuario", user.id);

    if (errUsuario) throw errUsuario;

    const { error: errPerfil } = await supabase
        .from("tbl_perfiles_proveedor")
        .update({ nombre_comercial: payload.nombreCompleto.trim() })
        .eq("id_proveedor", user.id);

    if (errPerfil) throw errPerfil;
}

export async function cambiarContrasenaProveedor(nuevaContrasena: string) {
    const supabase = createClient();
    if (nuevaContrasena.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
    
    const { error } = await supabase.auth.updateUser({ password: nuevaContrasena });
    if (error) throw error;
}