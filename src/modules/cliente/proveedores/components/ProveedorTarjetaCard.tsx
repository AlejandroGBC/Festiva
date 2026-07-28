"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/components/ProveedorTarjetaCard.tsx
 */

import { Star } from "lucide-react";
import Chip from "@/shared/components/Chip";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

interface ProveedorTarjetaCardProps {
  proveedor: ProveedorTarjeta;
  onClick: () => void;
}

export default function ProveedorTarjetaCard({ proveedor, onClick }: ProveedorTarjetaCardProps) {
  const { Icon, color } = obtenerIconoServicio(proveedor.categoria);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md border border-[#EDEAF8] shadow-[0_1px_10px_rgba(38,30,78,0.05)]"
    >
      {/* Imagen / placeholder de marca */}
      <div className={`aspect-square w-full flex items-center justify-center overflow-hidden ${color.bg}`}>
        {proveedor.foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={proveedor.foto_url}
            alt={proveedor.nombre_comercial}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center">
            <Icon size={22} className={color.text} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-[15px] text-festiva-midnight-blue leading-tight truncate">
          {proveedor.nombre_comercial}
        </p>
        <p className="text-[13px] text-festiva-midnight-blue/50 mt-0.5 truncate">
          {proveedor.categoria}
        </p>

        <div className="flex items-center justify-between mt-1.5 gap-2">
          {proveedor.calificacion != null ? (
            <span className="flex items-center gap-1 text-sm shrink-0">
              <Star size={13} className="fill-festiva-confetti-orange text-festiva-confetti-orange" />
              <span className="font-bold text-festiva-midnight-blue">{proveedor.calificacion}</span>
              <span className="text-festiva-midnight-blue/40 text-xs">
                ({proveedor.cantidad_calificaciones})
              </span>
            </span>
          ) : (
            <Chip>Nuevo</Chip>
          )}

          {proveedor.precio_desde != null && (
            <span className="font-bold text-xs text-festiva-electric-violet truncate">
              Desde ${proveedor.precio_desde.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}