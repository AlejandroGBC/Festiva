"use client";

import { useState } from "react";
import { useAuthContext } from "@/lib/context/auth-context";
import { Header } from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import { clienteLinks } from "@/shared/constant/sidebarLinks";
import { Receipt } from "lucide-react";
import type { ResumenPagosCliente } from "../types/historial-pagos.types";
import ResumenGastoCliente from "./ResumenGastoCliente";
import ItemPagoCliente from "./ItemPagoCliente";

interface PagosClienteViewProps {
    resumen: ResumenPagosCliente;
}

export default function PagosClienteView({ resumen }: PagosClienteViewProps) {
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
                mainLinks={clienteLinks}
            />

            <section>
                {/* Hero con total gastado */}
                <ResumenGastoCliente
                    totalGastado={resumen.totalGastado}
                    cantidadPagos={resumen.pagos.length}
                />

                <div className="px-5 py-6">
                    {/* Encabezado de sección */}
                    <div className="mb-5">
                        <h2 className="font-bold text-festiva-midnight-blue text-base">
                            Historial de pagos
                        </h2>
                        <p className="text-festiva-midnight-blue/40 text-xs mt-0.5">
                            {resumen.pagos.length === 0
                                ? "Sin pagos registrados aún"
                                : `${resumen.pagos.length} pago${resumen.pagos.length === 1 ? "" : "s"} realizado${resumen.pagos.length === 1 ? "" : "s"}`}
                        </p>
                    </div>

                    {/* Lista de pagos o estado vacío */}
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
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
