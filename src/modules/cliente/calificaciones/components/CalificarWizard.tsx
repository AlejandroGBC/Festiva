"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, CheckCircle2, ChevronRight } from "lucide-react";
import Button from "@/shared/components/Button";
import Textarea from "@/shared/components/Textarea";
import { ChipAtributo } from "@/modules/cliente/calificaciones/components/ChipAtributo";
import {
  enviarCalificacion,
} from "@/modules/cliente/calificaciones/services/calificaciones.service";
import type { ContratacionParaCalificar } from "@/shared/types/calificaciones-cliente.types";

const ATRIBUTOS_DISPONIBLES = [
  "Puntual",
  "Profesional",
  "Creativo",
  "Excelente calidad",
  "Buen precio",
  "Comunicación fluida",
];

interface SelectorEstrellasProps {
  valor: number;
  onChange: (v: number) => void;
}

function SelectorEstrellas({ valor, onChange }: SelectorEstrellasProps) {
  const [hover, setHover] = useState<number | null>(null);
  const activo = hover ?? valor;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n)}
            className="p-1 transition-transform active:scale-90"
          >
            <Star
              size={36}
              className={
                n <= activo
                  ? "text-festiva-confetti-orange fill-festiva-confetti-orange drop-shadow-sm"
                  : "text-gray-200 fill-gray-200"
              }
            />
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold text-festiva-midnight-blue/50">
        {valor === 0
          ? "Toca para calificar"
          : valor === 5
          ? "¡Excelente! 5 estrellas"
          : `${valor} de 5 estrellas`}
      </p>
    </div>
  );
}

interface Props {
  contrataciones: ContratacionParaCalificar[];
  idEvento: string;
}

export default function CalificarWizard({ contrataciones, idEvento }: Props) {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [atributosSeleccionados, setAtributosSeleccionados] = useState<string[]>([]);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [completado, setCompletado] = useState(false);

  const actual = contrataciones[paso];
  const esUltimo = paso === contrataciones.length - 1;
  const progresoPorcentaje = Math.round(((paso) / contrataciones.length) * 100);

  function toggleAtributo(label: string) {
    setAtributosSeleccionados((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }

  function buildComentario(): string | null {
    const partes: string[] = [];
    if (atributosSeleccionados.length > 0) {
      partes.push(`[${atributosSeleccionados.join(", ")}]`);
    }
    if (comentario.trim()) partes.push(comentario.trim());
    return partes.length > 0 ? partes.join("\n") : null;
  }

  async function handleEnviar() {
    if (puntuacion === 0) {
      setError("Debes seleccionar al menos 1 estrella.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      await enviarCalificacion({
        id_contratacion: actual.id_contratacion,
        puntuacion,
        comentario: buildComentario(),
      });

      if (esUltimo) {
        setCompletado(true);
        return;
      }

      // Avanzar al siguiente proveedor
      setPaso((p) => p + 1);
      setPuntuacion(0);
      setAtributosSeleccionados([]);
      setComentario("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo enviar la reseña.");
    } finally {
      setEnviando(false);
    }
  }

  /* ── Pantalla final de éxito ── */
  if (completado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60dvh] px-6 text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-festiva-mint-neon/15 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-festiva-mint-neon" />
        </div>
        <h2 className="text-xl font-bold text-festiva-midnight-blue">
          ¡Gracias por tu reseña!
        </h2>
        <p className="text-sm text-festiva-midnight-blue/60 max-w-xs">
          Tu opinión ayuda a otros organizadores a encontrar los mejores proveedores.
        </p>
        <Button
          variant="primary"
          size="lg"
          shape="pill"
          className="w-full max-w-xs mt-4"
          onClick={() => router.push(`/cliente/eventos/${idEvento}`)}
        >
          Volver al evento
        </Button>
      </div>
    );
  }

  /* ── Formulario del paso actual ── */
  return (
    <div className="flex flex-col gap-0 w-full pb-10">
      {/* Barra de progreso */}
      {contrataciones.length > 1 && (
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-festiva-midnight-blue/50 mb-1.5">
            <span>
              Proveedor {paso + 1} de {contrataciones.length}
            </span>
            <span className="text-festiva-euphoric-pink">{progresoPorcentaje}%</span>
          </div>
          <div className="h-1.5 w-full bg-festiva-midnight-blue/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-festiva-euphoric-pink rounded-full transition-all duration-500"
              style={{ width: `${progresoPorcentaje}%` }}
            />
          </div>
        </div>
      )}

      <div className="px-5 pt-4 flex flex-col gap-5">
        {/* Card del proveedor */}
        <div className="bg-white rounded-2xl border border-festiva-electric-violet/10 p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-festiva-euphoric-pink/10 border border-festiva-euphoric-pink/20 flex items-center justify-center shrink-0 font-bold text-festiva-euphoric-pink text-sm">
            {actual.iniciales}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-festiva-midnight-blue text-[15px] truncate">
              {actual.nombre_comercial}
            </p>
            {actual.servicios.length > 0 && (
              <p className="text-xs text-festiva-midnight-blue/50 truncate">
                {actual.servicios.join(" · ")}
              </p>
            )}
          </div>
        </div>

        {/* Selector de estrellas */}
        <div className="flex flex-col items-center gap-1 py-2">
          <p className="font-bold text-festiva-midnight-blue mb-2">
            ¿Cómo calificarías el servicio?
          </p>
          <SelectorEstrellas valor={puntuacion} onChange={setPuntuacion} />
        </div>

        {/* Atributos */}
        <div>
          <p className="font-bold text-festiva-midnight-blue mb-3 text-[14px]">
            ¿Qué destacarías? <span className="font-normal text-festiva-midnight-blue/40">(opcional)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {ATRIBUTOS_DISPONIBLES.map((label) => (
              <ChipAtributo
                key={label}
                label={label}
                seleccionado={atributosSeleccionados.includes(label)}
                onToggle={() => toggleAtributo(label)}
              />
            ))}
          </div>
        </div>

        {/* Comentario libre */}
        <Textarea
          label="Comentario (opcional)"
          placeholder={`Describe tu experiencia con ${actual.nombre_comercial}...`}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full p-4 rounded-[16px] bg-white border border-gray-200 text-[15px] font-medium text-festiva-midnight-blue placeholder-slate-400 resize-none focus:outline-none focus:border-festiva-electric-violet transition-all duration-200 leading-relaxed"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
        )}

        {/* Botón enviar */}
        <Button
          variant="primary"
          size="lg"
          shape="pill"
          className="w-full"
          disabled={enviando || puntuacion === 0}
          onClick={handleEnviar}
        >
          {enviando ? (
            "Enviando..."
          ) : esUltimo ? (
            <>
              <Send size={18} />
              Enviar reseña
            </>
          ) : (
            <>
              Siguiente proveedor
              <ChevronRight size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
