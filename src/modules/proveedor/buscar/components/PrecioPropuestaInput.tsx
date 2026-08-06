"use client";

import { Coins } from "lucide-react";

interface PrecioPropuestaInputProps {
  precio: number;
  onChange: (precio: number) => void;
  comisionPorcentaje: number;
}

export const PrecioPropuestaInput = ({ precio, onChange, comisionPorcentaje }: PrecioPropuestaInputProps) => {
  const comision = Math.round(precio * (comisionPorcentaje / 100));

  return (
    <div className="bg-white rounded-3xl shadow-sm p-5">
      <p className="font-bold text-festiva-midnight-blue mb-3">Precio total de tu propuesta</p>

      <div className="flex items-center gap-2 bg-festiva-monochromatic rounded-2xl border border-slate-100 px-4 py-3 mb-4 focus-within:border-festiva-electric-violet/30">
        <span className="text-2xl font-medium text-slate-300">L</span>
        <input
          type="number"
          value={precio}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-3xl font-extrabold text-festiva-midnight-blue focus:outline-none"
        />
      </div>

      <p className="flex items-center gap-2 text-sm text-gray-500">
        <Coins size={16} className="text-gray-400 shrink-0" />
        Comisión Festiva ({comisionPorcentaje}%):{" "}
        <span className="font-bold text-festiva-midnight-blue">L{comision.toLocaleString("es-HN")} HN</span>
      </p>
    </div>
  );
};