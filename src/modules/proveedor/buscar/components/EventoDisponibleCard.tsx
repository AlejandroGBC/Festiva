import { Calendar, MapPin, Users, Send } from "lucide-react";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import { EventoDisponible } from "../../../../shared/types/buscar-proveedor.types";

const CATEGORIA_VARIANTS = {
  pink: "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink",
  violet: "bg-festiva-electric-violet/10 text-festiva-electric-violet",
  orange: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
  mint: "bg-festiva-mint-neon/10 text-festiva-mint-neon",
};

const ESTADO_VARIANTS: Record<string, string> = {
  nuevo: "bg-festiva-mint-neon/10 text-festiva-mint-neon",
  vence_pronto: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
};

export default function EventoDisponibleCard({ evento }: { evento: EventoDisponible }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-bold text-festiva-midnight-blue">{evento.titulo}</h3>
        {evento.estado && (
          <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold ${ESTADO_VARIANTS[evento.estado.tipo ?? ""]}`}>
            {evento.estado.label}
          </span>
        )}
      </div>

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
          {evento.cantidadPersonas} personas
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {evento.categorias.map((cat) => (
          <span key={cat.label} className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORIA_VARIANTS[cat.variant]}`}>
            {cat.label}
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-500 leading-snug">{evento.descripcion}</p>

      <hr className="border-t border-slate-100" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">Presupuesto</p>
          <p className="text-sm font-bold text-festiva-midnight-blue">{evento.presupuesto}</p>
        </div>

        <Button variant="secondary" size="md" shape="pill" className="gap-2">
          <Send className="h-4 w-4" />
          Enviar oferta
        </Button>
      </div>
    </Card>
  );
}