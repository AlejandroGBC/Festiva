import { createClient } from '@/lib/supabase/client';

/**
 * Subir imagen al portafolio al bucket 'portafolio'
 */
export async function uploadPortfolioImage(file: File, userId: string): Promise<string> {
    
    const supabase = createClient();
  
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('portafolio')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        throw new Error(`Error al subir imagen: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from('portafolio')
        .getPublicUrl(data.path);

    return publicUrlData.publicUrl; 
}

/**
 * Eliminar una o varias imágenes del bucket 'portafolio' dada su URL o path
 */
export async function deletePortfolioImages(filePathsOrUrls: string[]): Promise<void> {
    const supabase = createClient();

    const paths = filePathsOrUrls
        .map((url) => (url.includes('/portafolio/') 
        ? url.split('/portafolio/')[1] 
        : url))
        .filter(Boolean);

    if (paths.length === 0) return;

    const { error } = await supabase.storage
        .from('portafolio')
        .remove(paths);

    if (error) {
        console.error("Error al eliminar imágenes del portafolio en storage:", error.message);
  }
}

/**
 * Subir la foto de perfil al bucket 'avatars'
 */
export async function uploadAvatarImage(file: File, userId: string): Promise<string> {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (error) {
        throw new Error(`Error al subir la imagen de perfil: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

    return publicUrlData.publicUrl; 
}

/**
 * Eliminar una foto de perfil del bucket 'avatars' dada su URL o el path
 */
export async function deleteAvatarImage(filePathOrUrl: string): Promise<void> {
    const supabase = createClient();

    const path = filePathOrUrl.includes('/avatars/')
        ? filePathOrUrl.split('/avatars/')[1]
        : filePathOrUrl;

    if (!path) return;

    const { error } = await supabase.storage
        .from('avatars')
        .remove([path]);

    if (error) {
        console.error("Error al eliminar la imagen del storage:", error.message);
    }
}