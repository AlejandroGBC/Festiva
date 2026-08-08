/**
 *
 * Corre en el SERVIDOR, se llama directo desde page.tsx.
 *
 * Cálculo de estadísticas:
 * - totalEventos: cantidad de tbl_eventos del cliente
 * - totalProveedores: proveedores DISTINTOS que le enviaron oferta en
 *   cualquiera de sus eventos (tbl_ofertas.id_proveedor)
 * - totalResenas: cantidad de tbl_calificaciones que el cliente escribió
 *   (vía tbl_contrataciones de sus propios eventos — el cliente es quien
 *   califica al proveedor después de la contratación, no al revés)
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PerfilClienteData } from "@/modules/cliente/perfil/types/perfil.types";
import { getAvatarUrl } from "@/shared/utils/getAvatarUrl";

export async function getPerfilCliente(): Promise<PerfilClienteData | null> {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: usuario } = await supabase
    .from("tbl_usuarios")
    .select("nombre_completo, correo, telefono, foto_perfil_url")
    .eq("id_usuario", user.id)
    .maybeSingle();
  if (!usuario) return null;

  const { data: perfilCliente } = await supabase
    .from("tbl_perfiles_cliente")
    .select("id_cliente, activo, creado_en")
    .eq("id_cliente", user.id)
    .maybeSingle();
  if (!perfilCliente) return null;

  const { data: eventosDb } = await supabase
    .from("tbl_eventos")
    .select("id_evento")
    .eq("id_cliente", perfilCliente.id_cliente);

  const idsEventos = (eventosDb ?? []).map((e) => e.id_evento);

  let totalProveedores = 0;
  let totalResenas = 0;

  if (idsEventos.length > 0) {
    const { data: ofertasDb } = await supabase
      .from("tbl_ofertas")
      .select("id_proveedor")
      .in("id_evento", idsEventos);
    totalProveedores = new Set((ofertasDb ?? []).map((o) => o.id_proveedor)).size;

    const { data: contratacionesDb } = await supabase
      .from("tbl_contrataciones")
      .select("id_contratacion")
      .in("id_evento", idsEventos);
    const idsContrataciones = (contratacionesDb ?? []).map((c) => c.id_contratacion);

    if (idsContrataciones.length > 0) {
      const { count } = await supabase
        .from("tbl_calificaciones")
        .select("id_calificacion", { count: "exact", head: true })
        .in("id_contratacion", idsContrataciones);
      totalResenas = count ?? 0;
    }
  }

  return {
    nombreCompleto: usuario.nombre_completo,
    correo: usuario.correo,
    telefono: usuario.telefono,
    fotoPerfilUrl: getAvatarUrl(usuario.foto_perfil_url) ?? null,
    clienteDesde: perfilCliente.creado_en ?? new Date().toISOString(),
    cuentaActiva: perfilCliente.activo ?? true,
    totalEventos: idsEventos.length,
    totalProveedores,
    totalResenas,
  };
}