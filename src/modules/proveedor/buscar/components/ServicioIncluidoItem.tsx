import { Check } from "lucide-react";
import type { ServicioIncluido } from "@/shared/types/enviar-propuesta-proveedor.types";

interface ServicioIncluidoItemProps {
  servicio: ServicioIncluido;
  onToggle: () => void;
  esUltimo?: boolean;
}

export const ServicioIncluidoItem = ({ servicio, onToggle, esUltimo }: ServicioIncluidoItemProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={`w-full flex items-start gap-3 py-4 text-left ${esUltimo ? "" : "border-b border-gray-100"}`}
  >
    <span
      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border-2 ${
        servicio.incluido ? "bg-festiva-electric-violet border-festiva-electric-violet" : "border-gray-200"
      }`}
    >
      {servicio.incluido && <Check size={14} className="text-white" strokeWidth={3} />}
    </span>
    <span>
      <p className={`font-bold ${servicio.incluido ? "text-festiva-midnight-blue" : "text-gray-400"}`}>{servicio.titulo}</p>
      <p className="text-sm text-gray-400">{servicio.descripcion}</p>
    </span>
  </button>
);