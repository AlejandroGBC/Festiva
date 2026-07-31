"use client";

import { MapPin, Calendar, ListFilter } from "lucide-react";

interface FiltrosRapidosProps {
  filtroActivo: string;
  onFiltroChange: (filtro: string) => void;
}

const FILTROS = [
  { id: "todos", label: "Todos", icon: null },
  { id: "ciudad", label: "DC", icon: MapPin },
  { id: "mes", label: "Este mes", icon: Calendar },
  { id: "categoria", label: "Decoracion", icon: ListFilter },
];

export default function FiltrosRapidos({ filtroActivo, onFiltroChange }: FiltrosRapidosProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
      {FILTROS.map((filtro) => {
        const Icon = filtro.icon;
        const isActive = filtroActivo === filtro.id;
        return (
          <button
            key={filtro.id}
            onClick={() => onFiltroChange(filtro.id)}
            className={`flex items-center gap-1.5 shrink-0 px-4 h-9 rounded-full text-sm font-semibold border transition-colors ${
              isActive
                ? "bg-festiva-electric-violet/10 border-festiva-electric-violet text-festiva-electric-violet"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {filtro.label}
          </button>
        );
      })}
    </div>
  );
}