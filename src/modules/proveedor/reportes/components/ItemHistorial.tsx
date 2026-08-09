import { HistorialPago } from "../types/reportes.types";
import { CircleCheckBig, Percent } from "lucide-react";

interface ItemHistorialProps {
    item: HistorialPago;
    isLast: boolean;
    formatCurrency: (amount: number) => string;
}

const getIconForTransaction = (nombre: string) => {
    const lower = nombre.toLowerCase();
    if (lower.includes("comision") || lower.includes("comisión")) return Percent;
    return CircleCheckBig;
};

export default function ItemHistorial({ item, isLast, formatCurrency }: ItemHistorialProps) {
    const isIngreso = item.montoPago >= 0;
    const Icon = getIconForTransaction(item.nombreEvento);
    const colorClass = isIngreso
        ? "text-festiva-mint-neon bg-festiva-mint-neon/10"
        : "text-festiva-euphoric-pink bg-festiva-euphoric-pink/10";
    const amountColor = isIngreso ? "text-festiva-mint-neon" : "text-festiva-euphoric-pink";
    const prefix = isIngreso ? "+" : "-";

    let fecha = "Fecha desconocida";
    if (item.fechaPago) {
        fecha = new Date(item.fechaPago).toLocaleDateString("es", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className={`flex justify-between items-center py-2 ${!isLast ? "border-b" : ""}`}>
            <div className="flex items-center gap-3">
                <Icon size={44} className={`rounded-2xl p-3 ${colorClass}`} />
                <div>
                    <h3 className="text-festiva-midnight-blue font-semibold text-sm">{item.nombreEvento}</h3>
                    <p className="text-festiva-midnight-blue/40 text-xs">
                        {isIngreso ? "Pago recibido" : "Descuento automático"} · {fecha}
                    </p>
                </div>
            </div>
            <span className={`text-base font-bold ${amountColor}`}>
                {prefix}
                {formatCurrency(Math.abs(item.montoPago))}
            </span>
        </div>
    );
}