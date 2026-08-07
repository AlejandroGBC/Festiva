/**
 Server action - se invoca desde el client component con el botón "Pagar".
 Inserta o actualiza el registro en tbl_pagos con estado_pago = "pagado".
*/

"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { calcularComision } from "@/shared/utils/comision";

interface ConfirmarPagoInput {
  id_contratacion: string;
  tarjeta_mascara: string; //uultimos 4 dígitos de la tarjeta para guardar como referencia, ej. "4821" 
}

export async function confirmarPago({
  id_contratacion,
  tarjeta_mascara,
}: ConfirmarPagoInput): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  // 1. Obtener la contratación
  const { data: contratacion } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_evento, id_proveedor")
    .eq("id_contratacion", id_contratacion)
    .maybeSingle();

  if (!contratacion) throw new Error("Contratación no encontrada");

  // 2. Seguridad: el evento debe pertenecer al cliente logueado
  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento")
    .eq("id_evento", contratacion.id_evento)
    .eq("id_cliente", user.id)
    .maybeSingle();

  if (!evento) throw new Error("No autorizado");

  // 3. Guard: no permitir pagar dos veces
  const { data: pagoExistente } = await supabase
    .from("tbl_pagos")
    .select("estado_pago")
    .eq("id_pago", id_contratacion)
    .maybeSingle();

  if (pagoExistente?.estado_pago === "pagado") {
    throw new Error("Esta contratación ya fue pagada");
  }

  // 4. Precio ofertado por el proveedor para este evento
  const { data: oferta } = await supabase
    .from("tbl_ofertas")
    .select("precio_total")
    .eq("id_evento", contratacion.id_evento)
    .eq("id_proveedor", contratacion.id_proveedor)
    .maybeSingle();

  if (!oferta) throw new Error("Oferta no encontrada");

  // 5. Calcular distribución del pago, el 7% de comision fija
  const { monto_total, comision_festiva, monto_proveedor } = calcularComision(
    oferta.precio_total as number
  );

  // 6. Registrar el pago en tbl_pagos
  // id_pago = id_contratacion relacion 1:1
  const { error } = await supabase.from("tbl_pagos").upsert({
    id_pago: id_contratacion,
    estado_pago: "pagado",
    monto_total,
    monto_proveedor,
    comision_festiva,
    metodo_pago: "tarjeta",
    tarjeta_mascara,
  });

  if (error) throw new Error("No se pudo registrar el pago");
}
