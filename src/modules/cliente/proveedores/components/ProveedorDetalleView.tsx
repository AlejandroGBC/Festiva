"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/components/ProveedorDetalleView.tsx
 */

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star, Image as ImageIcon, MessageSquareText } from "lucide-react";

import Card from "@/shared/components/Card";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { ProveedorDetalle } from "@/modules/cliente/proveedores/types/proveedor-detalle.types";
import { formatFecha } from "@/shared/utils/tiempo";

interface ProveedorDetalleViewProps {
  proveedor: ProveedorDetalle;
}

const COLORES_PORTAFOLIO = [
  { bg: "bg-festiva-electric-violet/10", text: "text-festiva-electric-violet" },
  { bg: "bg-festiva-euphoric-pink/10", text: "text-festiva-euphoric-pink" },
  { bg: "bg-festiva-confetti-orange/10", text: "text-festiva-confetti-orange" },
  { bg: "bg-festiva-mint-neon/10", text: "text-festiva-mint-neon" },
];

export default function ProveedorDetalleView({ proveedor }: ProveedorDetalleViewProps) {
  const router = useRouter();

  const inicial = proveedor.nombre_comercial
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("");

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar">
      <header className="bg-festiva-midnight-blue px-5 pt-14 pb-7 rounded-b-[28px]">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-festiva-euphoric-pink/20 border-2 border-festiva-euphoric-pink/30 flex items-center justify-center shrink-0 text-lg font-bold text-white">
            {inicial}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-white m-0 truncate">
              {proveedor.nombre_comercial}
            </h1>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-[13px] text-white/50">
                <MapPin size={12} />
                {proveedor.ubicacion_base}
              </span>
            </div>
            {proveedor.calificacion_promedio != null ? (
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={13} className="fill-festiva-confetti-orange text-festiva-confetti-orange" />
                <span className="text-[13px] font-bold text-white">
                  {proveedor.calificacion_promedio}
                </span>
                <span className="text-[12px] text-white/40">
                  ({proveedor.cantidad_calificaciones} reseña{proveedor.cantidad_calificaciones === 1 ? "" : "s"})
                </span>
              </div>
            ) : (
              <span className="inline-block mt-1.5 text-[12px] font-semibold text-white/50">
                Sin calificaciones todavía
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <Card className="!p-3.5 text-center">
            <p className="font-extrabold text-lg text-festiva-electric-violet m-0">
              {proveedor.cantidad_eventos_realizados}
            </p>
            <p className="text-[11px] text-festiva-midnight-blue/50 m-0 mt-0.5">Eventos</p>
          </Card>
          <Card className="!p-3.5 text-center">
            <p className="font-extrabold text-lg text-festiva-confetti-orange m-0">
              {proveedor.calificacion_promedio ?? "—"}
            </p>
            <p className="text-[11px] text-festiva-midnight-blue/50 m-0 mt-0.5">Rating</p>
          </Card>
          <Card className="!p-3.5 text-center">
            <p className="font-extrabold text-lg text-festiva-mint-neon m-0">
              {proveedor.miembro_desde}
            </p>
            <p className="text-[11px] text-festiva-midnight-blue/50 m-0 mt-0.5">Miembro desde</p>
          </Card>
        </div>

        {/* Especialidades */}
        {proveedor.especialidades.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-base text-festiva-midnight-blue mb-3">Especialidades</h2>
            <div className="flex flex-wrap gap-2">
              {proveedor.especialidades.map((esp) => {
                const { Icon, color } = obtenerIconoServicio(esp);
                return (
                  <span
                    key={esp}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold ${color.bg} ${color.text}`}
                  >
                    <Icon size={14} />
                    {esp}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Descripción */}
        {proveedor.descripcion && (
          <div className="mt-6">
            <h2 className="font-bold text-base text-festiva-midnight-blue mb-2">Sobre el proveedor</h2>
            <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
              {proveedor.descripcion}
            </p>
          </div>
        )}

        {/* Portafolio */}
        {proveedor.portafolio.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-base text-festiva-midnight-blue mb-3">Portafolio</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {proveedor.portafolio.map((trabajo, i) => {
                const color = COLORES_PORTAFOLIO[i % COLORES_PORTAFOLIO.length];
                return (
                  <div
                    key={trabajo.id_portafolio}
                    className="aspect-square rounded-2xl overflow-hidden relative border border-[#EDEAF8]"
                  >
                    {trabajo.imagen_portada ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={trabajo.imagen_portada}
                        alt={trabajo.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${color.bg}`}>
                        <ImageIcon size={22} className={color.text} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-2">
                      <p className="text-[11px] font-semibold text-white m-0 truncate">
                        {trabajo.titulo}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reseñas */}
        {proveedor.resenas.length > 0 && (
          <div className="mt-6 mb-4">
            <h2 className="font-bold text-base text-festiva-midnight-blue mb-3">
              Reseñas ({proveedor.resenas.length})
            </h2>
            <div className="flex flex-col gap-2.5">
              {proveedor.resenas.map((r) => (
                <Card key={r.id_calificacion} className="!p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={13}
                          className={
                            n <= r.puntuacion
                              ? "fill-festiva-confetti-orange text-festiva-confetti-orange"
                              : "text-festiva-midnight-blue/10"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-festiva-midnight-blue/40">
                      {formatFecha(r.creada_en)}
                    </span>
                  </div>
                  {r.comentario && (
                    <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
                      {r.comentario}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {proveedor.portafolio.length === 0 && proveedor.resenas.length === 0 && (
          <Card className="text-center py-10 mt-6">
            <div className="w-14 h-14 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-3 text-festiva-midnight-blue/20">
              <MessageSquareText size={22} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              Este proveedor todavía no tiene portafolio ni reseñas
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50 m-0">
              Se irán completando a medida que realice eventos en Festiva.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}