"use client";

import { KeyboardEvent } from "react";
import { LucideIcon } from "lucide-react";

interface ServicioChipButtonProps {
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  onToggle: () => void;
}

export default function ServicioChipButton({ label, icon: Icon, selected, onToggle }: ServicioChipButtonProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-2.5 px-4 py-3 min-h-[54px] rounded-2xl border cursor-pointer select-none transition-all duration-150 ${
        selected
          ? "border-festiva-electric-violet bg-festiva-electric-violet/5"
          : "border-slate-200 bg-white"
      }`}
    >
      {Icon && (
        <Icon
          className={`h-[18px] w-[18px] shrink-0 ${
            selected ? "text-festiva-electric-violet" : "text-slate-300"
          }`}
        />
      )}
      <span
        className={`text-sm font-bold leading-snug line-clamp-2 ${
          selected ? "text-festiva-electric-violet" : "text-slate-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}