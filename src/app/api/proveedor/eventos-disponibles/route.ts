import { createServerSupabaseClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api/api-response";
import type { EventoDisponible, CategoriaChip } from "@/shared/types/buscar-proveedor.types";
import { formatFecha } from "@/shared/utils/tiempo";

const VARIANTES: CategoriaChip["variant"][] = ["pink", "violet", "orange", "mint"];

function calcularEstado(creadoEn: string, fechaEvento: string): EventoDisponible["estado"] {
  const horasDesdeCreacion = (Date.now() - new Date(creadoEn).getTime()) / (1000 * 60 * 60);
  if (horasDesdeCreacion <= 48) {
    return { tipo: "nuevo", label: "Nuevo" };
  }

  const diasHastaEvento = Math.ceil(
    (new Date(fechaEvento).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diasHastaEvento >= 0 && diasHastaEvento <= 7) {
    return { tipo: "vence_pronto", label: `Vence en ${diasHastaEvento}d` };
  }

  return undefined;
}

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return apiError("No autenticado", 401);

  const { data: perfilProveedor, error: perfilError } = await supabase
    .from("tbl_perfiles_proveedor")
    .select("id_proveedor")
    .eq("id_proveedor", user.id)
    .maybeSingle();
  if (perfilError || !perfilProveedor) return apiError("No se encontró el perfil de proveedor", 404);

  const idProveedor = perfilProveedor.id_proveedor;

  // Servicios que este proveedor ofrece
  const { data: serviciosProveedorDb } = await supabase
    .from("tbl_proveedor_servicios")
    .select("id_servicio")
    .eq("id_proveedor", idProveedor);

  const idsServiciosProveedor = (serviciosProveedorDb ?? []).map((s) => s.id_servicio as number);
  if (idsServiciosProveedor.length === 0) return apiSuccess([]);

  // Eventos que pidieron alguno de esos servicios
  const { data: eventoServiciosDb } = await supabase
    .from("tbl_evento_servicios")
    .select("id_evento, id_servicio, tbl_servicios ( nombre )")
    .in("id_servicio", idsServiciosProveedor);

  interface EventoServicioRow {
    id_evento: string;
    id_servicio: number;
    tbl_servicios: { nombre: string } | null;
  }
  const eventoServicios = (eventoServiciosDb ?? []) as EventoServicioRow[];
  if (eventoServicios.length === 0) return apiSuccess([]);

  const serviciosCoincidentesPorEvento = new Map<string, string[]>();
  for (const row of eventoServicios) {
    const nombre = row.tbl_servicios?.nombre;
    if (!nombre) continue;
    const lista = serviciosCoincidentesPorEvento.get(row.id_evento) ?? [];
    lista.push(nombre);
    serviciosCoincidentesPorEvento.set(row.id_evento, lista);
  }

  const idsEventosCandidatos = Array.from(serviciosCoincidentesPorEvento.keys());

  // Datos de esos eventos, solo los que siguen recibiendo ofertas
  const { data: eventosDb } = await supabase
    .from("tbl_eventos")
    .select(
      "id_evento, titulo, descripcion, fecha_evento, ubicacion, cantidad_invitados, presupuesto_min, presupuesto_max, creado_en"
    )
    .in("id_evento", idsEventosCandidatos)
    .eq("estado", "recibiendo_ofertas")
    .order("creado_en", { ascending: false });

  interface EventoRow {
    id_evento: string;
    titulo: string;
    descripcion: string;
    fecha_evento: string;
    ubicacion: string;
    cantidad_invitados: number;
    presupuesto_min: number | null;
    presupuesto_max: number | null;
    creado_en: string;
  }
  let eventos = (eventosDb ?? []) as EventoRow[];
  if (eventos.length === 0) return apiSuccess([]);

  // Excluir eventos donde este proveedor ya mandó oferta
  const { data: ofertasDb } = await supabase
    .from("tbl_ofertas")
    .select("id_evento")
    .eq("id_proveedor", idProveedor)
    .in(
      "id_evento",
      eventos.map((e) => e.id_evento)
    );

  const idsYaOfertados = new Set((ofertasDb ?? []).map((o) => o.id_evento as string));
  eventos = eventos.filter((e) => !idsYaOfertados.has(e.id_evento));

  // Armar la respuesta
  const resultado: EventoDisponible[] = eventos.map((e) => {
    const servicios = serviciosCoincidentesPorEvento.get(e.id_evento) ?? [];
    const categorias: CategoriaChip[] = servicios.map((nombre, i) => ({
      label: nombre,
      variant: VARIANTES[i % VARIANTES.length],
    }));

    return {
      id: e.id_evento,
      titulo: e.titulo,
      fecha: formatFecha(e.fecha_evento),
      ubicacion: e.ubicacion,
      cantidadPersonas: e.cantidad_invitados,
      categorias,
      descripcion: e.descripcion,
      presupuesto:
        e.presupuesto_min && e.presupuesto_max
          ? `L. ${e.presupuesto_min.toLocaleString()} - ${e.presupuesto_max.toLocaleString()} HN`
          : "Por definir",
      estado: calcularEstado(e.creado_en, e.fecha_evento),
    };
  });

  return apiSuccess(resultado);
}