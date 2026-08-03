"use client";

import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import Button from "@/shared/components/Button";
import type { ProveedorListado } from "@/shared/types/proveedores-cliente.types";

const CATEGORIA_VARIANTS = {
  pink: "bg-festiva-euphoric-pink/10 text-festiva-euphoric-pink",
  violet: "bg-festiva-electric-violet/10 text-festiva-electric-violet",
  orange: "bg-festiva-confetti-orange/10 text-festiva-confetti-orange",
  mint: "bg-festiva-mint-neon/10 text-festiva-mint-neon",
};

const AVATAR_COLORS = [
  "bg-festiva-euphoric-pink",
  "bg-festiva-confetti-orange",
  "bg-festiva-electric-violet",
];

interface ProveedorListingCardProps {
  proveedor: ProveedorListado;
  onVerPerfil?: () => void;
}

export const ProveedorListingCard = ({ proveedor, onVerPerfil }: ProveedorListingCardProps) => {
  const [indiceImagen, setIndiceImagen] = useState(0);
  const avatarBg = AVATAR_COLORS[proveedor.nombreComercial.length % AVATAR_COLORS.length];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col shrink-0">
      <div className="relative h-48 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proveedor.imagenes[indiceImagen]}
          alt={proveedor.nombreComercial}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {proveedor.verificado && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 text-festiva-mint-neon text-xs font-bold px-3 py-1.5 rounded-full">
            <BadgeCheck size={14} />
            VERIFICADO
          </span>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${avatarBg}`}>
            {proveedor.iniciales}
          </span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{proveedor.nombreComercial}</p>
            <p className="flex items-center gap-1 text-white/90 text-xs">
              <Star size={12} className="fill-festiva-confetti-orange text-festiva-confetti-orange" />
              {proveedor.calificacion} ({proveedor.cantidadResenas})
            </p>
          </div>
        </div>

        {proveedor.imagenes.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {proveedor.imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndiceImagen(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === indiceImagen ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {proveedor.etiquetas.map((etiqueta) => (
            <span key={etiqueta.label} className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORIA_VARIANTS[etiqueta.variant]}`}>
              {etiqueta.label}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-500 leading-snug">{proveedor.descripcion}</p>

        <hr className="border-t border-gray-100" />

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Desde</p>
            <p className="text-lg font-extrabold text-festiva-midnight-blue">${proveedor.precioDesde.toLocaleString("es-HN")}</p>
          </div>
          <Button variant="secondary" size="md" shape="pill" onClick={onVerPerfil}>
            Ver perfil
          </Button>
        </div>
      </div>
    </div>
  );
};