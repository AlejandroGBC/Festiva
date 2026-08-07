/** 
 Corre en el servidor, leugo se llama directo desde el server component page.tsx.
 y este retorna los datos que necesita la pantalla de confirmación de pago.
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ResumenPago } from "@/shared/types/pagos-cliente.types";

export async function getResumenPago(
  idContratacion: string
): Promise<ResumenPago | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 1. Obtener la contratación con su evento 
  const { data: contratacion } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_evento, id_proveedor")
    .eq("id_contratacion", idContratacion)
    .maybeSingle();

  if (!contratacion) return null;

  // 2. Seguridad: el evento debe pertenecer al cliente logueado 
  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento, id_cliente")
    .eq("id_evento", contratacion.id_evento)
    .eq("id_cliente", user.id)
    .maybeSingle();

  if (!evento) return null;

  // 3. Verificar que esta contratación no esté ya pagada 
  const { data: pagoExistente } = await supabase
    .from("tbl_pagos")
    .select("estado_pago")
    .eq("id_pago", idContratacion)
    .maybeSingle();

  if (pagoExistente?.estado_pago === "pagado") return null;

  // 4. Precio ofertado + perfil del proveedor + servicios cubiertos
  interface ServicioRow {
    tbl_servicios: { nombre: string } | null;
  }

  const [ofertaRes, perfilRes, serviciosRes] = await Promise.all([
    supabase
      .from("tbl_ofertas")
      .select("precio_total")
      .eq("id_evento", contratacion.id_evento)
      .eq("id_proveedor", contratacion.id_proveedor)
      .maybeSingle(),

    supabase
      .from("tbl_perfiles_proveedor")
      .select("nombre_comercial")
      .eq("id_proveedor", contratacion.id_proveedor)
      .maybeSingle(),

    supabase
      .from("tbl_oferta_servicios")
      .select("tbl_servicios ( nombre )")
      .eq("id_evento", contratacion.id_evento)
      .eq("id_proveedor", contratacion.id_proveedor),
  ]);

  if (!ofertaRes.data) return null;

  const servicios = ((serviciosRes.data ?? []) as ServicioRow[])
    .map((s) => s.tbl_servicios?.nombre)
    .filter((n): n is string => Boolean(n));

  const servicio =
    servicios.length > 0 ? servicios.join(" + ") : "Servicio contratado";

  return {
    id_contratacion: contratacion.id_contratacion,
    id_evento: contratacion.id_evento,
    nombre_proveedor: perfilRes.data?.nombre_comercial ?? "Proveedor",
    servicio,
    monto_total: ofertaRes.data.precio_total as number,
  };
}
