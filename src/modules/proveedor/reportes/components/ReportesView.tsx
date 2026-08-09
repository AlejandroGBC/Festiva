"use client";

import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import { SectionHeader } from "@/shared/components/SectionHeader";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";
import {
    CircleCheckBig,
    Percent,
    TrendingUp,
    Wallet,
} from "lucide-react";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { DatosReportes } from "../types/reportes.types";

const getIconForTransaction = (nombre: string) => {
    const lower = nombre.toLowerCase();
    if (lower.includes("comision") || lower.includes("comisión")) {
        return Percent;
    }
    return CircleCheckBig;
};

interface ReportesViewProps {
    datosReporte: DatosReportes;
}

export default function ReportesView({ datosReporte }: ReportesViewProps) {
    const { user, signOut } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;

    // Preparar datos para el gráfico
    const chartData = datosReporte.ingresosUltimosMeses.map((item) => ({
        name: item.mes,
        value: item.valor,
    }));

    // Formateador de moneda
    const formatCurrency = (amount: number) => {
        return `L${amount.toLocaleString('es-HN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    const balance = datosReporte.ingresos - datosReporte.egresos;
    const now = new Date();
    const mesActual = now.toLocaleString('es', { month: 'long' });
    const añoActual = now.getFullYear();

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
                {/* Balance Hero */}
                <article className="bg-festiva-midnight-blue p-4 text-xs">
                    <h1 className="text-white/50 tracking-wider mt-5">BALANCE DISPONIBLE</h1>
                    <span className="text-white text-4xl font-bold my-1">
                        {formatCurrency(balance)}
                    </span>
                    <p className="text-white/50 mt-3">
                        Actualizado hoy — Ciclo: {mesActual} {añoActual}
                    </p>
                    <div className="mt-6 mb-3 flex gap-2">
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <Wallet size={15} className="mr-2" />
                            Retirar
                        </div>
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <TrendingUp size={15} className="mr-2" />
                            Reportes
                        </div>
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <Wallet size={15} className="mr-2" />
                            Cuenta
                        </div>
                    </div>
                </article>

                <div className="px-5 py-6">
                    {/* Gráfico de ingresos */}
                    <div className="bg-white py-5 px-4 rounded-[20px] mb-5">
                        <div className="flex justify-between items-center">
                            <h1 className="text-festiva-midnight-blue font-semibold text-sm">
                                Ingresos — Últimos 6 meses
                            </h1>
                            <div
                                className={`flex font-semibold text-xs w-fit h-fit px-3 py-2 rounded-[999px] justify-between gap-2 ${datosReporte.porcentajeIngresos >= 0
                                    ? "text-festiva-mint-neon bg-festiva-mint-neon/10"
                                    : "text-festiva-euphoric-pink bg-festiva-euphoric-pink/10"
                                    }`}
                            >
                                <TrendingUp size={12} className={datosReporte.porcentajeIngresos >= 0 ? "text-festiva-mint-neon" : "text-festiva-euphoric-pink"} />
                                {datosReporte.porcentajeIngresos > 0 ? "+" : ""}
                                {datosReporte.porcentajeIngresos}%
                            </div>
                        </div>

                        <div className="w-full h-36 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} barSize={20} barGap={4}>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: "#6b7280" }}
                                        dy={8}
                                    />
                                    <YAxis hide domain={[0, 'dataMax + 10']} />
                                    <Tooltip
                                        cursor={{ fill: "transparent" }}
                                        contentStyle={{
                                            backgroundColor: "#fff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                        }}
                                        formatter={(value) => [`${formatCurrency(value as number)}`, "Ingresos"]}
                                    />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="#7C3AED" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tarjetas de resumen */}
                    <div className="flex justify-between gap-3">
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Este mes</h2>
                            <span className="font-bold text-festiva-mint-neon text-xl">
                                {formatCurrency(datosReporte.ingresos)}
                            </span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN ingresados</p>
                        </div>
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Comisiones</h2>
                            <span className="font-bold text-festiva-euphoric-pink text-xl">
                                -{formatCurrency(datosReporte.egresos)}
                            </span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN Festiva 10%</p>
                        </div>
                    </div>

                    {/* Historial reciente */}
                    <div className="my-4">
                        <SectionHeader title="Historial reciente" accion="Ver todos" />
                        <div className="bg-white py-4 px-4 rounded-2xl space-y-2">
                            {datosReporte.historial.length === 0 ? (
                                <p className="text-festiva-midnight-blue/40 text-sm py-2">
                                    No hay movimientos recientes
                                </p>
                            ) : (
                                datosReporte.historial.map((item, index) => {
                                    const isIngreso = item.montoPago >= 0;
                                    const IconComponent = getIconForTransaction(item.nombreEvento);
                                    const colorClass = isIngreso
                                        ? "text-festiva-mint-neon bg-festiva-mint-neon/10"
                                        : "text-festiva-euphoric-pink bg-festiva-euphoric-pink/10";
                                    const amountColor = isIngreso
                                        ? "text-festiva-mint-neon"
                                        : "text-festiva-euphoric-pink";
                                    const amountPrefix = isIngreso ? "+" : "-";

                                    let fechaFormateada = "Fecha desconocida";
                                    if (item.fechaPago) {
                                        fechaFormateada = new Date(item.fechaPago).toLocaleDateString(
                                            "es",
                                            { day: "numeric", month: "short", year: "numeric" }
                                        );
                                    }


                                    return (
                                        <div
                                            key={item.idPago || index}
                                            className={`flex justify-between items-center py-2 ${index < datosReporte.historial.length - 1 ? "border-b" : ""
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComponent
                                                    size={44}
                                                    className={`rounded-2xl p-3 ${colorClass}`}
                                                />
                                                <div>
                                                    <h3 className="text-festiva-midnight-blue font-semibold text-sm">
                                                        {item.nombreEvento}
                                                    </h3>
                                                    <p className="text-festiva-midnight-blue/40 text-xs">
                                                        {isIngreso ? "Pago recibido" : "Descuento automático"} ·{" "}
                                                        {fechaFormateada}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`text-base font-bold ${amountColor}`}>
                                                {amountPrefix}
                                                {formatCurrency(Math.abs(item.montoPago))}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}