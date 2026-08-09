import { createServerSupabaseClient } from "@/lib/supabase/server";
import ReportesView from "@/modules/proveedor/reportes/components/ReportesView"
import { getDatosReportes } from "@/modules/proveedor/reportes/services/reportes.service"

export default async function ReportesPage() {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User not found");
    }

    const datosReporte = await getDatosReportes(user.id)


    return <ReportesView datosReporte={datosReporte} />
}