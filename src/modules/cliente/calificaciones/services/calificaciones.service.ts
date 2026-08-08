//Corre en el CLIENTE. Gestiona la lectura y envío de calificaciones.


"use client";

import { createClient } from "@/lib/supabase/client";
import type { ContratacionParaCalificar } from "@/shared/types/calificaciones-cliente.types";

/** Obtiene las contrataciones de un evento que aún NO tienen calificación. */
export async function getContratacionesSinCalificar(
  idEvento: string
): Promise<ContratacionParaCalificar[]> {
  const supabase = createClient();

  // 1. Buscar todas las contrataciones del evento
  const { data: contrataciones, error: errContrataciones } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_proveedor")
    .eq("id_evento", idEvento);

  if (errContrataciones || !contrataciones || contrataciones.length === 0) return [];

  const idsContrataciones = contrataciones.map((c) => c.id_contratacion);

  // 2. Buscar cuáles de esas ya tienen calificación
  const { data: calificaciones } = await supabase
    .from("tbl_calificaciones")
    .select("id_contratacion")
    .in("id_contratacion", idsContrataciones);

  const idsYaCalificados = new Set(
    (calificaciones ?? []).map((c) => c.id_contratacion)
  );

  // 3. Filtrar solo las sin calificar
  const sinCalificar = contrataciones.filter(
    (c) => !idsYaCalificados.has(c.id_contratacion)
  );

  if (sinCalificar.length === 0) return [];

  const idsProveedores = sinCalificar.map((c) => c.id_proveedor);

  // 4. Obtener nombre comercial de cada proveedor y sus servicios para este evento
  const [perfilesRes, serviciosRes] = await Promise.all([
    supabase
      .from("tbl_perfiles_proveedor")
      .select("id_proveedor, nombre_comercial")
      .in("id_proveedor", idsProveedores),

    supabase
      .from("tbl_oferta_servicios")
      .select("id_proveedor, tbl_servicios ( nombre )")
      .eq("id_evento", idEvento)
      .in("id_proveedor", idsProveedores),
  ]);

  const nombrePorProveedor = new Map<string, string>(
    (perfilesRes.data ?? []).map((p) => [p.id_proveedor, p.nombre_comercial])
  );

  interface CoberturaRow {
    id_proveedor: string;
    tbl_servicios: { nombre: string } | null;
  }
  const serviciosPorProveedor = new Map<string, string[]>();
  for (const row of (serviciosRes.data ?? []) as CoberturaRow[]) {
    const nombre = row.tbl_servicios?.nombre;
    if (!nombre) continue;
    const lista = serviciosPorProveedor.get(row.id_proveedor) ?? [];
    lista.push(nombre);
    serviciosPorProveedor.set(row.id_proveedor, lista);
  }

  return sinCalificar.map((c) => {
    const nombreComercial =
      nombrePorProveedor.get(c.id_proveedor) ?? "Proveedor";
    const iniciales = nombreComercial
      .split(" ")
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("");

    return {
      id_contratacion: c.id_contratacion,
      id_proveedor: c.id_proveedor,
      nombre_comercial: nombreComercial,
      iniciales,
      servicios: serviciosPorProveedor.get(c.id_proveedor) ?? [],
      titulo_evento: "", // se rellena en el server component con el título real
    };
  });
}

export interface EnviarCalificacionDTO {
  id_contratacion: string;
  puntuacion: number;
  comentario: string | null;
}

/** Inserta una calificación en tbl_calificaciones. */
export async function enviarCalificacion(dto: EnviarCalificacionDTO): Promise<void> {
  const supabase = createClient();

  if (dto.puntuacion < 1 || dto.puntuacion > 5) {
    throw new Error("La puntuación debe ser entre 1 y 5.");
  }

  const { error } = await supabase.from("tbl_calificaciones").insert({
    id_contratacion: dto.id_contratacion,
    puntuacion: dto.puntuacion,
    comentario: dto.comentario || null,
  });

  if (error) {
    if (error.code === "23505") {
      // Unique violation — ya existe calificación para esta contratación
      throw new Error("Ya enviaste una reseña para este proveedor.");
    }
    throw error;
  }
}
