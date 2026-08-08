"use client";

/**
 * Tarjeta HORIZONTAL para listas de una columna (resultados de
 * búsqueda). Distinta de ProveedorTarjetaCard (vertical, imagen
 * cuadrada arriba), que es específica para el grid de 2 columnas de
 * "Proveedores destacados" en Inicio — en una lista de una sola
 * columna esa vertical se estira a todo el ancho y se ve enorme y
 * vacía, por eso una tarjeta distinta acá.
 */

import { Star, MapPin, ChevronRight } from "lucide-react";
import Chip from "@/shared/components/Chip";
import Card from "@/shared/components/Card";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

interface ProveedorListItemProps {
  proveedor: ProveedorTarjeta;
  onClick: () => void;
}

export default function ProveedorListItem({ proveedor, onClick }: ProveedorListItemProps) {
  const { Icon, color } = obtenerIconoServicio(proveedor.categoria);

  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card
        className={`!p-3.5 hover:shadow-md transition-shadow relative ${
          proveedor.destacado ? "border border-festiva-euphoric-pink/30" : ""
        }`}
      >
        {proveedor.destacado && (
          <div className="absolute -top-px right-4 bg-festiva-euphoric-pink text-white px-3 py-0.5 rounded-b-lg text-[10px] font-bold uppercase tracking-wide">
            Destacado
          </div>
        )}

        <div className="flex gap-3.5 items-center">
          <div
            className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${color.bg}`}
          >
            {proveedor.foto_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proveedor.foto_url}
                alt={proveedor.nombre_comercial}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon size={22} className={color.text} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="font-bold text-[15px] text-festiva-midnight-blue">
              {proveedor.nombre_comercial}
            </span>

            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
              <span className="text-[13px] text-festiva-midnight-blue/50">{proveedor.categoria}</span>
              <span className="text-festiva-midnight-blue/20">·</span>
              <span className="flex items-center gap-1 text-xs text-festiva-midnight-blue/50">
                <MapPin size={12} />
                {proveedor.ciudad}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {proveedor.calificacion != null ? (
                <span className="flex items-center gap-1 text-sm">
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
                <span className="font-bold text-xs text-festiva-electric-violet">
                  Desde L. {proveedor.precio_desde.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <ChevronRight size={16} className="text-festiva-midnight-blue/30 shrink-0" />
        </div>
      </Card>
    </div>
  );
}