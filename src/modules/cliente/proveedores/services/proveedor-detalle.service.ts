/**
 * Ubicación sugerida:
 *   src/modules/cliente/proveedores/services/proveedor-detalle.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 * A diferencia de evento-detalle.service.ts, esta consulta NO exige que
 * el usuario logueado sea dueño de nada — es un perfil público, cualquier
 * cliente autenticado puede verlo.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  ProveedorDetalle,
  TrabajoPortafolio,
  ResenaProveedor,
} from "@/modules/cliente/proveedores/types/proveedor-detalle.types";

export async function getProveedorDetalle(idProveedor: string): Promise<ProveedorDetalle | null> {
  const supabase = await createServerSupabaseClient();

  const { data: perfil, error } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor, nombre_comercial, descripcion, ubicacion_base, creado_en")
    .eq("id_proveedor", idProveedor)
    .maybeSingle();

  if (error || !perfil) return null;

  // ── Especialidades ──
  const { data: serviciosDb } = await supabase
    .from("tbl_proveedor_servicios")
    .select("tbl_servicios ( nombre )")
    .eq("id_proveedor", idProveedor);

  interface ServicioRow {
    tbl_servicios: { nombre: string } | null;
  }
  const especialidades = ((serviciosDb ?? []) as ServicioRow[])
    .map((s) => s.tbl_servicios?.nombre)
    .filter((n): n is string => Boolean(n));

  // ── Contrataciones (para "eventos realizados" y para llegar a las reseñas) ──
  const { data: contratacionesDb } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, estado_servicio")
    .eq("id_proveedor", idProveedor);

  interface ContratacionRow {
    id_contratacion: string;
    estado_servicio: string | null;
  }
  const contrataciones = (contratacionesDb ?? []) as ContratacionRow[];
  const cantidadEventosRealizados = contrataciones.filter(
    (c) => c.estado_servicio === "finalizado"
  ).length;

  // ── Reseñas — tbl_calificaciones no tiene id_proveedor directo, se
  //    llega a través de las contrataciones de este proveedor. ──
  let resenas: ResenaProveedor[] = [];
  let calificacionPromedio: number | null = null;

  if (contrataciones.length > 0) {
    const idsContrataciones = contrataciones.map((c) => c.id_contratacion);

    const { data: calificacionesDb } = await supabase
      .from("tbl_calificaciones")
      .select("id_calificacion, puntuacion, comentario, creada_en")
      .in("id_contratacion", idsContrataciones)
      .order("creada_en", { ascending: false });

    interface CalificacionRow {
      id_calificacion: string;
      puntuacion: number;
      comentario: string | null;
      creada_en: string | null;
    }
    const filas = (calificacionesDb ?? []) as CalificacionRow[];

    resenas = filas.map((c) => ({
      id_calificacion: c.id_calificacion,
      puntuacion: c.puntuacion,
      comentario: c.comentario,
      creada_en: c.creada_en ?? new Date().toISOString(),
    }));

    if (filas.length > 0) {
      const suma = filas.reduce((acc, c) => acc + c.puntuacion, 0);
      calificacionPromedio = Math.round((suma / filas.length) * 10) / 10;
    }
  }

  // ── Portafolio ──
  const { data: portafolioDb } = await supabase
    .from("tbl_trabajos_portafolio")
    .select("id_portafolio, titulo")
    .eq("id_proveedor", idProveedor)
    .order("creado_en", { ascending: false });

  interface TrabajoRow {
    id_portafolio: string;
    titulo: string;
  }
  const trabajos = (portafolioDb ?? []) as TrabajoRow[];

  let portafolio: TrabajoPortafolio[] = trabajos.map((t) => ({
    id_portafolio: t.id_portafolio,
    titulo: t.titulo,
    imagen_portada: null,
  }));

  if (trabajos.length > 0) {
    const idsPortafolio = trabajos.map((t) => t.id_portafolio);

    const { data: imagenesDb } = await supabase
      .from("tbl_portafolio_imagenes")
      .select("id_portafolio, imagen_url")
      .in("id_portafolio", idsPortafolio)
      .order("subido_en", { ascending: true });

    interface ImagenRow {
      id_portafolio: string;
      imagen_url: string;
    }
    const portadaPorTrabajo = new Map<string, string>();
    for (const img of (imagenesDb ?? []) as ImagenRow[]) {
      // Solo nos quedamos con la primera imagen de cada trabajo (portada)
      if (!portadaPorTrabajo.has(img.id_portafolio)) {
        portadaPorTrabajo.set(img.id_portafolio, img.imagen_url);
      }
    }

    portafolio = portafolio.map((t) => ({
      ...t,
      imagen_portada: portadaPorTrabajo.get(t.id_portafolio) ?? null,
    }));
  }

  return {
    id_proveedor: perfil.id_proveedor,
    nombre_comercial: perfil.nombre_comercial,
    descripcion: perfil.descripcion,
    ubicacion_base: perfil.ubicacion_base,
    especialidades,
    calificacion_promedio: calificacionPromedio,
    cantidad_calificaciones: resenas.length,
    cantidad_eventos_realizados: cantidadEventosRealizados,
    miembro_desde: perfil.creado_en ? new Date(perfil.creado_en).getFullYear() : new Date().getFullYear(),
    portafolio,
    resenas,
  };
}