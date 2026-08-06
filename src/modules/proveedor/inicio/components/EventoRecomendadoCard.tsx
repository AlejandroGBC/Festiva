// modules/proveedor/inicio/components/EventoRecomendadoCard.tsx
import { Calendar, MapPin, Users } from "lucide-react";
import Card from "@/shared/components/Card";
import { EventoRecomendado } from "../types/inicio.types";

const CATEGORIA_VARIANTS: Record<string, string> = {
  pink: "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink",
  violet: "bg-festiva-electric-violet/10 text-festiva-electric-violet",
  orange: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
  gray: "bg-gray-100 text-gray-600", // fallback
};

export default function EventoRecomendadoCard({ evento }: { evento: EventoRecomendado }) {
  return (
    <Card className="flex gap-3">
      {/* Quitamos el div del icono */}

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-festiva-midnight-blue truncate">
          {evento.titulo}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {evento.fecha}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {evento.ubicacion}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {evento.cantidadPersonas} pers.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {evento.categorias_evento.map((cat) => (
            <span
              key={cat.label}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                CATEGORIA_VARIANTS[cat.variant] || CATEGORIA_VARIANTS.gray
              }`}
            >
              {cat.label}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
            {evento.rangoPrecio}
          </span>
        </div>
      </div>
    </Card>
  );
}