"use client";

import Chip from "@/shared/components/Chip";

interface ServicioChipButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  selected: boolean;
  onToggle: () => void;
}

export default function ServicioChipButton({ label, icon, selected, onToggle }: ServicioChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`transition-opacity ${selected ? "" : "opacity-50"}`}
    >
      <Chip variant={selected ? "electric-violet" : "default"} icon={icon}>
        {label}
      </Chip>
    </button>
  );
}