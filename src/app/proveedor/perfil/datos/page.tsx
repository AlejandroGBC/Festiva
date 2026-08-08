import { redirect } from "next/navigation";
import TopNavbar from "@/shared/components/TopNavbar";
import FormularioDatosPersonales from "@/modules/shared/perfil/components/FormularioDatosPersonales";
import { getPerfilProveedorServer } from "@/modules/proveedor/setting/services/setting.server";

export default async function DatosComercialesPage() {
    const perfil = await getPerfilProveedorServer();
    if (!perfil) redirect("/auth/login");

    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
            <TopNavbar title="Información comercial" />
            <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
                <FormularioDatosPersonales
                    perfil={perfil}
                    tituloLabel="Nombre comercial"
                />
            </main>
        </div>
    );
}