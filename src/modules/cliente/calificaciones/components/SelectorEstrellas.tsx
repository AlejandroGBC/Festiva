"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface SelectorEstrellasProps {
  valor: number;
  onChange: (valor: number) => void;
}

export const SelectorEstrellas = ({ valor, onChange }: SelectorEstrellasProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const activo = hover ?? valor;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n)}
            className="p-0.5"
          >
            <Star
              size={32}
              className={
                n <= activo
                  ? "text-festiva-confetti-orange fill-festiva-confetti-orange"
                  : "text-gray-200 fill-gray-200"
              }
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">{valor} de 5 estrellas</p>
    </div>
  );
};