/**
 * Ubicación:
 *   src/app/cliente/categorias/page.tsx
 */

import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import CategoriasView from "@/modules/cliente/inicio/components/CategoriasView";

export default async function CategoriasPage() {
  const categorias = await getCategoriasInicio(50); // todas, no solo 5
  return <CategoriasView categorias={categorias} />;
} 

/*
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/shared/components/TopNavbar";
import SearchBar from "@/shared/components/SearchBar";
import { CategoriaCard } from "@/modules/cliente/categorias/components/CategoriaCard";
import { servicios } from "@/shared/mocks/servicios";
import { getCategoriasInicio } from "@/modules/cliente/inicio/services/inicio.service";
import CategoriasView from "@/modules/cliente/inicio/components/CategoriasView";

export default async function CategoriasPage() {
  const categorias = await getCategoriasInicio(50);

  return (
    <CategoriasView categorias={categorias}/>
  );
}

*/