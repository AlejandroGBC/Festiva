import { createClient } from '@/lib/supabase/client';

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