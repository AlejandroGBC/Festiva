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