/* eslint-disable @typescript-eslint/no-explicit-any */
// modules/proveedor/inicio/services/inicio.service.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StatsInicio } from "../types/inicio.types";

export async function getStatsInicio(providerId: string): Promise<StatsInicio> {
  const supabase = await createServerSupabaseClient();

  const now = new Date();
  const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const finMes = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
  const inicioMesAnt = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
  const finMesAnt = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [{ count: eventosActivos }, { count: eventosNegociacion }] = await Promise.all([
    supabase
      .from("tbl_contrataciones")
      .select("*", { count: "exact", head: true })
      .eq("id_proveedor", providerId)
      .eq("estado_servicio", "en_proceso"),
    supabase
      .from("tbl_ofertas")
      .select("*", { count: "exact", head: true })
      .eq("id_proveedor", providerId)
      .eq("estado", "enviada"),
  ]);

  const { data: calificaciones } = await supabase
    .from("tbl_calificaciones")
    .select("puntuacion, tbl_contrataciones!inner(id_proveedor)")
    .eq("tbl_contrataciones.id_proveedor", providerId);

  let calificacion = 0;
  let cantidadResenas = 0;
  if (calificaciones && calificaciones.length > 0) {
    const puntuaciones = calificaciones.map((c: any) => c.puntuacion);
    cantidadResenas = puntuaciones.length;
    calificacion = puntuaciones.reduce((a: number, b: number) => a + b, 0) / cantidadResenas;
  }

  const { data: pagosActual } = await supabase
    .from("tbl_pagos")
    .select("monto_proveedor, tbl_contrataciones!inner(id_proveedor)")
    .eq("estado_pago", "pagado")
    .eq("tbl_contrataciones.id_proveedor", providerId)
    .gte("creado_en", inicioMes)
    .lt("creado_en", finMes);

  const { data: pagosAnterior } = await supabase
    .from("tbl_pagos")
    .select("monto_proveedor, tbl_contrataciones!inner(id_proveedor)")
    .eq("estado_pago", "pagado")
    .eq("tbl_contrataciones.id_proveedor", providerId)
    .gte("creado_en", inicioMesAnt)
    .lt("creado_en", finMesAnt);

  const ingresosActual = pagosActual?.reduce((sum, p) => sum + p.monto_proveedor, 0) || 0;
  const ingresosAnterior = pagosAnterior?.reduce((sum, p) => sum + p.monto_proveedor, 0) || 0;

  const { count: totalOfertas } = await supabase
    .from("tbl_ofertas")
    .select("*", { count: "exact", head: true })
    .eq("id_proveedor", providerId);

  const { count: ofertasAceptadas } = await supabase
    .from("tbl_ofertas")
    .select("*", { count: "exact", head: true })
    .eq("id_proveedor", providerId)
    .eq("estado", "aceptada");

  let tasaRespuesta = "0%";
  if (totalOfertas && totalOfertas > 0) {
    const tasa = ((ofertasAceptadas || 0) / totalOfertas) * 100;
    tasaRespuesta = Math.round(tasa) + "%";
  }

  const formatearMoneda = (valor: number) =>
    new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 0,
    }).format(valor);

  let variacion = "0%";
  if (ingresosAnterior > 0) {
    const diff = ((ingresosActual - ingresosAnterior) / ingresosAnterior) * 100;
    variacion = (diff >= 0 ? "+" : "") + Math.round(diff) + "%";
  } else if (ingresosActual > 0) {
    variacion = "+100%";
  }

  return {
    ingresosMes: formatearMoneda(ingresosActual),
    ingresosVariacion: variacion,
    eventosActivos: eventosActivos || 0,
    eventosEnNegociacion: eventosNegociacion || 0,
    calificacion: Math.round(calificacion * 10) / 10,
    cantidadResenas,
    tasaRespuesta,
  };
}