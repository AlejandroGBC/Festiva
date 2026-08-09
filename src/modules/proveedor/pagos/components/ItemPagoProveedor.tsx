import { CalendarDays, CreditCard, ArrowDownLeft } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { PagoProveedor } from "../types/pagos.types";

interface ItemPagoProveedorProps {
    pago: PagoProveedor;
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

export default function ItemPagoProveedor({ pago, isLast }: ItemPagoProveedorProps) {
    return (
        <div
            className={`py-4 ${!isLast ? "border-b border-festiva-midnight-blue/8" : ""}`}
        >
            {/* Fila principal: evento + monto neto */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-festiva-mint-neon/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowDownLeft size={18} className="text-festiva-mint-neon" />
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
                {/* Monto neto (lo que recibió el proveedor) */}
                <span className="text-festiva-mint-neon font-bold text-base shrink-0">
                    +{formatCurrency(pago.montoProveedor)}
                </span>
            </div>

            {/* Fila secundaria: desglose */}
            <div className="ml-13 flex items-center justify-between">
                <div className="flex items-center gap-1 ml-[52px]">
                    <CreditCard size={11} className="text-festiva-midnight-blue/30" />
                    <span className="text-festiva-midnight-blue/40 text-xs">
                        {formatMetodo(pago.metodoPago, pago.tarjetaMascara)}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-festiva-midnight-blue/40">
                    <span>
                        Total cliente:{" "}
                        <span className="font-semibold text-festiva-midnight-blue/60">
                            {formatCurrency(pago.montoTotal)}
                        </span>
                    </span>
                    <span className="text-festiva-euphoric-pink/70 font-medium">
                        -{formatCurrency(pago.comisionFestiva)} Festiva
                    </span>
                </div>
            </div>
        </div>
    );
}
