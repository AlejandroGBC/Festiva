import { CreditCard, BarChart3, Wallet } from "lucide-react";

interface BalanceHeaderProps {
  montoDisponible: number;
  cicloActual: string;
  actualizadoTexto: string;
  onRetirar?: () => void;
  onReportes?: () => void;
  onCuenta?: () => void;
}

export const BalanceHeader = ({
  montoDisponible,
  cicloActual,
  actualizadoTexto,
  onRetirar,
  onReportes,
  onCuenta,
}: BalanceHeaderProps) => (
  <div className="relative w-full bg-festiva-midnight-blue text-white px-6 pt-8 pb-8 rounded-b-[1.25rem] overflow-hidden">
    <div className="absolute -right-6 -bottom-10 w-40 h-40 rounded-full bg-white/5" />
    <div className="absolute right-10 top-16 w-2 h-2 rounded-full bg-festiva-euphoric-pink/70" />
    <div className="absolute right-20 top-10 w-1.5 h-1.5 rounded-full bg-festiva-electric-violet/70" />

    <div className="relative">
      <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">Balance disponible</p>
      <p className="text-4xl font-extrabold mb-2">L{montoDisponible.toLocaleString("es-HN")} HN</p>
      <p className="text-sm text-white/60 mb-6">
        {actualizadoTexto} — Ciclo: {cicloActual}
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRetirar}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 rounded-full py-3 text-sm font-bold"
        >
          <CreditCard size={16} /> Retirar
        </button>
        <button
          type="button"
          onClick={onReportes}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 rounded-full py-3 text-sm font-bold"
        >
          <BarChart3 size={16} /> Reportes
        </button>
        <button
          type="button"
          onClick={onCuenta}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 rounded-full py-3 text-sm font-bold"
        >
          <Wallet size={16} /> Cuenta
        </button>
      </div>
    </div>
  </div>
);