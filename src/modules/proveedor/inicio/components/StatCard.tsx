import Card from "@/shared/components/Card";

interface StatCardProps {
  valor: string;
  label: string;
  detalle: string;
  detalleColor?: string;
  detalleIcon?: React.ReactNode;
}

export default function StatCard({ valor, label, detalle, detalleColor = "text-slate-400", detalleIcon }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-1.5">
      <span className="text-2xl font-bold text-festiva-midnight-blue">{valor}</span>
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`flex items-center gap-1 text-xs font-semibold ${detalleColor}`}>
        {detalleIcon}
        {detalle}
      </span>
    </Card>
  );
}