"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, Send } from "lucide-react";
import Button from "@/shared/components/Button";
import Textarea from "@/shared/components/Textarea";
import { ProveedorCalificacionCard } from "@/modules/cliente/calificaciones/components/ProveedorCalificacionCard";
import { SelectorEstrellas } from "@/modules/cliente/calificaciones/components/SelectorEstrellas";
import { ChipAtributo } from "@/modules/cliente/calificaciones/components/ChipAtributo";
import type { ProveedorCalificado } from "@/modules/cliente/calificaciones/types/calificaciones.types";

// TODO: reemplazar por fetch real a TBL_CONTRATACIONES / insert en TBL_CALIFICACIONES cuando conectemos Supabase
const proveedorMock: ProveedorCalificado = {
  nombreComercial: "Decos Mágicos",
  iniciales: "DM",
  servicio: "Decoración",
  evento: "Boda de Ana y Luis",
};

const atributosDisponibles = [
  "Puntual",
  "Profesional",
  "Creativo",
  "Excelente calidad",
  "Buen precio",
  "Comunicación",
];

export default function CalificarServicioPage() {
  const router = useRouter();
  const [puntuacion, setPuntuacion] = useState(4);
  const [seleccionados, setSeleccionados] = useState<string[]>([
    "Puntual",
    "Profesional",
    "Excelente calidad",
  ]);
  const [comentario, setComentario] = useState("");

  const toggleAtributo = (label: string) => {
    setSeleccionados((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="px-5 pt-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-festiva-midnight-blue">Califica el servicio</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
        >
          <X size={18} className="text-festiva-midnight-blue" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center gap-3 mb-6">
        <div className="w-16 h-16 rounded-full bg-festiva-mint-neon/10 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-festiva-mint-neon" />
        </div>
        <h2 className="text-lg font-bold text-festiva-midnight-blue">Evento completado</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Comparte tu experiencia con {proveedorMock.nombreComercial}. Tu opinión ayuda a otros organizadores.
        </p>
      </div>

      <ProveedorCalificacionCard proveedor={proveedorMock} />

      <div className="flex flex-col items-center gap-2 my-6">
        <p className="font-bold text-festiva-midnight-blue">Tu calificación general</p>
        <SelectorEstrellas valor={puntuacion} onChange={setPuntuacion} />
      </div>

      <div className="mb-6">
        <p className="font-bold text-festiva-midnight-blue mb-3">Qué destacarías</p>
        {/* justify-center agregado */}
        <div className="flex flex-wrap justify-center gap-2">
          {atributosDisponibles.map((label) => (
            <ChipAtributo
              key={label}
              label={label}
              seleccionado={seleccionados.includes(label)}
              onToggle={() => toggleAtributo(label)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Textarea
          label="Comentario (opcional)"
          placeholder="Describe tu experiencia con este proveedor..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          // Override completo del className: el Textarea compartido no combina clases,
          // las reemplaza. Repito su estilo base y solo cambio el borde para que se note.
          className="w-full p-4 rounded-[16px] bg-white border border-gray-200 text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 resize-none focus:outline-none focus:border-festiva-electric-violet transition-all duration-200 leading-relaxed"
        />
      </div>

      <Button variant="primary" size="lg" shape="pill" className="w-full mb-3">
        <Send size={18} />
        Enviar reseña
      </Button>

      {/* Antes era texto plano; ahora es un botón con borde visible*/}
      <button
        type="button"
        onClick={() => router.back()}
        className="w-full text-center text-sm font-bold text-festiva-midnight-blue bg-white border border-gray-200 rounded-full py-3.5"
      >
        Omitir por ahora
      </button>
    </div>
  );
}