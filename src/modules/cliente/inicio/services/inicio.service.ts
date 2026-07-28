/**
 * Ubicación sugerida:
 *   src/modules/cliente/inicio/services/inicio.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 *
 * NOTA: no resolvemos el ícono acá — un componente de ícono (función
 * React) no se puede pasar de un Server Component a un Client
 * Component. Solo mandamos datos puros (id, nombre); el ícono se
 * resuelve en el cliente con obtenerIconoServicio(nombre).
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CategoriaInicio } from "@/modules/cliente/inicio/types/inicio.types";

export async function getCategoriasInicio(limite = 5): Promise<CategoriaInicio[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tbl_servicios")
    .select("id_servicio, nombre")
    .order("id_servicio", { ascending: true })
    .limit(limite);

  if (error || !data) return [];

  return data.map((s) => ({
    id: String(s.id_servicio),
    nombre: s.nombre,
  }));
}