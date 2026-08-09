import { CalendarDays, CreditCard, Store, CheckCircle2, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { PagoCliente } from "../types/historial-pagos.types";

interface ItemPagoClienteProps {
    pago: PagoCliente;
    isLast: boolean;
    onClick?: () => void;
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

export default function ItemPagoCliente({ pago, isLast, onClick }: ItemPagoClienteProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left py-4 transition-colors active:bg-festiva-midnight-blue/5 ${!isLast ? "border-b border-festiva-midnight-blue/8" : ""}`}
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
                <div className="flex items-center gap-1 shrink-0">
                    <span className="text-festiva-midnight-blue font-bold text-base">
                        {formatCurrency(pago.montoTotal)}
                    </span>
                    <ChevronRight size={14} className="text-festiva-midnight-blue/30" />
                </div>
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
        </button>
    );
}
