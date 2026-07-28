import { RefreshCw } from "lucide-react";
import ProgressBar from "@/shared/components/ProgressBar";

interface DetalleEventoHeaderProps {
  titulo: string;
  fecha: string;
  ubicacion: string;
  progreso: number;
}

export const DetalleEventoHeader = ({ titulo, fecha, ubicacion, progreso }: DetalleEventoHeaderProps) => {
  return (
    <div className="w-full bg-festiva-midnight-blue text-white px-6 pt-6 pb-8 rounded-t-none rounded-b-[1.25rem]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{titulo}</h1>
          <p className="text-white/70 text-sm mt-1">{fecha} — {ubicacion}</p>
        </div>
        <span className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
          <RefreshCw size={14} />
          Activo
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-white/70">Progreso del evento</span>
          <span className="font-semibold">{progreso}%</span>
        </div>
        <ProgressBar percentage={progreso} color="euphoric-pink" />
      </div>
    </div>
  );
};