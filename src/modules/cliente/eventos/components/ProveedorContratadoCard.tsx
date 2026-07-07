import { Check, Clock } from "lucide-react";
import { ProveedorContratado } from "../types/eventos.types";

const estadoStyles: Record<ProveedorContratado["estado"], string> = {
  confirmado: "bg-festiva-mint-neon/10 text-festiva-mint-neon",
  pendiente: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
};

const estadoLabel: Record<ProveedorContratado["estado"], string> = {
  confirmado: "Confirmado",
  pendiente: "Pendiente",
};

const estadoIcono: Record<ProveedorContratado["estado"], React.ReactNode> = {
  confirmado: <Check size={12} />,
  pendiente: <Clock size={12} />,
};

export const ProveedorContratadoCard = ({ proveedor }: { proveedor: ProveedorContratado }) => {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
      <div className="w-11 h-11 rounded-full bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink font-bold flex items-center justify-center shrink-0">
        {proveedor.iniciales}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-festiva-midnight-blue truncate">{proveedor.nombreComercial}</p>
        <p className="text-sm text-gray-500">
          {proveedor.servicio} — L{proveedor.monto.toLocaleString("es-HN")} HN
        </p>
      </div>

      <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${estadoStyles[proveedor.estado]}`}>
        {estadoIcono[proveedor.estado]}
        {estadoLabel[proveedor.estado]}
      </span>
    </div>
  );
};