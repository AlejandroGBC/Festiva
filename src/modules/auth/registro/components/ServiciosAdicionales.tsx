"use client";

import { Sparkles } from "lucide-react";
import Button from "@/shared/components/Button";
import ServicioChipButton from "./ServicioChipButton";
import { useServicios } from "@/shared/hooks/useServicios";

interface ServiciosAdicionalesProps {
  seleccionados: number[];
  onToggle: (id: number) => void;
}

export default function ServiciosAdicionales({ seleccionados, onToggle }: ServiciosAdicionalesProps) {
  const { servicios, isLoading, isLoadingMore, error, hayMasPaginas, cargarMas } = useServicios();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-festiva-midnight-blue">
        Servicios ofrecidos
      </label>

      {isLoading && <p className="text-sm text-slate-400">Cargando servicios...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {servicios.map((servicio) => (
              <ServicioChipButton
                key={servicio.id_servicio}
                label={servicio.nombre}
                icon={Sparkles}
                selected={seleccionados.includes(servicio.id_servicio)}
                onToggle={() => onToggle(servicio.id_servicio)}
              />
            ))}
          </div>

          {hayMasPaginas && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cargarMas}
              disabled={isLoadingMore}
              className="self-center mt-1"
            >
              {isLoadingMore ? "Cargando..." : "Ver más servicios"}
            </Button>
          )}
        </>
      )}
    </div>
  );
}