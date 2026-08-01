import { TrendingUp } from "lucide-react";
import Card from "@/shared/components/Card";
import type { PuntoIngresoMensual } from "@/shared/types/historial-proveedor.types";

interface IngresosChartCardProps {
  puntos: PuntoIngresoMensual[];
  crecimientoPorcentaje: number;
}

export const IngresosChartCard = ({ puntos, crecimientoPorcentaje }: IngresosChartCardProps) => {
  const maxMonto = Math.max(...puntos.map((p) => p.monto));
  const mesActivo = puntos[puntos.length - 1]?.mes;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-festiva-midnight-blue">Ingresos — Últimos 6 meses</h3>
        <span className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-festiva-mint-neon/10 text-festiva-mint-neon whitespace-nowrap">
          <TrendingUp size={13} /> +{crecimientoPorcentaje}%
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 h-24 mb-3">
        {puntos.map((punto) => {
          const alturaPct = Math.max((punto.monto / maxMonto) * 100, 8);
          const esActivo = punto.mes === mesActivo;
          return (
            <div key={punto.mes} className="flex-1 h-full flex items-end">
              <div
                className={`w-full rounded-full ${esActivo ? "bg-festiva-electric-violet" : "bg-festiva-electric-violet/15"}`}
                style={{ height: `${alturaPct}%` }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        {puntos.map((punto) => (
          <span
            key={punto.mes}
            className={`flex-1 text-center text-xs font-semibold ${
              punto.mes === mesActivo ? "text-festiva-electric-violet" : "text-gray-400"
            }`}
          >
            {punto.mes}
          </span>
        ))}
      </div>
    </Card>
  );
};