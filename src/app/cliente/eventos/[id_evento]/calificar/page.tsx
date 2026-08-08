/**
  Server Component: valida el estado del evento y carga las contrataciones
  sin calificar. Delega la UI interactiva al CalificarWizard (Client Component).
 */

import { redirect } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import CalificarWizard from "@/modules/cliente/calificaciones/components/CalificarWizard";
import type { ContratacionParaCalificar } from "@/shared/types/calificaciones-cliente.types";

interface PageProps {
  params: { id_evento: string };
}

export default async function CalificarServicioPage({ params }: PageProps) {
  const { id_evento } = params;
  const supabase = await createServerSupabaseClient();

  // Autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Verificar que el evento exista, sea del cliente y esté finalizado
  const { data: evento } = await supabase
    .from("tbl_eventos")
    .select("id_evento, titulo, estado, id_cliente")
    .eq("id_evento", id_evento)
    .eq("id_cliente", user.id)
    .maybeSingle();

  if (!evento || evento.estado !== "finalizado") {
    redirect(`/cliente/eventos/${id_evento}`);
  }

  // Contrataciones del evento
  const { data: contrataciones } = await supabase
    .from("tbl_contrataciones")
    .select("id_contratacion, id_proveedor")
    .eq("id_evento", id_evento);

  if (!contrataciones || contrataciones.length === 0) {
    redirect(`/cliente/eventos/${id_evento}`);
  }

  const idsContrataciones = contrataciones.map((c) => c.id_contratacion);

  // Filtrar solo las contrataciones con pago confirmado
  // Solo se pide reseña por proveedores que el cliente efectivamente pagó.
  const { data: pagosConfirmados } = await supabase
    .from("tbl_pagos")
    .select("id_pago")
    .in("id_pago", idsContrataciones)
    .eq("estado_pago", "pagado");

  const idsConfirmados = new Set(
    (pagosConfirmados ?? []).map((p) => p.id_pago)
  );

  // Solo pedir calificación por las contrataciones pagadas
  const contratacionesPagadas = contrataciones.filter((c) =>
    idsConfirmados.has(c.id_contratacion)
  );

  if (contratacionesPagadas.length === 0) {
    redirect(`/cliente/eventos/${id_evento}`); // No hay contrataciones pagadas, nada que calificar
  }

  const idsContratacionesPagadas = contratacionesPagadas.map((c) => c.id_contratacion);

  // Calificaciones ya existentes (solo entre las pagadas)
  const { data: calificaciones } = await supabase
    .from("tbl_calificaciones")
    .select("id_contratacion")
    .in("id_contratacion", idsContratacionesPagadas);

  const idsYaCalificados = new Set(
    (calificaciones ?? []).map((c) => c.id_contratacion)
  );

  const sinCalificar = contratacionesPagadas.filter(
    (c) => !idsYaCalificados.has(c.id_contratacion)
  );

  // Si ya calificó a todas las contrataciones pagadas, redirigir
  if (sinCalificar.length === 0) {
    redirect(`/cliente/eventos/${id_evento}`);
  }

  const idsProveedores = sinCalificar.map((c) => c.id_proveedor);

  // Datos de los proveedores
  const [perfilesRes, serviciosRes] = await Promise.all([
    supabase
      .from("tbl_perfiles_proveedor")
      .select("id_proveedor, nombre_comercial")
      .in("id_proveedor", idsProveedores),

    supabase
      .from("tbl_oferta_servicios")
      .select("id_proveedor, tbl_servicios ( nombre )")
      .eq("id_evento", id_evento)
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

  const contratacionesParaCalificar: ContratacionParaCalificar[] = sinCalificar.map(
    (c) => {
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
        titulo_evento: evento.titulo,
      };
    }
  );

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar w-full">
      {/* Header */}
      <header className="bg-festiva-midnight-blue px-5 pt-6 pb-5 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/cliente/eventos/${id_evento}`}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-white" />
          </Link>
          <span className="text-white/90 text-[13px] font-semibold tracking-wide">
            Califica el servicio
          </span>
          <div className="w-8 h-8" />
        </div>

        {/* Ícono + título */}
        <div className="flex flex-col items-center text-center gap-2 pb-2">
          <div className="w-14 h-14 rounded-full bg-festiva-confetti-orange/20 flex items-center justify-center">
            <Star size={28} className="text-festiva-confetti-orange fill-festiva-confetti-orange" />
          </div>
          <h1 className="font-bold text-lg text-white">
            ¡Tu evento fue un éxito!
          </h1>
          <p className="text-[12px] text-white/60 max-w-xs leading-relaxed">
            Califica a {sinCalificar.length === 1 ? "tu proveedor" : `tus ${sinCalificar.length} proveedores`} para completar el proceso.
          </p>
        </div>
      </header>

      {/* Wizard */}
      <main className="flex-1 lg:max-w-2xl lg:mx-auto lg:w-full">
        <CalificarWizard
          contrataciones={contratacionesParaCalificar}
          idEvento={id_evento}
        />
      </main>
    </div>
  );
}