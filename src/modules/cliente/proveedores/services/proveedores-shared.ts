/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/services/proveedores-shared.ts
 *
 * Función isomórfica: recibe el cliente Supabase ya creado (server o
 * browser, da igual, misma API) y hace el trabajo pesado de armar la
 * tarjeta completa de cada proveedor. La reutilizan:
 *   - proveedores-destacados.service.ts (servidor, para Inicio)
 *   - proveedores-busqueda.service.ts (cliente, para Buscar)
 * así la lógica de "cómo se calcula una tarjeta de proveedor" vive en
 * un solo lugar.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProveedorTarjeta } from "@/modules/cliente/proveedores/types/proveedor.types";

interface ProveedorBase {
  id_proveedor: string;
  nombre_comercial: string;
  ubicacion_base: string;
}

interface UsuarioFotoRow {
  id_usuario: string;
  foto_perfil_url: string | null;
}

interface ServicioProveedorRow {
  id_proveedor: string;
  tbl_servicios: { nombre: string }[] | null;
}

interface OfertaPrecioRow {
  id_proveedor: string;
  precio_total: number;
}

interface ContratacionRow {
  id_contratacion: string;
  id_proveedor: string;
}

interface CalificacionRow {
  id_contratacion: string;
  puntuacion: number;
}

export async function enriquecerProveedores(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  base: ProveedorBase[]
): Promise<ProveedorTarjeta[]> {
  if (base.length === 0) return [];

  const ids = base.map((p) => p.id_proveedor);

  const [{ data: usuariosDb }, { data: serviciosDb }, { data: ofertasDb }, { data: contratacionesDb }] =
    await Promise.all([
      supabase.from("tbl_usuarios").select("id_usuario, foto_perfil_url").in("id_usuario", ids),
      supabase
        .from("tbl_proveedor_servicios")
        .select("id_proveedor, tbl_servicios ( nombre )")
        .in("id_proveedor", ids),
      supabase.from("tbl_ofertas").select("id_proveedor, precio_total").in("id_proveedor", ids),
      supabase.from("tbl_contrataciones").select("id_contratacion, id_proveedor").in("id_proveedor", ids),
    ]);

  const fotoPorId = new Map(
    ((usuariosDb ?? []) as UsuarioFotoRow[]).map((u) => [u.id_usuario, u.foto_perfil_url])
  );

  const categoriaPorId = new Map<string, string>();
  for (const s of (serviciosDb ?? []) as ServicioProveedorRow[]) {
    const nombreServicio = s.tbl_servicios?.[0]?.nombre;
    if (!categoriaPorId.has(s.id_proveedor) && nombreServicio) {
      categoriaPorId.set(s.id_proveedor, nombreServicio);
    }
  }

  const precioMinPorId = new Map<string, number>();
  for (const o of (ofertasDb ?? []) as OfertaPrecioRow[]) {
    const actual = precioMinPorId.get(o.id_proveedor);
    if (actual === undefined || o.precio_total < actual) {
      precioMinPorId.set(o.id_proveedor, o.precio_total);
    }
  }

  const contratacionesTipadas = (contratacionesDb ?? []) as ContratacionRow[];
  const idsContrataciones = contratacionesTipadas.map((c) => c.id_contratacion);
  const contratacionAProveedor = new Map(
    contratacionesTipadas.map((c) => [c.id_contratacion, c.id_proveedor])
  );

  const calificacionPorId = new Map<string, { suma: number; cantidad: number }>();
  if (idsContrataciones.length > 0) {
    const { data: calificacionesDb } = await supabase
      .from("tbl_calificaciones")
      .select("id_contratacion, puntuacion")
      .in("id_contratacion", idsContrataciones);

    for (const cal of (calificacionesDb ?? []) as CalificacionRow[]) {
      const idProveedor = contratacionAProveedor.get(cal.id_contratacion);
      if (!idProveedor) continue;
      const actual = calificacionPorId.get(idProveedor) ?? { suma: 0, cantidad: 0 };
      actual.suma += cal.puntuacion;
      actual.cantidad += 1;
      calificacionPorId.set(idProveedor, actual);
    }
  }

  return base.map((p) => {
    const cal = calificacionPorId.get(p.id_proveedor);
    const calificacion = cal ? Math.round((cal.suma / cal.cantidad) * 10) / 10 : null;
    return {
      id_proveedor: p.id_proveedor,
      nombre_comercial: p.nombre_comercial,
      categoria: categoriaPorId.get(p.id_proveedor) ?? "Proveedor",
      ciudad: p.ubicacion_base,
      foto_url: fotoPorId.get(p.id_proveedor) ?? null,
      calificacion,
      cantidad_calificaciones: cal?.cantidad ?? 0,
      precio_desde: precioMinPorId.get(p.id_proveedor) ?? null,
      // Heurística: "destacado" = buen rating con reseñas suficientes.
      // No hay columna real para esto en el schema.
      destacado: (calificacion ?? 0) >= 4.8 && (cal?.cantidad ?? 0) >= 3,
    };
  });
}