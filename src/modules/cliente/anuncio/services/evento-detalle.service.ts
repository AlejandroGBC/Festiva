/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/services/evento-detalle.service.ts
 *
 * Corre en el SERVIDOR. Se llama directo desde page.tsx.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  EventoDetalle,
  ProveedorContratado,
  TimelineHito,
} from "@/modules/cliente/anuncio/types/evento-detalle.types";

// ── Helpers de formato de fecha (es-HN) ──

function formatFecha(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Intl.DateTimeFormat("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** "15 mayo, 2026" o, si hay rango real, "18-25 mayo, 2026" (mismo mes/año)
 *  o "28 mayo, 2026 - 2 junio, 2026" (meses distintos). */
function formatRangoFechas(fechasIso: string[]): string | null {
  if (fechasIso.length === 0) return null;
  const fechas = fechasIso.map((f) => new Date(f)).sort((a, b) => a.getTime() - b.getTime());
  const primera = fechas[0];
  const ultima = fechas[fechas.length - 1];

  if (primera.getTime() === ultima.getTime()) {
    return formatFecha(primera.toISOString());
  }

  const mismoMes =
    primera.getMonth() === ultima.getMonth() && primera.getFullYear() === ultima.getFullYear();

  if (mismoMes) {
    const mesAnio = new Intl.DateTimeFormat("es-HN", { month: "long", year: "numeric" }).format(ultima);
    return `${primera.getDate()}-${ultima.getDate()} ${mesAnio}`;
  }

  return `${formatFecha(primera.toISOString())} - ${formatFecha(ultima.toISOString())}`;
}

export async function getEventoDetalle(idEvento: string): Promise<EventoDetalle | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return null;

  const { data: evento, error } = await supabase
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
      id_tipo_evento,
      creado_en,
      tbl_tipo_evento ( nombre )
    `
    )
    .eq("id_evento", idEvento)
    // Seguridad: solo puede ver el detalle de SU PROPIO evento
    .eq("id_cliente", perfilCliente.id_cliente)
    .maybeSingle();

  if (error || !evento) return null;

  interface EventoRow {
    id_evento: string;
    titulo: string;
    descripcion: string;
    fecha_evento: string;
    ubicacion: string;
    cantidad_invitados: number;
    presupuesto_min: number | null;
    presupuesto_max: number | null;
    estado: EventoDetalle["estado"] | null;
    id_tipo_evento: number;
    creado_en: string | null;
    tbl_tipo_evento: { nombre: string } | null;
  }
  const ev = evento as unknown as EventoRow;

  // ── Servicios solicitados por el evento ──
  const { data: serviciosDb } = await supabase
    .from("tbl_evento_servicios")
    .select("tbl_servicios ( nombre )")
    .eq("id_evento", idEvento);

  interface ServicioRow {
    tbl_servicios: { nombre: string } | null;
  }
  const servicios = ((serviciosDb ?? []) as ServicioRow[])
    .map((s) => s.tbl_servicios?.nombre)
    .filter((n): n is string => Boolean(n));

  // ── Ofertas recibidas (cantidad + fechas para el timeline) ──
  const { data: ofertasDb, count: cantidadOfertas } = await supabase
    .from("tbl_ofertas")
    .select("creada_en", { count: "exact" })
    .eq("id_evento", idEvento);

  const fechasOfertas = (ofertasDb ?? [])
    .map((o) => o.creada_en)
    .filter((f): f is string => Boolean(f));

  // ── Contrataciones (proveedores seleccionados) ──
  const { data: contratacionesDb } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_proveedor, creado_en")
    .eq("id_evento", idEvento)
    .order("creado_en", { ascending: true });

  interface ContratacionRow {
    id_contratacion: string;
    id_proveedor: string;
    creado_en: string | null;
  }
  const contrataciones = (contratacionesDb ?? []) as ContratacionRow[];

  let proveedoresContratados: ProveedorContratado[] = [];

  if (contrataciones.length > 0) {
    const idsProveedores = contrataciones.map((c) => c.id_proveedor);
    const idsContrataciones = contrataciones.map((c) => c.id_contratacion);

    const [ofertasRes, proveedoresRes, serviciosProveedorRes, pagosRes] = await Promise.all([
      // Precio ofertado por cada uno de estos proveedores para este evento
      supabase
        .from("tbl_ofertas")
        .select("id_proveedor, precio_total")
        .eq("id_evento", idEvento)
        .in("id_proveedor", idsProveedores),

      // Nombre comercial
      supabase
        .from("tbl_perfiles_proveedor")
        .select("id_proveedor, nombre_comercial")
        .in("id_proveedor", idsProveedores),

      // Servicios que ofrece cada proveedor, para inferir la categoría a mostrar
      supabase
        .from("tbl_proveedor_servicios")
        .select("id_proveedor, tbl_servicios ( nombre )")
        .in("id_proveedor", idsProveedores),

      // Estado del pago de cada contratación
      supabase
        .from("tbl_pagos")
        .select("id_pago, estado_pago")
        .in("id_pago", idsContrataciones),
    ]);

    const precioPorProveedor = new Map<string, number>(
      (ofertasRes.data ?? []).map((o) => [o.id_proveedor as string, o.precio_total as number])
    );
    const nombrePorProveedor = new Map<string, string>(
      (proveedoresRes.data ?? []).map((p) => [p.id_proveedor as string, p.nombre_comercial as string])
    );

    interface ServicioProveedorRow {
      id_proveedor: string;
      tbl_servicios: { nombre: string } | null;
    }
    const serviciosPorProveedor = new Map<string, string[]>();
    for (const row of (serviciosProveedorRes.data ?? []) as ServicioProveedorRow[]) {
      const nombre = row.tbl_servicios?.nombre;
      if (!nombre) continue;
      const lista = serviciosPorProveedor.get(row.id_proveedor) ?? [];
      lista.push(nombre);
      serviciosPorProveedor.set(row.id_proveedor, lista);
    }

    // id_pago === id_contratacion (1:1), así que mapeamos directo
    const pagoPorContratacion = new Map<string, string>(
      (pagosRes.data ?? []).map((p) => [p.id_pago as string, p.estado_pago as string])
    );

    proveedoresContratados = contrataciones.map((c) => {
      const serviciosDelProveedor = serviciosPorProveedor.get(c.id_proveedor) ?? [];
      // Preferimos un servicio que coincida con lo que el evento pidió;
      // si no hay match, el primero del proveedor; si no tiene ninguno, genérico.
      const categoria =
        serviciosDelProveedor.find((s) => servicios.includes(s)) ??
        serviciosDelProveedor[0] ??
        "Servicio contratado";

      const estadoPago = pagoPorContratacion.get(c.id_contratacion);

      return {
        id_contratacion: c.id_contratacion,
        id_proveedor: c.id_proveedor,
        nombre_comercial: nombrePorProveedor.get(c.id_proveedor) ?? "Proveedor",
        categoria,
        precio_total: precioPorProveedor.get(c.id_proveedor) ?? 0,
        confirmado: estadoPago === "pagado",
      };
    });
  }

  // ── Timeline ──
  const totalServiciosSolicitados = servicios.length || 1;
  const todosLosPagosConfirmados =
    proveedoresContratados.length > 0 && proveedoresContratados.every((p) => p.confirmado);

  const hitosBase: Omit<TimelineHito, "estado">[] = [
    {
      id: "publicado",
      titulo: "Evento publicado",
      descripcion: "Evento visible para proveedores",
      fecha: formatFecha(ev.creado_en),
    },
    {
      id: "ofertas",
      titulo: "Ofertas recibidas",
      descripcion: `${cantidadOfertas ?? 0} propuesta${(cantidadOfertas ?? 0) === 1 ? "" : "s"} de proveedores`,
      fecha: formatRangoFechas(fechasOfertas),
    },
    {
      id: "seleccionados",
      titulo: "Proveedores seleccionados",
      descripcion: `${proveedoresContratados.length} de ${totalServiciosSolicitados} servicios confirmados`,
      fecha:
        contrataciones.length > 0
          ? formatFecha(contrataciones[contrataciones.length - 1].creado_en)
          : null,
    },
    {
      id: "pago",
      titulo: "Pago y confirmación",
      descripcion: todosLosPagosConfirmados
        ? "Pagos completados con todos los proveedores"
        : "Pendiente de completar",
      fecha: null, // no tenemos fecha de pago cargada acá; se podría sumar si hace falta
    },
    {
      id: "realizado",
      titulo: "Evento realizado",
      descripcion: "",
      fecha: formatFecha(ev.fecha_evento),
    },
  ];

  // Completitud de cada hito (booleano) — determina quién es "actual"
  const completitud = [
    true, // publicado: siempre, por existir el evento
    (cantidadOfertas ?? 0) > 0,
    proveedoresContratados.length > 0 && proveedoresContratados.length >= totalServiciosSolicitados,
    todosLosPagosConfirmados,
    ev.estado === "finalizado",
  ];

  const indiceActual = completitud.findIndex((c) => !c);
  const timeline: TimelineHito[] = hitosBase.map((hito, i) => ({
    ...hito,
    estado: completitud[i] ? "completado" : i === indiceActual ? "actual" : "pendiente",
  }));

  // ── % de progreso ──
  // Cada hito completo vale 20%. El hito "actual" (el primero incompleto)
  // suma un porcentaje parcial según qué tan avanzado está internamente.
  const PESO_POR_HITO = 20;
  let progreso = completitud.filter(Boolean).length * PESO_POR_HITO;

  if (indiceActual === 2) {
    // "Proveedores seleccionados" en curso
    progreso += PESO_POR_HITO * (proveedoresContratados.length / totalServiciosSolicitados);
  } else if (indiceActual === 3 && proveedoresContratados.length > 0) {
    // "Pago y confirmación" en curso
    const confirmados = proveedoresContratados.filter((p) => p.confirmado).length;
    progreso += PESO_POR_HITO * (confirmados / proveedoresContratados.length);
  }

  const progresoPorcentaje = Math.min(100, Math.round(progreso));

  return {
    id_evento: ev.id_evento,
    titulo: ev.titulo,
    descripcion: ev.descripcion,
    fecha_evento: ev.fecha_evento,
    ubicacion: ev.ubicacion,
    cantidad_invitados: ev.cantidad_invitados,
    presupuesto_min: ev.presupuesto_min,
    presupuesto_max: ev.presupuesto_max,
    estado: ev.estado ?? "recibiendo_ofertas",
    id_tipo_evento: ev.id_tipo_evento,
    tipo_evento: ev.tbl_tipo_evento?.nombre ?? "Evento",
    servicios,
    cantidad_ofertas: cantidadOfertas ?? 0,
    creado_en: ev.creado_en ?? new Date().toISOString(),
    proveedores_contratados: proveedoresContratados,
    timeline,
    progreso_porcentaje: progresoPorcentaje,
  };
}