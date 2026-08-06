import { Sparkles } from "lucide-react";
import type { EventoDisponible } from "@/shared/types/buscar-proveedor.types";

export const ResumenEventoCard = ({ evento }: { evento: EventoDisponible }) => (
  <div className="bg-festiva-midnight-blue rounded-3xl p-5 text-white">
    <h2 className="text-lg font-extrabold mb-1">{evento.titulo}</h2>
    <p className="text-sm text-white/60 mb-4">
      {evento.fecha} — {evento.ubicacion} — {evento.cantidadPersonas} personas
    </p>
    <div className="flex flex-wrap gap-2">
      {evento.categorias.slice(0, 1).map((cat) => (
        <span
          key={cat.label}
          className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full"
        >
          <Sparkles size={12} />
          {cat.label}
        </span>
      ))}
      <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">
        {evento.presupuesto}
      </span>
    </div>
  </div>
);