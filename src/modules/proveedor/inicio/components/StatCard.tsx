"use client";

import { useRouter } from "next/navigation";
import Card from "@/shared/components/Card";

interface StatCardProps {
  valor: string;
  label: string;
  detalle: string;
  detalleColor?: string;
  detalleIcon?: React.ReactNode;
  href?: string;
}

export default function StatCard({ valor, label, detalle, detalleColor = "text-slate-400", detalleIcon, href }: StatCardProps) {
  const router = useRouter();

  return (
    <Card
      className={`flex flex-col gap-1.5 transition-transform active:scale-[0.97] ${
        href ? "cursor-pointer hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]" : ""
      }`}
      onClick={href ? () => router.push(href) : undefined}
    >
      <span className="text-2xl font-bold text-festiva-midnight-blue">{valor}</span>
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`flex items-center gap-1 text-xs font-semibold ${detalleColor}`}>
        {detalleIcon}
        {detalle}
      </span>
    </Card>
  );
}