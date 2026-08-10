import { Calendar, MapPin, Users, Wallet } from "lucide-react";
import type { EventoParaPropuesta } from "@/shared/types/enviar-propuesta-proveedor.types";

interface DetalleEventoPropuestaCardProps {
  evento: EventoParaPropuesta;
}

export const DetalleEventoPropuestaCard = ({ evento }: DetalleEventoPropuestaCardProps) => (
  <div className="bg-white rounded-3xl shadow-sm p-5">
    <p className="font-bold text-festiva-midnight-blue mb-3">Detalle del evento</p>

    <div className="grid grid-cols-2 gap-2">
      <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
        <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
          <Calendar size={13} />
          <span className="text-[10px]">Fecha</span>
        </div>
        <span className="text-[13px] font-semibold text-festiva-midnight-blue">{evento.fecha}</span>
      </div>

      <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
        <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
          <Users size={13} />
          <span className="text-[10px]">Invitados</span>
        </div>
        <span className="text-[13px] font-semibold text-festiva-midnight-blue">
          {evento.cantidadPersonas} personas
        </span>
      </div>

      <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
        <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
          <MapPin size={13} />
          <span className="text-[10px]">Ubicación</span>
        </div>
        <span className="text-[13px] font-semibold text-festiva-midnight-blue">{evento.ubicacion}</span>
      </div>

      <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
        <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
          <Wallet size={13} />
          <span className="text-[10px]">Presupuesto</span>
        </div>
        <span className="text-[13px] font-semibold text-festiva-midnight-blue">{evento.presupuesto}</span>
      </div>
    </div>

    {evento.descripcion && (
      <div className="mt-4">
        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-1.5">
          Descripción
        </p>
        <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">{evento.descripcion}</p>
      </div>
    )}
  </div>
);