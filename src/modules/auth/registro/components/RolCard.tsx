"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandVariant } from "@/shared/components/Chip";

interface RolCardProps {
  slug: string;
  variant: BrandVariant;
  icon: React.ReactNode;
  titulo: string;
  descripcion: string;
  tagLabel: string;
}

const iconBgClasses: Record<BrandVariant, string> = {
  "euphoric-pink": "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink",
  "electric-violet": "bg-festiva-electric-violet/10 text-festiva-electric-violet",
  "mint-neon": "bg-festiva-mint-neon/10 text-festiva-mint-neon",
  "confetti-orange": "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
  default: "bg-slate-100 text-slate-700",
};

const tagClasses: Record<BrandVariant, string> = {
  "euphoric-pink": "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink",
  "electric-violet": "bg-festiva-electric-violet/10 text-festiva-electric-violet",
  "mint-neon": "bg-festiva-mint-neon/10 text-festiva-mint-neon",
  "confetti-orange": "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
  default: "bg-slate-100 text-slate-700",
};

export default function RolCard({ slug, variant, icon, titulo, descripcion, tagLabel }: RolCardProps) {

  return (
    <Link
      href={slug}
      className="flex flex-col gap-4 rounded-[24px] bg-white p-5 shadow-[0_2px_16px_rgba(38,30,78,0.06)] transition-transform active:scale-[0.98]"
    >
      <div className="flex items-start gap-4">
        <div className={`flex items-center justify-center h-12 w-12 rounded-2xl shrink-0 ${iconBgClasses[variant]}`}>
          {icon}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-festiva-midnight-blue">{titulo}</h3>
          <p className="text-sm text-slate-400 leading-snug">{descripcion}</p>
        </div>
      </div>

      <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-3.5 py-2 text-[13px] font-bold ${tagClasses[variant]}`}>
        {tagLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}