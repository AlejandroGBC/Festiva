"use client";

import { useRouter } from "next/navigation";
import { Star, MessageSquareDashed, Calendar, ChevronRight } from "lucide-react";
import TopNavbar from "@/shared/components/TopNavbar";
import Card from "@/shared/components/Card";
import type { ResenaEscrita } from "@/modules/cliente/perfil/services/mis-resenas.service";

interface MisResenasViewProps {
  resenas: ResenaEscrita[];
}

function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-HN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StarRating({ puntuacion }: { puntuacion: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={
            n <= puntuacion
              ? "fill-festiva-confetti-orange text-festiva-confetti-orange"
              : "text-festiva-midnight-blue/10"
          }
        />
      ))}
    </div>
  );
}

function ResenaCard({ resena, onVerEvento }: { resena: ResenaEscrita; onVerEvento: () => void }) {
  return (
    <Card className="!p-0 overflow-hidden">
      {/* Header del proveedor */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#F5F2FA]">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden bg-gradient-to-br from-festiva-electric-violet to-festiva-euphoric-pink flex items-center justify-center">
          {resena.foto_proveedor_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resena.foto_proveedor_url}
              alt={resena.nombre_comercial}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-[13px]">
              {Iniciales(resena.nombre_comercial)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14px] text-festiva-midnight-blue m-0 truncate">
            {resena.nombre_comercial}
          </p>
          <StarRating puntuacion={resena.puntuacion} />
        </div>

        <span className="text-[11px] text-festiva-midnight-blue/40 shrink-0">
          {formatFecha(resena.creada_en)}
        </span>
      </div>

      {/* Comentario */}
      <div className="px-4 py-3">
        {resena.comentario ? (
          <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
            &ldquo;{resena.comentario}&rdquo;
          </p>
        ) : (
          <p className="text-[13px] text-festiva-midnight-blue/35 italic m-0">
            Sin comentario
          </p>
        )}
      </div>

      {/* Footer — enlace al evento */}
      <button
        onClick={onVerEvento}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-[#F5F2FA] hover:bg-[#EDE9F8] transition-colors"
      >
        <Calendar size={12} className="text-festiva-electric-violet shrink-0" />
        <span className="text-[11px] font-semibold text-festiva-midnight-blue/60 flex-1 text-left truncate">
          {resena.titulo_evento}
        </span>
        <ChevronRight size={12} className="text-festiva-midnight-blue/25 shrink-0" />
      </button>
    </Card>
  );
}

export default function MisResenasView({ resenas }: MisResenasViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Mis reseñas" />

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        {resenas.length === 0 ? (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center text-center pt-16 pb-8">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-center mb-5">
              <MessageSquareDashed
                size={36}
                className="text-festiva-midnight-blue/20"
              />
            </div>
            <h2 className="font-bold text-lg text-festiva-midnight-blue mb-2">
              Aún no tienes reseñas
            </h2>
            <p className="text-[13px] text-festiva-midnight-blue/50 max-w-[260px] leading-relaxed">
              Cuando termines un evento podrás calificar a los proveedores que contrataste.
            </p>
          </div>
        ) : (
          <>
            {/* Resumen */}
            <div className="flex items-center gap-2 mb-4 mt-1">
              <div className="flex-1 h-px bg-festiva-midnight-blue/8" />
              <span className="text-[11px] font-bold text-festiva-midnight-blue/35 uppercase tracking-wide whitespace-nowrap">
                {resenas.length} reseña{resenas.length === 1 ? "" : "s"} escritas
              </span>
              <div className="flex-1 h-px bg-festiva-midnight-blue/8" />
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-3">
              {resenas.map((r) => (
                <ResenaCard
                  key={r.id_calificacion}
                  resena={r}
                  onVerEvento={() =>
                    router.push(`/cliente/eventos/${r.id_evento}`)
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
