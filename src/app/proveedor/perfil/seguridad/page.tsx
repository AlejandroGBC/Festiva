"use client";

import TopNavbar from "@/shared/components/TopNavbar";
import FormularioSeguridad from "@/modules/shared/perfil/components/FormularioSeguridad";
import { cambiarContrasenaProveedor } from "@/modules/proveedor/setting/services/setting.client";

export default function SeguridadProveedorPage() {
    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
            <TopNavbar title="Seguridad" />
            <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
                <FormularioSeguridad onCambiarContrasena={cambiarContrasenaProveedor} />
            </main>
        </div>
    );
}