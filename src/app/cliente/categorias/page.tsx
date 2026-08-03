<<<<<<< HEAD
/**
 * Ubicación:
 *   src/app/cliente/categorias/page.tsx
 */

import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import CategoriasView from "@/modules/cliente/inicio/components/CategoriasView";

export default async function CategoriasPage() {
  const categorias = await getCategoriasInicio(50); // todas, no solo 5
  return <CategoriasView categorias={categorias} />;
=======
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/shared/components/TopNavbar";
import SearchBar from "@/shared/components/SearchBar";
import { CategoriaCard } from "@/modules/cliente/categorias/components/CategoriaCard";
import { servicios } from "@/shared/mocks/servicios";

export default function CategoriasPage() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const categoriasFiltradas = servicios.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
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
          {categoriasFiltradas.length} categorias disponibles
        </p>

        <div className="grid grid-cols-2 gap-4">
          {categoriasFiltradas.map((categoria) => (
            <CategoriaCard
              key={categoria.id}
              nombre={categoria.nombre}
              proveedores={categoria.proveedores}
              Icon={categoria.icon}
              iconColor={categoria.color.text}
              bgColor={categoria.color.bg}
              onClick={() => router.push(`/cliente/categorias/${categoria.id}`)}
            />
          ))}
        </div>
      </div>

    </>
  );
>>>>>>> 80bf887c1fadd25e6a0ef4883aadd2943899942d
}