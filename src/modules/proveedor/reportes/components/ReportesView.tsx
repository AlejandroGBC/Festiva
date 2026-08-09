"use client";

import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import { SectionHeader } from "@/shared/components/SectionHeader";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";
import { CircleCheckBig, Percent, TrendingUp, Wallet, GraduationCap, ChartNoAxesColumnIncreasing, CreditCard } from "lucide-react";
import { useState } from "react";

export default function ReportesView() {
    const { user, signOut } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;

    return (
        <main className="flex-1 overflow-y-auto no-scrollbar w-full">
            <Header
                onMenuClick={() => setSidebarOpen(true)}
                user={user}
            />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} signOut={signOut} mainLinks={mainLinks} />
            <section>
                {/* Balance Hero */}
                <article className="bg-festiva-midnight-blue p-4 text-xs">
                    <h1 className="text-white/50 tracking-wider mt-5">BALANCE DISPONIBLE</h1>
                    <span className="text-white text-4xl font-bold my-1">L48,500 HN</span>
                    <p className="text-white/50 mt-3">Actualizado hoy — Ciclo: junio 2026</p>
                    <div className="mt-6 mb-3 flex gap-2">
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <Wallet size={15} className="mr-2" />
                            Retirar
                        </div>
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <ChartNoAxesColumnIncreasing size={15} className="mr-2" />
                            Reportes
                        </div>
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
                            <CreditCard size={15} className="mr-2" />
                            Cuenta
                        </div>
                    </div>
                </article>

                <div className="px-5 py-6">
                    {/* Gráfico de ingresos */}
                    <div className="bg-white py-5 px-4 rounded-[20px] mb-5">
                        <div className="flex justify-between items-center">
                            <h1 className="text-festiva-midnight-blue font-semibold text-sm">Ingresos — Ultimos 6 meses</h1>
                            <div className="flex font-semibold text-festiva-mint-neon text-xs w-fit h-fit px-3 py-2 rounded-[999px] justify-between gap-2 bg-festiva-mint-neon/10 items-center">
                                <TrendingUp size={12} className="text-festiva-mint-neon" />
                                +18%
                            </div>
                        </div>
                        {/* Barras */}
                        <div className="flex justify-between items-end h-28 mt-4 gap-1">
                            {[
                                { label: "Ene", height: 40 },
                                { label: "Feb", height: 60 },
                                { label: "Mar", height: 80 },
                                { label: "Abr", height: 50 },
                                { label: "May", height: 70 },
                                { label: "Jun", height: 90 },
                            ].map((bar, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div
                                        className="w-full max-w-[30px] rounded-full bg-festiva-mint-neon/30"
                                        style={{ height: `${bar.height}px` }}
                                    />
                                    <span className="text-[10px] text-festiva-midnight-blue/50 mt-2">{bar.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tarjetas de resumen */}
                    <div className="flex justify-between gap-3">
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Este mes</h2>
                            <span className="font-bold text-festiva-mint-neon text-xl">L48,500</span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN ingresados</p>
                        </div>
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Comisiones</h2>
                            <span className="font-bold text-festiva-euphoric-pink text-xl">-L4,850</span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN Festiva 10%</p>
                        </div>
                    </div>

                    {/* Historial reciente */}
                    <div className="my-4">
                        <SectionHeader title="Historial reciente" accion="Ver todos" />
                        <div className="bg-white py-4 px-4 rounded-2xl space-y-2">
                            <div className="flex justify-between items-center py-2 border-b">
                                <div className="flex items-center gap-3">
                                    <CircleCheckBig size={44} className="text-festiva-mint-neon bg-festiva-mint-neon/10 rounded-2xl p-3" />
                                    <div>
                                        <h3 className="text-festiva-midnight-blue font-semibold text-sm">Cumpleanos Carlos 40</h3>
                                        <p className="text-festiva-midnight-blue/40 text-xs">Pago recibido · 2 jun, 2026</p>
                                    </div>
                                </div>
                                <span className="text-festiva-mint-neon text-base font-bold">+L8,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <div className="flex items-center gap-3">
                                    <GraduationCap size={44} className="text-festiva-mint-neon bg-festiva-mint-neon/10 rounded-2xl p-3" />
                                    <div>
                                        <h3 className="text-festiva-midnight-blue font-semibold text-sm">Graduacion ITESM</h3>
                                        <p className="text-festiva-midnight-blue/40 text-xs">Pago recibido · 28 may, 2026</p>
                                    </div>
                                </div>
                                <span className="text-festiva-mint-neon text-base font-bold">+L22,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-3">
                                    <Percent size={44} className="text-festiva-euphoric-pink bg-festiva-euphoric-pink/10 rounded-2xl p-3" />
                                    <div>
                                        <h3 className="text-festiva-midnight-blue font-semibold text-sm">Comision Festiva</h3>
                                        <p className="text-festiva-midnight-blue/40 text-xs">Descuento automatico · 28 nov, 2026</p>
                                    </div>
                                </div>
                                <span className="text-festiva-euphoric-pink text-base font-bold">-L2,200</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}