import { CreditCard } from "lucide-react";

export const AgregarTarjetaButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#EBEAF2] py-4 text-sm font-semibold text-festiva-midnight-blue"
  >
    <CreditCard size={18} />
    Agregar nueva tarjeta
  </button>
);