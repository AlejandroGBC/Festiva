"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function aceptarOferta(idEvento: string, idProveedor: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  // Seguridad: confirmar que el evento le pertenece al cliente logueado
  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento, id_cliente")
    .eq("id_evento", idEvento)
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!evento) throw new Error("Evento no encontrado o no autorizado");

  const { error: errorOferta } = await supabase
    .from("tbl_ofertas")
    .update({ estado: "aceptada" })
    .eq("id_evento", idEvento)
    .eq("id_proveedor", idProveedor);

  if (errorOferta) throw new Error("No se pudo aceptar la oferta");

  const { error: errorContratacion } = await supabase
    .from("tbl_contrataciones")
    .insert({ id_evento: idEvento, id_proveedor: idProveedor });

  if (errorContratacion) throw new Error("No se pudo crear la contratación");

  await supabase
    .from("tbl_eventos")
    .update({ estado: "en_proceso" })
    .eq("id_evento", idEvento)
    .eq("estado", "recibiendo_ofertas"); // solo si todavía no se movió
}