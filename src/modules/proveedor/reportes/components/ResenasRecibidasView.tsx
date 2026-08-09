"use client";

import { Star, MessageSquareDashed } from "lucide-react";
import TopNavbar from "@/shared/components/TopNavbar";
import Card from "@/shared/components/Card";
import type { ResenasProveedorResult, ResenaRecibida } from "@/modules/proveedor/reportes/services/resenas-recibidas.service";

interface ResenasRecibidasViewProps {
  data: ResenasProveedorResult;
}

function formatFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-HN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StarRating({ puntuacion, size = 14 }: { puntuacion: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
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

function ResenaCard({ resena }: { resena: ResenaRecibida }) {
  return (
    <Card className="!p-0 overflow-hidden">
      {/* Header del cliente */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#F5F2FA]">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-festiva-euphoric-pink to-festiva-confetti-orange flex items-center justify-center">
          {resena.foto_cliente_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resena.foto_cliente_url}
              alt={resena.nombre_cliente}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-[13px]">
              {iniciales(resena.nombre_cliente)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14px] text-festiva-midnight-blue m-0 truncate">
            {resena.nombre_cliente}
          </p>
          <p className="text-[11px] text-festiva-midnight-blue/45 m-0 truncate">
            {resena.titulo_evento}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <StarRating puntuacion={resena.puntuacion} />
          <span className="text-[11px] text-festiva-midnight-blue/40">
            {formatFecha(resena.creada_en)}
          </span>
        </div>
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
    </Card>
  );
}

export default function ResenasRecibidasView({ data }: ResenasRecibidasViewProps) {
  const { resenas, calificacion_promedio, total_resenas } = data;

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
              Cuando los clientes finalicen un evento contigo podrán dejarte una calificación aquí.
            </p>
          </div>
        ) : (
          <>
            {/* Resumen de calificación */}
            <Card className="!p-4 mb-5 mt-1">
              <div className="flex items-center gap-4">
                {/* Número grande */}
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-festiva-confetti-orange/15 to-festiva-euphoric-pink/10 shrink-0">
                  <span className="text-2xl font-extrabold text-festiva-midnight-blue leading-none">
                    {calificacion_promedio.toFixed(1)}
                  </span>
                  <Star
                    size={13}
                    className="fill-festiva-confetti-orange text-festiva-confetti-orange mt-0.5"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px] text-festiva-midnight-blue m-0 mb-1">
                    Calificación promedio
                  </p>
                  <StarRating puntuacion={Math.round(calificacion_promedio)} size={16} />
                  <p className="text-[12px] text-festiva-midnight-blue/45 mt-1 m-0">
                    Basado en {total_resenas} reseña{total_resenas === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Separador */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-festiva-midnight-blue/8" />
              <span className="text-[11px] font-bold text-festiva-midnight-blue/35 uppercase tracking-wide whitespace-nowrap">
                {total_resenas} reseña{total_resenas === 1 ? "" : "s"} recibidas
              </span>
              <div className="flex-1 h-px bg-festiva-midnight-blue/8" />
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-3">
              {resenas.map((r) => (
                <ResenaCard key={r.id_calificacion} resena={r} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
