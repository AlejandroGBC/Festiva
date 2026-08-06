"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/inicio/components/CategoriasView.tsx
 */

import { useRouter } from "next/navigation";
import TopNavbar from "@/shared/components/TopNavbar";
import { obtenerIconoServicio } from "@/shared/lib/servicio-icono";
import type { CategoriaInicio } from "@/modules/cliente/inicio/types/inicio.types";
import { useState } from "react";
import { CategoriaCard } from "../../categorias/components/CategoriaCard";
import { SearchBar } from "@/shared/components/SearchBar";

export default function CategoriasView({ categorias }: { categorias: CategoriaInicio[] }) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const categoriasFiltradas = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="shrink-0 bg-white">
        <TopNavbar title="Categorías" />
        <div className="px-4 pb-4">
          <SearchBar
            placeholder="Buscar una categoria"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar w-full px-4 pt-4 pb-36">
        <p className="text-sm text-gray-400 mb-4">
          {categorias.length} categorias disponibles
        </p>

        <div className="grid grid-cols-2 gap-4">
          {categoriasFiltradas.map((categoria) => {
            const { Icon, color } = obtenerIconoServicio(categoria.nombre);
            return (
              <CategoriaCard
              key={categoria.id}
              nombre={categoria.nombre}
              Icon={Icon}
              iconColor={color.text}
              bgColor={color.bg}
              onClick={() => router.push(`/cliente/buscar?categoria=${encodeURIComponent(categoria.nombre)}`)}
            />
            )
        })}
        </div>
      </div>
    </>
  );
}