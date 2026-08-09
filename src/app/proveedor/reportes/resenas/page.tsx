import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getResenasRecibidas } from "@/modules/proveedor/reportes/services/resenas-recibidas.service";
import ResenasRecibidasView from "@/modules/proveedor/reportes/components/ResenasRecibidasView";

export const metadata = {
  title: "Festiva – Mis reseñas",
  description: "Reseñas que los clientes te han dejado",
};

export default async function ResenasProveedorPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const data = await getResenasRecibidas();

  return <ResenasRecibidasView data={data} />;
}
