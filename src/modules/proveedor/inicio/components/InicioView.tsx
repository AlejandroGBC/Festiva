"use client";

import { useState } from "react";
import Sidebar from "@/shared/components/Sidebar";
import StatsGrid from "@/modules/proveedor/inicio/components/StatsGrid";
import EventosRecomendados from "@/modules/proveedor/inicio/components/EventosRecomendados";
import Header from "@/shared/components/HeaderInicio";
import { useAuthContext } from "@/lib/context/auth-context";
import { InicioViewProps } from "@/modules/proveedor/inicio/types/inicio.types";
import Loading from "@/shared/components/Loading";


export default function InicioView({ stats, eventos }: InicioViewProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, isLoading, signOut } = useAuthContext();

    if (isLoading) return <Loading fullScreen label="Cargando..." />;

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar w-full">
            <Header user={user} onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user!}
                signOut={signOut}
            />

            <section className="px-5">
                <div className="pb-6">
                    <p className="text-festiva-midnight-blue/45 text-sm pb-2">
                        Buenos días, proveedor
                    </p>
                    <h1 className="text-festiva-midnight-blue font-bold text-3xl">
                        {user?.nombre}
                    </h1>
                </div>

                <StatsGrid
                    ingresosMes={stats.ingresosMes}
                    ingresosVariacion={stats.ingresosVariacion}
                    eventosActivos={stats.eventosActivos}
                    eventosEnNegociacion={stats.eventosEnNegociacion}
                    calificacion={stats.calificacion}
                    cantidadResenas={stats.cantidadResenas}
                    tasaRespuesta={stats.tasaRespuesta}
                />

                <EventosRecomendados eventos={eventos} />
            </section>
        </div>
    );
}