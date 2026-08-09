import { createClient } from "@/lib/supabase/client";
import { uploadAvatarImage, deleteAvatarImage } from "@/shared/services/upload.service";

export async function actualizarFotoPerfil(file: File | null): Promise<string | null> {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Debes iniciar sesión");

    let nuevaUrl: string | null = null;

    if (file) {
        nuevaUrl = await uploadAvatarImage(file, user.id);
    } else {
        const { data: usuarioActual } = await supabase
            .from("tbl_usuarios")
            .select("foto_perfil_url")
            .eq("id_usuario", user.id)
            .single();

        if (usuarioActual?.foto_perfil_url) {
            await deleteAvatarImage(usuarioActual.foto_perfil_url);
        }
    }

    const { error } = await supabase
        .from("tbl_usuarios")
        .update({ foto_perfil_url: nuevaUrl })
        .eq("id_usuario", user.id);

    if (error) throw error;

    return nuevaUrl;
}