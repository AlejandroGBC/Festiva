import { Wallet, TrendingUp } from "lucide-react";

interface BalanceHeroProps {
  balance: number;
  mes: string;
  año: number;
  formatCurrency: (amount: number) => string;
}

export default function BalanceHero({ balance, mes, año, formatCurrency }: BalanceHeroProps) {
  return (
    <article className="bg-festiva-midnight-blue p-4 text-xs">
      <h1 className="text-white/50 tracking-wider mt-5">BALANCE DISPONIBLE</h1>
      <span className="text-white text-4xl font-bold my-1">
        {formatCurrency(balance)}
      </span>
      <p className="text-white/50 mt-3">
        Actualizado hoy — Ciclo: {mes} {año}
      </p>
      <div className="mt-6 mb-3 flex gap-2">
        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
          <Wallet size={15} className="mr-2" />
          Retirar
        </div>
        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
          <TrendingUp size={15} className="mr-2" />
          Reportes
        </div>
        <div className="text-white font-semibold border border-solid border-white/15 bg-white/10 w-full px-5 py-3 rounded-2xl flex items-center justify-center">
          <Wallet size={15} className="mr-2" />
          Cuenta
        </div>
      </div>
    </article>
  );
}