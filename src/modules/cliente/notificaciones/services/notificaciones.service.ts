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

  // NOTA TEMPORAL: "as any" mientras se corre migracion_notificaciones.sql
  // y se regeneran los tipos (npx supabase gen types ...). Sacar el cast
  // apenas notificaciones_vistas_en aparezca en supabase.types.ts.
  await supabase
    .from("tbl_perfiles_cliente")
    .update({ notificaciones_vistas_en: new Date().toISOString() } as any)
    .eq("id_cliente", user.id);
}