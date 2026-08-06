/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/services/proveedores-destacados.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { enriquecerProveedores } from "@/modules/cliente/proveedores/services/proveedores-shared";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

export async function getProveedoresDestacados(limite = 2): Promise<ProveedorTarjeta[]> {
  const supabase = await createServerSupabaseClient();

  // Traemos un pool razonable y ordenamos por calificación después de
  // enriquecer (no se puede ordenar por rating antes, porque el rating
  // se calcula agregando otra tabla, no es una columna de esta).
  const { data: base, error } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor, nombre_comercial, ubicacion_base")
    .limit(30);

  if (error || !base || base.length === 0) return [];

  const proveedores = await enriquecerProveedores(supabase, base);

  return proveedores
    .sort((a, b) => (b.calificacion ?? 0) - (a.calificacion ?? 0))
    .slice(0, limite);
}