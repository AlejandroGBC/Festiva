"use client";

import { Camera, Sparkles, Coffee, PartyPopper } from "lucide-react";
import ServicioChipButton from "./ServicioChipButton";
import { ServicioOption } from "../types/registro.types";

const SERVICIOS: (ServicioOption & { icon: React.ComponentType<{ className?: string }> })[] = [
  { id: "fotografia", label: "Fotografia", icon: Camera },
  { id: "decoracion", label: "Decoracion", icon: Sparkles },
  { id: "catering", label: "Catering", icon: Coffee },
  { id: "animacion", label: "Animacion", icon: PartyPopper },
];

interface ServiciosAdicionalesProps {
  seleccionados: string[];
  onToggle: (id: string) => void;
}

export default function ServiciosAdicionales({ seleccionados, onToggle }: ServiciosAdicionalesProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-bold text-festiva-midnight-blue">
        Servicios adicionales
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        {SERVICIOS.map((servicio) => (
          <ServicioChipButton
            key={servicio.id}
            label={servicio.label}
            icon={servicio.icon}
            selected={seleccionados.includes(servicio.id)}
            onToggle={() => onToggle(servicio.id)}
          />
        ))}
      </div>
    </div>
  );
}