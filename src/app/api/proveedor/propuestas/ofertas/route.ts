import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api/api-response";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id_evento, precio_total, mensaje, servicios_incluidos, horas_montaje, horas_servicio } = body;

  if (!id_evento || !precio_total || !Array.isArray(servicios_incluidos) || servicios_incluidos.length === 0) {
    return apiError("Faltan datos obligatorios en la propuesta", 400);
  }

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("No autenticado", 401);

  const { data: perfilProveedor } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor")
    .eq("id_proveedor", user.id)
    .maybeSingle();
  if (!perfilProveedor) return apiError("No se encontró el perfil de proveedor", 404);

  const idProveedor = perfilProveedor.id_proveedor;

  // Revalidar que el evento sigue abierto y que no exista ya una oferta
  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento")
    .eq("id_evento", id_evento)
    .eq("estado", "recibiendo_ofertas")
    .maybeSingle();
  if (!evento) return apiError("Este evento ya no acepta ofertas", 409);

  const { data: existente } = await supabase
    .from("tbl_ofertas")
    .select("id_evento")
    .eq("id_evento", id_evento)
    .eq("id_proveedor", idProveedor)
    .maybeSingle();
  if (existente) return apiError("Ya enviaste una oferta para este evento", 409);

  // Crear la oferta
  const { error: errorOferta } = await supabase.from("tbl_ofertas").insert({
    id_evento,
    id_proveedor: idProveedor,
    precio_total,
    descripcion_servicio: mensaje || null,
  });
  if (errorOferta) return apiError("No se pudo crear la oferta", 500);

  // Servicios que cubre (tbl_oferta_servicios)
  const { error: errorServicios } = await supabase.from("tbl_oferta_servicios").insert(
    (servicios_incluidos as number[]).map((id_servicio) => ({
      id_evento,
      id_proveedor: idProveedor,
      id_servicio,
    }))
  );
  if (errorServicios) return apiError("No se pudieron guardar los servicios de la oferta", 500);

  // Items informativos (horas de montaje/servicio, sin id_servicio propio)
  const items = [];
  if (horas_montaje) items.push({ descripcion_item: `Montaje: ${horas_montaje}h` });
  if (horas_servicio) items.push({ descripcion_item: `Servicio: ${horas_servicio}h` });


  return apiSuccess({ id_evento }, 201);
}