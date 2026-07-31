import { Check, Calendar, Award } from "lucide-react";
import type { TimelinePaso } from "../../../../shared/types/eventos-cliente.types";

const circuloEstilo: Record<TimelinePaso["status"], string> = {
  completado: "bg-festiva-mint-neon text-white",
  actual: "bg-festiva-electric-violet text-white",
  pendiente: "bg-gray-200 text-gray-400",
};

const lineaEstilo: Record<TimelinePaso["status"], string> = {
  completado: "bg-festiva-mint-neon",
  actual: "bg-gray-200",
  pendiente: "bg-gray-200",
};

const iconos = { check: Check, calendar: Calendar, award: Award };

interface TimelineItemProps extends TimelinePaso {
  esUltimo: boolean;
  children?: React.ReactNode;
}

export const TimelineItem = ({ titulo, descripcion, fecha, status, icon, esUltimo, children }: TimelineItemProps) => {
  const Icono = iconos[icon];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${circuloEstilo[status]}`}>
          <Icono size={16} />
        </div>
        {!esUltimo && <div className={`w-0.5 flex-1 ${lineaEstilo[status]}`} />}
      </div>

      <div className="pb-6">
        <p className="font-semibold text-festiva-midnight-blue">{titulo}</p>
        {descripcion && <p className="text-sm text-gray-500">{descripcion}</p>}
        <p className="text-xs text-gray-400 mt-1">{fecha}</p>
        {children}
      </div>
    </div>
  );
};