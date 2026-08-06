/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/services/eventos.service.ts
 *
 * Este archivo corre en el CLIENTE (lo llama use-crear-evento.ts, que es
 * un hook de un Client Component). Para lecturas iniciales de página,
 * ver eventos-list.service.ts, que usa el cliente Supabase de servidor.
 *
 * El cliente de browser real vive en src/lib/supabase/client.ts y
 * exporta `createClient()` (tipado con tu Database generado). Lo
 * renombramos acá como createBrowserSupabaseClient solo para que el
 * código de este archivo sea inequívoco sobre qué cliente está usando.
 */

import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { PropuestaIA } from "@/modules/cliente/anuncio/types/anuncios.types";

export async function generarPropuestaIA(descripcion: string): Promise<PropuestaIA> {
  async function llamarIA(): Promise<PropuestaIA> {
    const res = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion }),
    });

    if (!res.ok) {
      const texto = await res.text();
      throw new Error(`Error ${res.status}: ${texto.slice(0, 100)}`);
    }

    const data = await res.json();
    if (!data?.datos) {
      throw new Error(data?.error ?? "La IA no devolvió datos válidos");
    }

    return data.datos as PropuestaIA;
  }

  try {
    return await llamarIA();
  } catch (e) {
    // Reintento único: la primera llamada tras un cold-start del server
    // a veces falla por timeout de conexión; la segunda casi siempre
    // funciona porque la conexión ya quedó "caliente".
    console.warn("Primer intento de IA falló, reintentando una vez:", e);
    return await llamarIA();
  }
}

export interface PublicarEventoDTO {
  nombre: string;
  tipoEvento: string; // nombre visible, ej. "Boda" — se resuelve a id_tipo_evento acá adentro
  fecha: string;
  invitados: string;
  ciudad: string;
  lugar: string;
  presupuestoMin: string;
  presupuestoMax: string;
  servicios: string[]; // nombres visibles, ej. ["Decoración", "Catering"]
  descripcion: string;
  descripcionIA?: string; // prompt original, se guarda en prompt_origen_ia si existe
}

// Valores reales de estado_evento_enum: recibiendo_ofertas | en_proceso | finalizado | cancelado
const ESTADO_PUBLICADO = "recibiendo_ofertas" as const;

export async function publicarEvento(payload: PublicarEventoDTO): Promise<string> {
  const supabase = createBrowserSupabaseClient();

  // 1. Usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("Debes iniciar sesión para publicar un evento");
  }

  // 2. Resolver id_cliente a partir de tbl_perfiles_cliente
  //    (no asumimos que id_cliente === auth user id; lo buscamos)
  const { data: perfilCliente, error: perfilError } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();

  if (perfilError) throw perfilError;
  if (!perfilCliente) {
    throw new Error(
      "No se encontró un perfil de cliente para este usuario. Verifica que tbl_perfiles_cliente esté vinculado correctamente."
    );
  }

  // 3. Resolver id_tipo_evento por nombre
  const { data: tipo, error: tipoError } = await supabase
    .from("tbl_tipo_evento")
    .select("id_tipo_evento")
    .eq("nombre", payload.tipoEvento)
    .maybeSingle();

  if (tipoError) throw tipoError;
  if (!tipo) {
    throw new Error(`Tipo de evento "${payload.tipoEvento}" no existe en tbl_tipo_evento`);
  }

  // 4. Validar campos obligatorios (NOT NULL en el schema real de tbl_eventos:
  //    descripcion, fecha_evento, ubicacion, cantidad_invitados)
  if (!payload.fecha) {
    throw new Error("Falta la fecha del evento (paso 2)");
  }
  if (!payload.invitados || Number(payload.invitados) <= 0) {
    throw new Error("Falta el número de invitados (paso 2)");
  }
  if (!payload.ciudad && !payload.lugar) {
    throw new Error("Falta la ciudad o el lugar del evento (paso 2)");
  }
  if (!payload.descripcion.trim()) {
    throw new Error("Falta la descripción del evento (paso 3)");
  }

  // 5. Insertar el evento
  const eventoInsert = {
    id_cliente: perfilCliente.id_cliente,
    id_tipo_evento: tipo.id_tipo_evento,
    titulo: payload.nombre || payload.tipoEvento,
    descripcion: payload.descripcion.trim(),
    fecha_evento: payload.fecha,
    ubicacion: [payload.lugar, payload.ciudad].filter(Boolean).join(", "),
    cantidad_invitados: Number(payload.invitados),
    presupuesto_min: payload.presupuestoMin ? Number(payload.presupuestoMin) : undefined,
    presupuesto_max: payload.presupuestoMax ? Number(payload.presupuestoMax) : undefined,
    estado: ESTADO_PUBLICADO,
    prompt_origen_ia: payload.descripcionIA || undefined,
  };

  const { data: evento, error: eventoError } = await supabase
    .from("tbl_eventos")
    .insert(eventoInsert)
    .select("id_evento")
    .single();

  if (eventoError || !evento) {
    throw eventoError ?? new Error("No se pudo crear el evento");
  }

  // 6. Resolver servicios seleccionados a id_servicio e insertar la relación
  if (payload.servicios.length > 0) {
    const { data: serviciosDb, error: serviciosError } = await supabase
      .from("tbl_servicios")
      .select("id_servicio, nombre")
      .in("nombre", payload.servicios);

    if (serviciosError) throw serviciosError;

    const filas = (serviciosDb ?? []).map((s) => ({
      id_evento: evento.id_evento,
      id_servicio: s.id_servicio,
    }));

    if (filas.length > 0) {
      const { error: relError } = await supabase.from("tbl_evento_servicios").insert(filas);
      if (relError) throw relError;
    }
  }

  return evento.id_evento as string;
}