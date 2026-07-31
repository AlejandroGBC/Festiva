import { TrendingUp, Briefcase, Star, CheckCircle2 } from "lucide-react";
import StatCard from "./StatCard";

interface StatsGridProps {
  ingresosMes: string;
  ingresosVariacion: string;
  eventosActivos: number;
  eventosEnNegociacion: number;
  calificacion: number;
  cantidadResenas: number;
  tasaRespuesta: string;
}

export default function StatsGrid({
  ingresosMes,
  ingresosVariacion,
  eventosActivos,
  eventosEnNegociacion,
  calificacion,
  cantidadResenas,
  tasaRespuesta,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        valor={ingresosMes}
        label="Ingresos del mes"
        detalle={`${ingresosVariacion} vs anterior`}
        detalleColor="text-festiva-mint-neon"
        detalleIcon={<TrendingUp className="h-3.5 w-3.5" />}
      />
      <StatCard
        valor={String(eventosActivos)}
        label="Eventos activos"
        detalle={`${eventosEnNegociacion} en negociacion`}
        detalleColor="text-festiva-electric-violet"
        detalleIcon={<Briefcase className="h-3.5 w-3.5" />}
      />
      <StatCard
        valor={calificacion.toFixed(1)}
        label="Calificacion"
        detalle={`${cantidadResenas} resenas`}
        detalleColor="text-festiva-confetti-orange"
        detalleIcon={<Star className="h-3.5 w-3.5 fill-current" />}
      />
      <StatCard
        valor={tasaRespuesta}
        label="Tasa respuesta"
        detalle="Excelente"
        detalleColor="text-festiva-mint-neon"
        detalleIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
      />
    </div>
  );
}