import Card from "@/shared/components/Card";
import type { ProveedorCalificado } from "../../../../shared/types/calificaciones-cliente.types";

export const ProveedorCalificacionCard = ({ proveedor }: { proveedor: ProveedorCalificado }) => (
  <Card className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink font-bold flex items-center justify-center shrink-0">
      {proveedor.iniciales}
    </div>
    <div>
      <p className="font-bold text-festiva-midnight-blue">{proveedor.nombreComercial}</p>
      <p className="text-sm text-gray-500">
        {proveedor.servicio} — {proveedor.evento}
      </p>
    </div>
  </Card>
);