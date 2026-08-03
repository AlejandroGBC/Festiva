import { ArrowDownWideNarrow, Star } from "lucide-react";
import type { OrdenProveedores } from "@/shared/types/proveedores-cliente.types";

interface OrdenToggleProps {
  orden: OrdenProveedores;
  onCambiar: (orden: OrdenProveedores) => void;
}

export const OrdenToggle = ({ orden, onCambiar }: OrdenToggleProps) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => onCambiar("recomendados")}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold border ${
        orden === "recomendados"
          ? "bg-festiva-euphoric-pink/10 border-festiva-euphoric-pink text-festiva-euphoric-pink"
          : "bg-white border-gray-200 text-gray-400"
      }`}
    >
      <ArrowDownWideNarrow size={15} />
      Recomendados
    </button>
    <button
      type="button"
      onClick={() => onCambiar("mejor_calificados")}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold border ${
        orden === "mejor_calificados"
          ? "bg-festiva-euphoric-pink/10 border-festiva-euphoric-pink text-festiva-euphoric-pink"
          : "bg-white border-gray-200 text-gray-400"
      }`}
    >
      <Star size={15} />
      Mejor calificados
    </button>
  </div>
);