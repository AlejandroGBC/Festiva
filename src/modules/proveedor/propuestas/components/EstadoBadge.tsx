import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { EstadoPropuesta } from "../types/propuestas.types";

const config: Record<EstadoPropuesta, { label: string; className: string; Icon: LucideIcon }> = {
  enviada: { label: "En revisión", className: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange", Icon: Clock },
  aceptada: { label: "Aceptada", className: "bg-festiva-mint-neon/10 text-festiva-mint-neon", Icon: CheckCircle2 },
  rechazada: { label: "Rechazada", className: "bg-gray-100 text-gray-500", Icon: XCircle },
  cancelada: { label: "Cancelada", className: "bg-gray-100 text-gray-500", Icon: XCircle },
};

export const EstadoBadge = ({ estado }: { estado: EstadoPropuesta }) => {
  const { label, className, Icon } = config[estado];
  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 ${className}`}>
      <Icon size={13} />
      {label}
    </span>
  );
};