import Card from "@/shared/components/Card";

interface ResumenStatCardProps {
  etiqueta: string;
  monto: number;
  descripcion: string;
  color: "mint-neon" | "euphoric-pink";
  signo?: "+" | "-";
}

export const ResumenStatCard = ({ etiqueta, monto, descripcion, color, signo }: ResumenStatCardProps) => (
  <Card>
    <p className="text-sm text-gray-500 mb-2">{etiqueta}</p>
    <p className={`text-2xl font-extrabold mb-1 ${color === "mint-neon" ? "text-festiva-mint-neon" : "text-festiva-euphoric-pink"}`}>
      {signo ?? ""}L{Math.abs(monto).toLocaleString("es-HN")}
    </p>
    <p className="text-sm text-gray-400">{descripcion}</p>
  </Card>
);