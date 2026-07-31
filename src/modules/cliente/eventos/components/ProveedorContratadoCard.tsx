import { Check, Clock } from "lucide-react";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import { ProveedorContratado } from "@/shared/types/eventos-cliente.types";

const estadoVariant: Record<ProveedorContratado["estado"], "mint-neon" | "confetti-orange"> = {
  confirmado: "mint-neon",
  pendiente: "confetti-orange",
};

const estadoLabel: Record<ProveedorContratado["estado"], string> = {
  confirmado: "Confirmado",
  pendiente: "Pendiente",
};

const estadoIcono: Record<ProveedorContratado["estado"], React.ComponentType<{ className?: string }>> = {
  confirmado: Check,
  pendiente: Clock,
};

export const ProveedorContratadoCard = ({ proveedor }: { proveedor: ProveedorContratado }) => {
  return (
    <Card className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink font-bold flex items-center justify-center shrink-0">
        {proveedor.iniciales}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-festiva-midnight-blue truncate">{proveedor.nombreComercial}</p>
        <p className="text-sm text-gray-500">
          {proveedor.servicio} — L{proveedor.monto.toLocaleString("es-HN")} HN
        </p>
      </div>

      <Chip variant={estadoVariant[proveedor.estado]} icon={estadoIcono[proveedor.estado]}>
        {estadoLabel[proveedor.estado]}
      </Chip>
    </Card>
  );
};