"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/auth-context";
import Sidebar from "@/shared/components/Sidebar";
import { proveedorLinks } from "@/shared/constant/sidebarLinks";
import { ArrowLeft, Receipt, Menu } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { ResumenPagosProveedor } from "../types/pagos.types";
import ItemPagoProveedor from "./ItemPagoProveedor";

interface PagosProveedorViewProps {
    resumen: ResumenPagosProveedor;
}

export default function PagosProveedorView({ resumen }: PagosProveedorViewProps) {
    const { user, signOut } = useAuthContext();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const porcentajeComision =
        resumen.totalRecibido + resumen.totalComisiones > 0
            ? Math.round((resumen.totalComisiones / (resumen.totalRecibido + resumen.totalComisiones)) * 100)
            : 7;

    return (
        <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar w-full">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
                signOut={signOut}
                mainLinks={proveedorLinks}
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

                {/* Resumen financiero */}
                <div className="mb-5">
                    <p className="text-white/50 text-xs tracking-wider uppercase mb-1">
                        Total recibido neto
                    </p>
                    <span className="text-white text-4xl font-bold block mb-1">
                        {formatCurrency(resumen.totalRecibido)}
                    </span>
                    <p className="text-white/40 text-xs">
                        {resumen.pagos.length === 0
                            ? "Sin movimientos registrados"
                            : `${resumen.pagos.length} transacci${resumen.pagos.length === 1 ? "ón" : "ones"}`}
                    </p>
                </div>

                {/* Mini cards de desglose */}
                <div className="flex gap-3">
                    <div className="flex-1 bg-white/10 border border-white/15 rounded-2xl px-3 py-2.5">
                        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Bruto recibido</p>
                        <p className="text-festiva-mint-neon font-bold text-sm">
                            {formatCurrency(resumen.totalRecibido + resumen.totalComisiones)}
                        </p>
                    </div>
                    <div className="flex-1 bg-white/10 border border-white/15 rounded-2xl px-3 py-2.5">
                        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Comisión Festiva</p>
                        <p className="text-festiva-euphoric-pink font-bold text-sm">
                            -{formatCurrency(resumen.totalComisiones)}
                            <span className="text-[10px] font-normal text-white/30 ml-1">({porcentajeComision}%)</span>
                        </p>
                    </div>
                </div>
            </header>

            {/* Contenido */}
            <div className="px-5 py-6 flex-1">
                <div className="mb-4">
                    <h2 className="font-bold text-festiva-midnight-blue text-base">
                        Todos los pagos
                    </h2>
                </div>

                {resumen.pagos.length === 0 ? (
                    <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-14 px-6 gap-4">
                        <div className="w-16 h-16 rounded-full bg-festiva-midnight-blue/5 flex items-center justify-center">
                            <Receipt size={28} className="text-festiva-midnight-blue/25" />
                        </div>
                        <div className="text-center">
                            <p className="text-festiva-midnight-blue font-semibold text-sm">
                                Sin pagos aún
                            </p>
                            <p className="text-festiva-midnight-blue/40 text-xs mt-1 leading-relaxed">
                                Cuando los clientes confirmen el pago de tus contrataciones,
                                aparecerán aquí.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl px-4 py-1">
                        {resumen.pagos.map((pago, index) => (
                            <ItemPagoProveedor
                                key={pago.idPago}
                                pago={pago}
                                isLast={index === resumen.pagos.length - 1}
                                onClick={() => pago.idEvento ? router.push(`/proveedor/eventos/${pago.idEvento}`) : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
