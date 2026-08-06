"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/services/proveedores-busqueda.service.ts
 *
 * Corre en el CLIENTE a propósito: la búsqueda es interactiva (el
 * usuario tipea y espera resultados rápido), así que consulta Supabase
 * directo desde el navegador en vez de ir y volver al servidor en cada
 * letra. El componente que lo usa debe hacer debounce antes de llamar
 * a esta función (no acá adentro), para no disparar una query por cada
 * tecla.
 */

import { createClient } from "@/lib/supabase/client";
import { enriquecerProveedores } from "@/modules/cliente/proveedores/services/proveedores-shared";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

export async function buscarProveedores(
  query: string,
  idCategoria: number | null
): Promise<ProveedorTarjeta[]> {
  const supabase = createClient();

  let idsPorCategoria: string[] | null = null;
  if (idCategoria !== null) {
    const { data } = await supabase
      .from("tbl_proveedor_servicios")
      .select("id_proveedor")
      .eq("id_servicio", idCategoria);
    idsPorCategoria = (data ?? []).map((d) => d.id_proveedor);
    if (idsPorCategoria.length === 0) return [];
  }

  let consulta = supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor, nombre_comercial, ubicacion_base");

  const texto = query.trim();
  if (texto) {
    consulta = consulta.or(
      `nombre_comercial.ilike.%${texto}%,descripcion.ilike.%${texto}%,ubicacion_base.ilike.%${texto}%`
    );
  }

  if (idsPorCategoria) {
    consulta = consulta.in("id_proveedor", idsPorCategoria);
  }

  const { data: base, error } = await consulta.limit(30);
  if (error || !base) return [];

  return enriquecerProveedores(supabase, base);
}