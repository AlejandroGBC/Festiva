import { Check } from "lucide-react";
import type { MetodoPago } from "../types/pagos.types";

interface MetodoPagoOptionProps {
  metodo: MetodoPago;
  seleccionado: boolean;
  onSeleccionar: () => void;
}

export const MetodoPagoOption = ({ metodo, seleccionado, onSeleccionar }: MetodoPagoOptionProps) => {
  const esVisa = metodo.marca === "visa";

  return (
    <button
      type="button"
      onClick={onSeleccionar}
      className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
        seleccionado
          ? "border-festiva-electric-violet bg-festiva-electric-violet/5"
          : "border-transparent bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      }`}
    >
      {esVisa ? (
        <span className="text-[13px] font-extrabold tracking-wide text-festiva-midnight-blue shrink-0">
          VISA
        </span>
      ) : (
        <span className="text-[11px] font-extrabold tracking-wide text-festiva-confetti-orange bg-festiva-confetti-orange/15 rounded-md px-2 py-1 shrink-0">
          MC
        </span>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-festiva-midnight-blue">•••• •••• •••• {metodo.ultimosDigitos}</p>
        <p className="text-sm text-gray-400">Vence {metodo.vencimiento}</p>
      </div>

      {seleccionado && (
        <span className="w-6 h-6 rounded-full bg-festiva-electric-violet flex items-center justify-center shrink-0">
          <Check size={14} className="text-white" strokeWidth={3} />
        </span>
      )}
    </button>
  );
};