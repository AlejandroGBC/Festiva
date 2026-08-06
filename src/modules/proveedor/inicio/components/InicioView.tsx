"use client";

import { useState } from "react";
import { Gift, PartyPopper, Award } from "lucide-react";
import Sidebar from "@/shared/components/Sidebar";
import StatsGrid from "@/modules/proveedor/inicio/components/StatsGrid";
import EventosRecomendados from "@/modules/proveedor/inicio/components/EventosRecomendados";
import { EventoRecomendado } from "@/shared/types/inicio-proveedor.types";
import Header from "@/shared/components/HeaderInicio";
import { useAuthContext } from "@/lib/context/auth-context";
import { StatsInicio } from "@/modules/proveedor/inicio/types/inicio.types";
import Loading from "@/shared/components/Loading";

const eventosRecomendados: EventoRecomendado[] = [
    {
        id: "1",
        titulo: "Boda de Ana y Luis",
        fecha: "24 ago, 2026",
        ubicacion: "DC",
        cantidadPersonas: 200,
        categorias: [{ label: "Decoracion", variant: "pink" }],
        rangoPrecio: "L15k-L25k",
        icon: <Award className="h-5 w-5 text-festiva-euphoric-pink" />,
        iconBg: "bg-festiva-euphoric-pink/10",
    },
    {
        id: "2",
        titulo: "XV Anos de Sophia",
        fecha: "14 jun, 2026",
        ubicacion: "Tegucigalpa",
        cantidadPersonas: 120,
        categorias: [{ label: "Decoracion", variant: "violet" }],
        rangoPrecio: "L10k-L18k",
        icon: <PartyPopper className="h-5 w-5 text-festiva-electric-violet" />,
        iconBg: "bg-festiva-electric-violet/10",
    },
    {
        id: "3",
        titulo: "Evento corporativo TechMx",
        fecha: "5 jul, 2026",
        ubicacion: "Tegucigalpa",
        cantidadPersonas: 300,
        categorias: [{ label: "Montaje", variant: "orange" }],
        rangoPrecio: "L20k-L35k",
        icon: <Gift className="h-5 w-5 text-festiva-confetti-orange" />,
        iconBg: "bg-festiva-confetti-orange/10",
    },
];

interface InicioViewProps {
    stats: StatsInicio;
}

export default function InicioView({ stats }: InicioViewProps) {
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

                <EventosRecomendados eventos={eventosRecomendados} />
            </section>
        </div>
    );
}