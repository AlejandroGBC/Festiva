import { Briefcase, Star, } from "lucide-react";
import StatCard from "./StatCard";
import { getTasaRespuestaDetalle, getVariacionDetalle } from "../util/inicio.util";
import { StatsGridProps } from "../types/inicio.types";

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
  const variacionDetalle = getVariacionDetalle(ingresosVariacion);

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        valor={ingresosMes}
        label="Ingresos del mes"
        detalle={variacionDetalle.detalle}
        detalleColor={variacionDetalle.detalleColor}
        detalleIcon={variacionDetalle.detalleIcon}
        href="/proveedor/reportes"
      />

      <StatCard
        valor={String(eventosActivos)}
        label="Eventos activos"
        detalle={`${eventosEnNegociacion} en negociacion`}
        detalleColor="text-festiva-electric-violet"
        detalleIcon={<Briefcase className="h-3.5 w-3.5" />}
        href="/proveedor/eventos"
      />

      <StatCard
        valor={calificacion.toFixed(1)}
        label="Calificacion"
        detalle={`${cantidadResenas} resenas`}
        detalleColor="text-festiva-confetti-orange"
        detalleIcon={<Star className="h-3.5 w-3.5 fill-current" />}
        href="/proveedor/reportes/resenas"
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