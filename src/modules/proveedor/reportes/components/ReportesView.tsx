"use client";

import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";
import { useState } from "react";
import { DatosReportes } from "../types/reportes.types";
import BalanceHero from "./BalanceHero"
import GraficoIngresos from "./GraficoIngresos";
import TarjetasResumen from "./TarjetasResumen";
import ListaHistorial from "./ListaHistorial";
import { formatCurrency } from "@/shared/utils/formatCurrency"

interface ReportesViewProps {
    datosReporte: DatosReportes;
}

export default function ReportesView({ datosReporte }: ReportesViewProps) {
    const { user, signOut } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;

    const balance = datosReporte.ingresos - datosReporte.egresos;
    const ahora = new Date();
    const mes = ahora.toLocaleString("es", { month: "long" });
    const año = ahora.getFullYear();

    return (
        <main className="flex-1 overflow-y-auto no-scrollbar w-full">
            <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
                signOut={signOut}
                mainLinks={mainLinks}
            />
            <section>
                <BalanceHero balance={balance} mes={mes} año={año} formatCurrency={formatCurrency} />
                <div className="px-5 py-6">
                    <GraficoIngresos
                        data={datosReporte.ingresosUltimosMeses}
                        porcentaje={datosReporte.porcentajeIngresos}
                        formatCurrency={formatCurrency}
                    />
                    <TarjetasResumen
                        ingresos={datosReporte.ingresos}
                        egresos={datosReporte.egresos}
                        formatCurrency={formatCurrency}
                    />
                    <ListaHistorial historial={datosReporte.historial} formatCurrency={formatCurrency} />
                </div>
            </section>
        </main>
    );
}