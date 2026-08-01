"use client";

import { Search } from "lucide-react";

interface BuscarInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BuscarInput({ value, onChange }: BuscarInputProps) {
  return (
    <div className="flex items-center gap-3 px-4 h-[52px] rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <Search className="h-[18px] w-[18px] text-slate-400 shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por ciudad, tipo, servicio..."
        className="w-full h-full bg-transparent text-[15px] text-festiva-midnight-blue placeholder-slate-400 focus:outline-none"
      />
    </div>
  );
}