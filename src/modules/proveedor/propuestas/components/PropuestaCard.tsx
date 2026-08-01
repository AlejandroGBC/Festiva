import { Users, CalendarClock, MessageSquare, ClipboardList } from "lucide-react";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import ProgressBar from "@/shared/components/ProgressBar";
import { EstadoBadge } from "./EstadoBadge";
import type { Propuesta } from "@/shared/types/propuestas-proveedor.types";

interface PropuestaCardProps {
  propuesta: Propuesta;
  onChat?: () => void;
  onVer?: () => void;
  onContactarCliente?: () => void;
}

export const PropuestaCard = ({ propuesta, onChat, onVer, onContactarCliente }: PropuestaCardProps) => {
  const tieneChips = !!propuesta.servicios?.length;
  const esAceptada = propuesta.estado === "aceptada";

  return (
    <Card className={esAceptada ? "border-2 border-festiva-mint-neon" : ""}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-bold text-festiva-midnight-blue">{propuesta.tituloEvento}</h3>
        <EstadoBadge estado={propuesta.estado} />
      </div>

      <p className="text-sm text-gray-400 mb-3">
        {propuesta.ubicacion} · {propuesta.fechaEvento}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Users size={14} /> {propuesta.cantidadInvitados} personas
        </span>
        {!esAceptada && (
          <span className="flex items-center gap-1">
            <CalendarClock size={14} /> {propuesta.actividadReciente}
          </span>
        )}
      </div>

      {esAceptada ? (
        <div className="mb-3">
          <ProgressBar percentage={propuesta.progresoPago ?? 0} color="electric-violet" />
          <p className="text-sm text-gray-500 mt-2">Pago pendiente de confirmación</p>
        </div>
      ) : tieneChips ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {propuesta.servicios!.map((servicio, i) => (
            <span
              key={servicio}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                i % 2 === 0
                  ? "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink"
                  : "bg-festiva-electric-violet/10 text-festiva-electric-violet"
              }`}
            >
              {servicio}
            </span>
          ))}
        </div>
      ) : null}

      <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-3">
        <span className="font-extrabold text-lg text-festiva-midnight-blue whitespace-nowrap">
          L{propuesta.precioTotal.toLocaleString("es-HN")} HN
        </span>

        {esAceptada ? (
          <Button variant="success" size="sm" onClick={onContactarCliente} className="text-white">
            <MessageSquare size={16} />
            Contactar cliente
          </Button>
        ) : tieneChips ? (
          <div className="flex gap-2">
            <Button variant="light" size="sm" onClick={onChat}>
              <MessageSquare size={16} />
              Chat
            </Button>
            <Button variant="outline" size="sm" onClick={onVer}>
              Ver
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={onVer}>
            <ClipboardList size={16} />
            Ver detalle
          </Button>
        )}
      </div>
    </Card>
  );
};