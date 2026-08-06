import { TrendingUp, Briefcase, Star, HelpCircle, CircleX, MinusCircle, CircleCheckBig } from "lucide-react";
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

const getTasaRespuestaDetalle = (tasa: string | number) => {
  const tasaStr = String(tasa).trim();

  if (!tasaStr || tasaStr === '' || tasaStr === 'N/A' || tasaStr === '-') {
    return {
      detalle: "Sin datos",
      detalleColor: "text-festiva-gray", 
      detalleIcon: <HelpCircle className="h-3.5 w-3.5" />,
    };
  }

  const cleanStr = tasaStr.replace('%', '').replace(',', '.').trim();
  const tasaNum = parseFloat(cleanStr);

  if (isNaN(tasaNum)) {
    return {
      detalle: "Valor inválido",
      detalleColor: "text-festiva-gray",
      detalleIcon: <HelpCircle className="h-3.5 w-3.5" />,
    };
  }

  if (tasaNum < 30) {
    return {
      detalle: "Malo",
      detalleColor: "text-festiva-berry-punch", 
      detalleIcon: <CircleX className="h-3.5 w-3.5" />,
    };
  }

  if (tasaNum < 70) {
    return {
      detalle: "Mejorable",
      detalleColor: "text-festiva-sunset-gold",
      detalleIcon: <MinusCircle className="h-3.5 w-3.5" />,
    };
  }

  return {
    detalle: "Excelente",
    detalleColor: "text-festiva-mint-neon", 
    detalleIcon: <CircleCheckBig className="h-3.5 w-3.5" />,
  };
};

export default function StatsGrid({
  ingresosMes,
  ingresosVariacion,
  eventosActivos,
  eventosEnNegociacion,
  calificacion,
  cantidadResenas,
  tasaRespuesta,
}: StatsGridProps) {
  const tasaDetalle = getTasaRespuestaDetalle(tasaRespuesta);

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        valor={ingresosMes}
        label="Ingresos del mes"
        detalle={`${ingresosVariacion}`}
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
        detalle={tasaDetalle.detalle}
        detalleColor={tasaDetalle.detalleColor}
        detalleIcon={tasaDetalle.detalleIcon}
      />

    </div>
  );
}