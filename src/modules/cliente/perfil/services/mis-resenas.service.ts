/**
 * Corre en el SERVIDOR.
 * Obtiene todas las reseñas (calificaciones) que el cliente autenticado
 * ha escrito, junto con el nombre del proveedor calificado y el título
 * del evento al que pertenece cada contratación.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ResenaEscrita {
  id_calificacion: string;
  puntuacion: number;
  comentario: string | null;
  creada_en: string;
  nombre_comercial: string;
  foto_proveedor_url: string | null;
  titulo_evento: string;
  id_evento: string;
}

interface CalificacionRow {
  id_calificacion: string;
  id_contratacion: string;
  puntuacion: number;
  comentario: string | null;
  creada_en: string | null;
}

interface PerfilProveedorRow {
  id_proveedor: string;
  nombre_comercial: string;
  foto_perfil_url: string | null;
}

export async function getMisResenas(): Promise<ResenaEscrita[]> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // 1. Obtener todos los eventos del cliente
  const { data: eventos } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo")
    .eq("id_cliente", user.id);

  if (!eventos || eventos.length === 0) return [];

  const idsEventos = eventos.map((e) => e.id_evento);
  const tituloPorEvento = new Map(eventos.map((e) => [e.id_evento, e.titulo]));

  // 2. Obtener las contrataciones de esos eventos
  const { data: contrataciones } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_proveedor, id_evento")
    .in("id_evento", idsEventos);

  if (!contrataciones || contrataciones.length === 0) return [];

  const idsContrataciones = contrataciones.map((c) => c.id_contratacion);
  const contratacionMap = new Map(
    contrataciones.map((c) => [
      c.id_contratacion,
      { id_proveedor: c.id_proveedor, id_evento: c.id_evento },
    ])
  );

  // 3. Obtener las calificaciones de esas contrataciones
  const { data: calificacionesRaw } = await supabase
    .from("tbl_calificaciones")
    .select("id_calificacion, id_contratacion, puntuacion, comentario, creada_en")
    .in("id_contratacion", idsContrataciones)
    .order("creada_en", { ascending: false });

  const calificaciones = (calificacionesRaw ?? []) as unknown as CalificacionRow[];

  if (calificaciones.length === 0) return [];

  // 4. Obtener perfiles de los proveedores involucrados
  const idsProveedores = Array.from(
    new Set(
      calificaciones
        .map((c) => contratacionMap.get(c.id_contratacion)?.id_proveedor)
        .filter((id): id is string => !!id)
    )
  );

  const { data: perfilesRaw } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor, nombre_comercial, foto_perfil_url")
    .in("id_proveedor", idsProveedores);

  const perfiles = (perfilesRaw ?? []) as unknown as PerfilProveedorRow[];

  const perfilPorProveedor = new Map(
    perfiles.map((p) => [p.id_proveedor, p])
  );

  // 5. Componer el resultado
  return calificaciones.map((cal) => {
    const ct = contratacionMap.get(cal.id_contratacion);
    const perfil = ct ? perfilPorProveedor.get(ct.id_proveedor) : undefined;
    const tituloEvento = ct
      ? (tituloPorEvento.get(ct.id_evento) ?? "Evento")
      : "Evento";

    return {
      id_calificacion: cal.id_calificacion,
      puntuacion: cal.puntuacion,
      comentario: cal.comentario,
      creada_en: cal.creada_en ?? new Date().toISOString(),
      nombre_comercial: perfil?.nombre_comercial ?? "Proveedor",
      foto_proveedor_url: perfil?.foto_perfil_url ?? null,
      titulo_evento: tituloEvento,
      id_evento: ct?.id_evento ?? "",
    };
  });
}
