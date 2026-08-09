import { CalendarDays, CreditCard, Store, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { PagoCliente } from "../types/historial-pagos.types";

interface ItemPagoClienteProps {
    pago: PagoCliente;
    isLast: boolean;
}

function formatFecha(fechaStr: string | null): string {
    if (!fechaStr) return "Fecha desconocida";
    return new Date(fechaStr).toLocaleDateString("es", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatMetodo(metodo: string | null, mascara: string | null): string {
    if (!metodo) return "—";
    if (metodo === "tarjeta" && mascara) return `Tarjeta •••• ${mascara}`;
    if (metodo === "tarjeta") return "Tarjeta";
    return metodo;
}

export default function ItemPagoCliente({ pago, isLast }: ItemPagoClienteProps) {
    return (
        <div
            className={`py-4 ${!isLast ? "border-b border-festiva-midnight-blue/8" : ""}`}
        >
            {/* Fila principal: evento + monto */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-festiva-electric-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={18} className="text-festiva-electric-violet" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-festiva-midnight-blue font-semibold text-sm truncate">
                            {pago.nombreEvento}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                            <CalendarDays size={11} className="text-festiva-midnight-blue/40" />
                            <span className="text-festiva-midnight-blue/40 text-xs">
                                {formatFecha(pago.fechaPago)}
                            </span>
                        </div>
                    </div>
                </div>
                {/* El cliente solo ve lo que pagó — sin desglose interno */}
                <span className="text-festiva-midnight-blue font-bold text-base shrink-0">
                    {formatCurrency(pago.montoTotal)}
                </span>
            </div>

            {/* Fila secundaria: proveedor + método de pago */}
            <div className="flex items-center justify-between ml-[52px]">
                <div className="flex items-center gap-1.5">
                    <Store size={11} className="text-festiva-midnight-blue/30" />
                    <span className="text-festiva-midnight-blue/50 text-xs font-medium truncate max-w-[120px]">
                        {pago.nombreProveedor}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <CreditCard size={11} className="text-festiva-midnight-blue/30" />
                    <span className="text-festiva-midnight-blue/40 text-xs">
                        {formatMetodo(pago.metodoPago, pago.tarjetaMascara)}
                    </span>
                </div>
            </div>
        </div>
    );
}
