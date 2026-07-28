import Card from "@/shared/components/Card";
import type { ItemResumenPago } from "../types/pagos.types";

export const ResumenPagoCard = ({ items }: { items: ItemResumenPago[] }) => {
  return (
    <Card>
      <div className="flex flex-col">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between py-3 ${
                index !== items.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-400" />
                <span className="text-gray-500">{item.nombre}</span>
              </div>
              <span className={`font-bold ${item.destacado ? "text-festiva-electric-violet" : "text-festiva-midnight-blue"}`}>
                L{item.monto.toLocaleString("es-HN")} HN
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};