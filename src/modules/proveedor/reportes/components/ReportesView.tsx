"use client";

import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";
import { TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

export default function ReportesView() {
    const { user, signOut } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;

    return (
        <main>
            <Header
                onMenuClick={() => setSidebarOpen(true)}
                user={user}
            />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} signOut={signOut} mainLinks={mainLinks} />
            <section>
                {/* Balance Hero*/}
                <article className="bg-festiva-midnight-blue p-4 text-xs">
                    <h1 className="text-white/50 tracking-wider mt-5">BALANCE DISPONIBLE</h1>
                    <span className="text-white text-4xl font-bold my-1">L48,500 HN</span>
                    <p className="text-white/50 mt-3">Actualizado hoy — Ciclo: junio 2026</p>
                    <div className="mt-6 mb-3 justify-between flex">
                        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-fit px-5 py-3 rounded-2xl flex">
                            <Wallet size={15} className="mr-2" />
                            Retirar
                        </div>
                    </div>
                </article>
                <div className="px-5 py-6">
                    <div className="bg-white py-5 px-4 rounded-[20px] mb-5">
                        <div className="flex justify-between">
                            <h1 className="text-festiva-midnight-blue font-semibold">Ingresos — Ultimos 6 meses</h1>
                            <div className="flex font-semibold text-festiva-mint-neon text-xs w-fit h-fit px-3 py-2 rounded-[999px] justify-between gap-2 bg-festiva-mint-neon/10">
                                <TrendingUp size={12} className="text-festiva-mint-neon" />
                                +18%
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Este mes</h2>
                            <span className="font-bold text-festiva-mint-neon text-xl">L48,500</span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN ingresados</p>
                        </div>
                        <div className="bg-white py-3 px-4 rounded-2xl w-[50%]">
                            <h2 className="text-festiva-midnight-blue/40 text-xs">Este mes</h2>
                            <span className="font-bold text-festiva-mint-neon text-xl">L48,500</span>
                            <p className="text-xs text-festiva-midnight-blue/40">HN ingresados</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
