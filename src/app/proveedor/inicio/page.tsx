// app/(proveedor)/inicio/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getStatsInicio } from "@/modules/proveedor/inicio/services/stats.service";
import { getEventosRecomendados } from "@/modules/proveedor/inicio/services/eventos.service";
import InicioView from "@/modules/proveedor/inicio/components/InicioView";

export default async function InicioProveedorPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const stats = await getStatsInicio(user.id);

  const eventos = await getEventosRecomendados(user.id)

  return <InicioView stats={stats} eventos={eventos} />;
}