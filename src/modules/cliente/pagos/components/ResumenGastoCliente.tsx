import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

interface ResumenGastoClienteProps {
    totalGastado: number;
    cantidadPagos: number;
}

export default function ResumenGastoCliente({
    totalGastado,
    cantidadPagos,
}: ResumenGastoClienteProps) {
    return (
        <article className="bg-festiva-midnight-blue px-5 pt-8 pb-6">
            <p className="text-white/50 text-xs tracking-wider uppercase">
                Total invertido en eventos
            </p>
            <span className="text-white text-4xl font-bold block mt-1 mb-1">
                {formatCurrency(totalGastado)}
            </span>
            <p className="text-white/40 text-xs mb-6">
                {cantidadPagos === 0
                    ? "Aún no tienes pagos registrados"
                    : `${cantidadPagos} pago${cantidadPagos === 1 ? "" : "s"} confirmado${cantidadPagos === 1 ? "" : "s"}`}
            </p>

            <div className="bg-white/10 border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-festiva-electric-violet/30 flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} className="text-white" />
                </div>
                <div>
                    <p className="text-white/60 text-[11px]">Cada lempira es una experiencia memorable</p>
                    <p className="text-white text-xs font-semibold mt-0.5">Festiva · Pagos seguros 🔒</p>
                </div>
            </div>
        </article>
    );
}
