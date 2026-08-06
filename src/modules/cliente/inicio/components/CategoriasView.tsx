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

/**
 * <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Categorías" />

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        <p className="text-[13px] text-festiva-midnight-blue/50 mt-4 mb-4">
          Elegí una categoría para ver los proveedores disponibles
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categorias.map((cat) => {
            const { Icon, color } = obtenerIconoServicio(cat.nombre);
            return (
              <div
                key={cat.id}
                onClick={() => router.push(`/cliente/buscar?categoria=${encodeURIComponent(cat.nombre)}`)}
                className="cursor-pointer"
              >
                <Card className="flex flex-col items-center justify-center text-center gap-2.5 !py-6 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.bg}`}>
                    <Icon size={22} className={color.text} />
                  </div>
                  <span className="text-sm font-semibold text-festiva-midnight-blue">{cat.nombre}</span>
                </Card>
              </div>
            );
          })}
        </div>
      </main>

    </div>
 */