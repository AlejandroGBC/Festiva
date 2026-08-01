import { CheckCircle2, Percent } from "lucide-react";
import type { TransaccionHistorial } from "@/shared/types/historial-proveedor.types";

interface HistorialItemProps extends TransaccionHistorial {
  esUltimo?: boolean;
}

export const HistorialItem = ({ titulo, descripcion, fecha, monto, tipo, esUltimo }: HistorialItemProps) => {
  const esIngreso = tipo === "ingreso";
  return (
    <div className={`flex items-center gap-3 py-4 ${esUltimo ? "" : "border-b border-gray-100"}`}>
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
          esIngreso ? "bg-festiva-mint-neon/10 text-festiva-mint-neon" : "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink"
        }`}
      >
        {esIngreso ? <CheckCircle2 size={18} /> : <Percent size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-festiva-midnight-blue">{titulo}</p>
        <p className="text-sm text-gray-400">
          {descripcion} · {fecha}
        </p>
      </div>
      <span className={`font-bold whitespace-nowrap ${esIngreso ? "text-festiva-mint-neon" : "text-festiva-euphoric-pink"}`}>
        {esIngreso ? "+" : "-"}L{Math.abs(monto).toLocaleString("es-HN")}
      </span>
    </div>
  );
};