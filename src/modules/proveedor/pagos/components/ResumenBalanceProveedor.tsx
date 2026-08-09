import { Wallet, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

interface ResumenBalanceProveedorProps {
    totalRecibido: number;
    totalComisiones: number;
}

export default function ResumenBalanceProveedor({
    totalRecibido,
    totalComisiones,
}: ResumenBalanceProveedorProps) {
    const porcentajeComision =
        totalRecibido + totalComisiones > 0
            ? Math.round((totalComisiones / (totalRecibido + totalComisiones)) * 100)
            : 7;

    return (
        <article className="bg-festiva-midnight-blue px-5 pt-8 pb-6 text-xs">
            <p className="text-white/50 tracking-wider uppercase">Total recibido</p>
            <span className="text-white text-4xl font-bold block mt-1 mb-1">
                {formatCurrency(totalRecibido)}
            </span>
            <p className="text-white/40 text-xs mb-6">
                Neto después de comisiones Festiva
            </p>

            <div className="flex gap-3">
                <div className="flex-1 bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Wallet size={13} className="text-festiva-mint-neon" />
                        <span className="text-white/60 text-[11px]">Ingresado bruto</span>
                    </div>
                    <p className="text-festiva-mint-neon font-bold text-base">
                        {formatCurrency(totalRecibido + totalComisiones)}
                    </p>
                </div>
                <div className="flex-1 bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                        <TrendingDown size={13} className="text-festiva-euphoric-pink" />
                        <span className="text-white/60 text-[11px]">Comisión Festiva</span>
                    </div>
                    <p className="text-festiva-euphoric-pink font-bold text-base">
                        -{formatCurrency(totalComisiones)}
                        <span className="text-[10px] font-normal text-white/40 ml-1">
                            ({porcentajeComision}%)
                        </span>
                    </p>
                </div>
            </div>
        </article>
    );
}
