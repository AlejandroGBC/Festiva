import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PagosClienteView from "@/modules/cliente/pagos/components/PagosClienteView";
import { getPagosCliente } from "@/modules/cliente/pagos/services/historial-pagos.service";

export const metadata = {
    title: "Mis Pagos · Festiva",
    description: "Historial de pagos realizados en tus eventos de Festiva.",
};

export default async function PagosClientePage() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/auth/login");

    const resumen = await getPagosCliente(user.id);

    return <PagosClienteView resumen={resumen} />;
}
