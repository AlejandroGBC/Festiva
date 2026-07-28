/**
 * Ubicación sugerida:
 *   src/modules/cliente/notificaciones/services/notificaciones.service.ts
 *
 * Corre en el CLIENTE. Se llama al entrar a la página de notificaciones,
 * para actualizar notificaciones_vistas_en = ahora.
 */

import { createClient } from "@/lib/supabase/client";

export async function marcarNotificacionesVistas(): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("tbl_perfiles_cliente")
    .update({ notificaciones_vistas_en: new Date().toISOString() })
    .eq("id_cliente", user.id);
}