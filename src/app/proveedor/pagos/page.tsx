import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PagosProveedorView from "@/modules/proveedor/pagos/components/PagosProveedorView";
import { getPagosProveedor } from "@/modules/proveedor/pagos/services/pagos.service";

export const metadata = {
    title: "Mis Pagos · Festiva",
    description: "Historial completo de pagos recibidos en tu cuenta de proveedor Festiva.",
};

export default async function PagosProveedorPage() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/auth/login");

    const resumen = await getPagosProveedor(user.id);

    return <PagosProveedorView resumen={resumen} />;
}
