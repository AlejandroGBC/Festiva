"use client";

import { useState } from "react";
import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import { proveedorLinks } from "@/shared/constant/sidebarLinks";
import { ChevronLeft, Receipt } from "lucide-react";
import Link from "next/link";
import type { ResumenPagosProveedor } from "../types/pagos.types";
import ResumenBalanceProveedor from "./ResumenBalanceProveedor";
import ItemPagoProveedor from "./ItemPagoProveedor";

interface PagosProveedorViewProps {
    resumen: ResumenPagosProveedor;
}

export default function PagosProveedorView({ resumen }: PagosProveedorViewProps) {
    const { user, signOut } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="flex-1 overflow-y-auto no-scrollbar w-full">
            <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
                signOut={signOut}
                mainLinks={proveedorLinks}
            />

            <section>
                {/* Hero con resumen financiero */}
                <ResumenBalanceProveedor
                    totalRecibido={resumen.totalRecibido}
                    totalComisiones={resumen.totalComisiones}
                />

                <div className="px-5 py-6">
                    {/* Encabezado de sección */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="font-bold text-festiva-midnight-blue text-base">
                                Todos los pagos
                            </h2>
                            <p className="text-festiva-midnight-blue/40 text-xs mt-0.5">
                                {resumen.pagos.length === 0
                                    ? "Sin movimientos registrados"
                                    : `${resumen.pagos.length} transacci${resumen.pagos.length === 1 ? "ón" : "ones"}`}
                            </p>
                        </div>
                        <Link
                            href="/proveedor/reportes"
                            className="flex items-center gap-1.5 text-xs text-festiva-euphoric-pink font-semibold"
                        >
                            <ChevronLeft size={14} />
                            Reportes
                        </Link>
                    </div>

                    {/* Lista de pagos o estado vacío */}
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
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
