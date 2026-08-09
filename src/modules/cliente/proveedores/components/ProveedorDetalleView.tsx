"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MapPin, Star, Image as ImageIcon, MessageSquareText,
  X, ChevronLeft, ChevronRight,
} from "lucide-react";

import Card from "@/shared/components/Card";
import Avatar from "@/shared/components/Avatar";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { ProveedorDetalle, TrabajoPortafolio } from "@/modules/cliente/proveedores/types/proveedor-detalle.types";
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
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState<TrabajoPortafolio | null>(null);
  const [fotoActualIndex, setFotoActualIndex] = useState(0);

  const inicial = proveedor.nombre_comercial
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("");

  const abrirModalTrabajo = (trabajo: TrabajoPortafolio) => {
    setTrabajoSeleccionado(trabajo);
    setFotoActualIndex(0);
  };

  const cerrarModal = () => {
    setTrabajoSeleccionado(null);
    setFotoActualIndex(0);
  };

  const imagenesModal = trabajoSeleccionado?.imagenes && trabajoSeleccionado.imagenes.length > 0
    ? trabajoSeleccionado.imagenes
    : trabajoSeleccionado?.imagen_portada
    ? [trabajoSeleccionado.imagen_portada]
    : [];

  const handlePrevFoto = () => {
    if (imagenesModal.length <= 1) return;
    setFotoActualIndex((prev) => (prev === 0 ? imagenesModal.length - 1 : prev - 1));
  };

  const handleNextFoto = () => {
    if (imagenesModal.length <= 1) return;
    setFotoActualIndex((prev) => (prev === imagenesModal.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-dvh bg-[#F5F2FA] flex flex-col overflow-hidden">
      <header className="bg-festiva-midnight-blue px-5 pt-12 pb-6 rounded-b-[28px] shrink-0 z-10 shadow-md">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="shrink-0">
            <Avatar
              initials={inicial}
              imageUrl={proveedor.foto_perfil_url || undefined}
              editable={false}
            />
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

      <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
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
                    onClick={() => abrirModalTrabajo(trabajo)}
                    className="aspect-square rounded-2xl overflow-hidden relative border border-[#EDEAF8] cursor-pointer hover:opacity-90 transition-opacity"
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

      {/* Modal con carrusel */}
      {trabajoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]">
            
            {/* Visor de imágenes / Carrusel */}
            <div className="relative w-full bg-black shrink-0 flex items-center justify-center min-h-[200px] max-h-[40vh] overflow-hidden">
              {imagenesModal.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagenesModal[fotoActualIndex]}
                  alt={`${trabajoSeleccionado.titulo} - Foto ${fotoActualIndex + 1}`}
                  className="w-full max-h-[40vh] object-contain"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-festiva-electric-violet/10">
                  <ImageIcon size={40} className="text-festiva-electric-violet" />
                </div>
              )}

              {/* Botón Cerrar */}
              <button
                onClick={cerrarModal}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Controles de Navegación del Carrusel (Si hay más de 1 imagen) */}
              {imagenesModal.length > 1 && (
                <>
                  <button
                    onClick={handlePrevFoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextFoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {imagenesModal.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFotoActualIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === fotoActualIndex
                            ? "w-4 bg-white"
                            : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-5 overflow-y-auto flex-1 min-h-0">
              <h3 className="font-bold text-lg text-festiva-midnight-blue mb-1">
                {trabajoSeleccionado.titulo}
              </h3>
              <p className="text-xs font-semibold text-festiva-electric-violet mb-3">
                Por {proveedor.nombre_comercial}
              </p>
              <p className="text-sm text-festiva-midnight-blue/70 leading-relaxed m-0 whitespace-pre-line">
                {trabajoSeleccionado.descripcion || "Sin descripción adicional para este proyecto."}
              </p>
            </div>

            <div className="p-4 bg-[#F9F8FF] border-t border-[#EDEAF8] shrink-0">
              <button
                onClick={cerrarModal}
                className="w-full py-3 bg-festiva-midnight-blue text-white font-bold rounded-2xl text-sm hover:opacity-95 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}