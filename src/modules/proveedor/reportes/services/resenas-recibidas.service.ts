/**
 * Corre en el SERVIDOR.
 * Obtiene todas las reseñas que los clientes han dejado al proveedor autenticado,
 * junto con el nombre del cliente y el título del evento.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ResenaRecibida {
  id_calificacion: string;
  puntuacion: number;
  comentario: string | null;
  creada_en: string;
  nombre_cliente: string;
  foto_cliente_url: string | null;
  titulo_evento: string;
  id_evento: string;
  calificacion_promedio: number;
  total_resenas: number;
}

interface CalificacionRow {
  id_calificacion: string;
  id_contratacion: string;
  puntuacion: number;
  comentario: string | null;
  creada_en: string | null;
}

interface UsuarioRow {
  id_usuario: string;
  nombre_completo: string;
  foto_perfil_url: string | null;
}

export interface ResenasProveedorResult {
  resenas: ResenaRecibida[];
  calificacion_promedio: number;
  total_resenas: number;
}

export async function getResenasRecibidas(): Promise<ResenasProveedorResult> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { resenas: [], calificacion_promedio: 0, total_resenas: 0 };

  // 1. Obtener contrataciones del proveedor
  const { data: contrataciones } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_evento")
    .eq("id_proveedor", user.id);

  if (!contrataciones || contrataciones.length === 0) {
    return { resenas: [], calificacion_promedio: 0, total_resenas: 0 };
  }

  const idsContrataciones = contrataciones.map((c) => c.id_contratacion);
  const eventoPorContratacion = new Map(
    contrataciones.map((c) => [c.id_contratacion, c.id_evento])
  );

  // 2. Obtener calificaciones de esas contrataciones
  const { data: calificacionesRaw } = await supabase
    .from("tbl_calificaciones")
    .select("id_calificacion, id_contratacion, puntuacion, comentario, creada_en")
    .in("id_contratacion", idsContrataciones)
    .order("creada_en", { ascending: false });

  const calificaciones = (calificacionesRaw ?? []) as unknown as CalificacionRow[];

  if (calificaciones.length === 0) {
    return { resenas: [], calificacion_promedio: 0, total_resenas: 0 };
  }

  // 3. Calcular promedio
  const total_resenas = calificaciones.length;
  const calificacion_promedio =
    Math.round(
      (calificaciones.reduce((acc, c) => acc + c.puntuacion, 0) / total_resenas) * 10
    ) / 10;

  // 4. Obtener los eventos involucrados
  const idsEventos = Array.from(
    new Set(
      calificaciones
        .map((c) => eventoPorContratacion.get(c.id_contratacion))
        .filter((id): id is string => !!id)
    )
  );

  const { data: eventos } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo, id_cliente")
    .in("id_evento", idsEventos);

  const eventoPorId = new Map(
    (eventos ?? []).map((e) => [e.id_evento, e])
  );

  // 5. Obtener datos de los clientes
  const idsClientes = Array.from(
    new Set(
      (eventos ?? []).map((e) => e.id_cliente).filter((id): id is string => !!id)
    )
  );

  const { data: usuariosRaw } = await supabase
    .from("tbl_usuarios")
    .select("id_usuario, nombre_completo, foto_perfil_url")
    .in("id_usuario", idsClientes);

  const usuarios = (usuariosRaw ?? []) as unknown as UsuarioRow[];
  const usuarioPorId = new Map(usuarios.map((u) => [u.id_usuario, u]));

  // 6. Componer resultado
  const resenas: ResenaRecibida[] = calificaciones.map((cal) => {
    const idEvento = eventoPorContratacion.get(cal.id_contratacion) ?? "";
    const evento = eventoPorId.get(idEvento);
    const cliente = evento ? usuarioPorId.get(evento.id_cliente) : undefined;

    return {
      id_calificacion: cal.id_calificacion,
      puntuacion: cal.puntuacion,
      comentario: cal.comentario,
      creada_en: cal.creada_en ?? new Date().toISOString(),
      nombre_cliente: cliente?.nombre_completo ?? "Cliente",
      foto_cliente_url: cliente?.foto_perfil_url ?? null,
      titulo_evento: evento?.titulo ?? "Evento",
      id_evento: idEvento,
      calificacion_promedio,
      total_resenas,
    };
  });

  return { resenas, calificacion_promedio, total_resenas };
}
