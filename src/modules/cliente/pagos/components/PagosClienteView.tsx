"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/auth-context";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks } from "@/shared/constant/sidebarLinks";
import { ArrowLeft, Receipt, Menu } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { ResumenPagosCliente } from "../types/historial-pagos.types";
import ItemPagoCliente from "./ItemPagoCliente";

interface PagosClienteViewProps {
    resumen: ResumenPagosCliente;
}

export default function PagosClienteView({ resumen }: PagosClienteViewProps) {
    const { user, signOut } = useAuthContext();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar w-full">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
                signOut={signOut}
                mainLinks={clienteLinks}
            />

            {/* Header oscuro estilo /cliente/eventos/[id] */}
            <header className="bg-festiva-midnight-blue px-5 pt-6 pb-8 rounded-b-[28px] shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.back()}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                    >
                        <ArrowLeft size={16} className="text-white" />
                    </button>
                    <span className="text-white/90 text-[13px] font-semibold tracking-wide">
                        Mis Pagos
                    </span>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                    >
                        <Menu size={16} className="text-white" />
                    </button>
                </div>

                {/* Resumen de gasto */}
                <div>
                    <p className="text-white/50 text-xs tracking-wider uppercase mb-1">
                        Total invertido en eventos
                    </p>
                    <span className="text-white text-4xl font-bold block mb-1">
                        {formatCurrency(resumen.totalGastado)}
                    </span>
                    <p className="text-white/40 text-xs">
                        {resumen.pagos.length === 0
                            ? "Aún no tienes pagos registrados"
                            : `${resumen.pagos.length} pago${resumen.pagos.length === 1 ? "" : "s"} confirmado${resumen.pagos.length === 1 ? "" : "s"}`}
                    </p>
                </div>
            </header>

            {/* Contenido */}
            <div className="px-5 py-6 flex-1">
                <div className="mb-4">
                    <h2 className="font-bold text-festiva-midnight-blue text-base">
                        Historial de pagos
                    </h2>
                </div>

                {resumen.pagos.length === 0 ? (
                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-14 px-6 gap-4">
                        <div className="w-16 h-16 rounded-full bg-festiva-midnight-blue/5 flex items-center justify-center">
                            <Receipt size={28} className="text-festiva-midnight-blue/25" />
                        </div>
                        <div className="text-center">
                            <p className="text-festiva-midnight-blue font-semibold text-sm">
                                Aún no has realizado pagos
                            </p>
                            <p className="text-festiva-midnight-blue/40 text-xs mt-1 leading-relaxed">
                                Cuando confirmes el pago de una contratación,
                                aparecerá aquí tu historial completo.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl px-4 py-1">
                        {resumen.pagos.map((pago, index) => (
                            <ItemPagoCliente
                                key={pago.idPago}
                                pago={pago}
                                isLast={index === resumen.pagos.length - 1}
                                onClick={() => router.push(`/cliente/eventos/${pago.idEvento}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
