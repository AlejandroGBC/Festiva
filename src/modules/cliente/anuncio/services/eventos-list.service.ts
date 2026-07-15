/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/services/eventos-list.service.ts
 *
 * Este archivo corre en el SERVIDOR. Se llama directo desde el
 * page.tsx de "Mis Eventos" (Server Component), sin pasar por un hook,
 * según la regla: "El fetch lo hacen los Server Components directamente
 * desde el service."
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface EventoListado {
  id_evento: string;
  titulo: string;
  descripcion: string | null;
  fecha_evento: string | null;
  ubicacion: string | null;
  cantidad_invitados: number | null;
  presupuesto_min: number | null;
  presupuesto_max: number | null;
  estado: string;
  creado_en: string;
  tipo_evento: string | null;
}

export async function getEventosCliente(): Promise<EventoListado[]> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();

  if (!perfilCliente) return [];

  const { data, error } = await supabase
    .from("tbl_eventos")
    .select(
      `
      id_evento,
      titulo,
      descripcion,
      fecha_evento,
      ubicacion,
      cantidad_invitados,
      presupuesto_min,
      presupuesto_max,
      estado,
      creado_en,
      tbl_tipo_evento ( nombre )
    `
    )
    .eq("id_cliente", perfilCliente.id_cliente)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error al obtener eventos del cliente:", error);
    return [];
  }

  return (data ?? []).map((ev: any) => ({
    id_evento: ev.id_evento,
    titulo: ev.titulo,
    descripcion: ev.descripcion,
    fecha_evento: ev.fecha_evento,
    ubicacion: ev.ubicacion,
    cantidad_invitados: ev.cantidad_invitados,
    presupuesto_min: ev.presupuesto_min,
    presupuesto_max: ev.presupuesto_max,
    estado: ev.estado,
    creado_en: ev.creado_en,
    tipo_evento: ev.tbl_tipo_evento?.nombre ?? null,
  }));
}