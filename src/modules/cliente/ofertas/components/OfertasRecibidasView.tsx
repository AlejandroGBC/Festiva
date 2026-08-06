"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/ofertas/components/OfertasRecibidasView.tsx
 *
 * Recibe eventos + ofertas ya cargados desde el Server Component
 * (page.tsx) — no hace fetch acá, solo estado de UI (filtros, sidebar).
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Clock, Star, ChevronRight, Inbox } from "lucide-react";

import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import Button from "@/shared/components/Button";
import { useAuthContext } from "@/lib/context/auth-context";

import type {
  OfertaListado,
  EventoFiltro,
} from "@/modules/cliente/ofertas/types/ofertas.types";
import { tiempoRelativo } from "@/shared/utils/tiempo";

const ESTADO_LABEL: Record<OfertaListado["estado"], string> = {
  enviada: "Nueva",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  cancelada: "Cancelada",
};

const ESTADO_VARIANT: Record<
  OfertaListado["estado"],
  "euphoric-pink" | "mint-neon" | "confetti-orange" | "default"
> = {
  enviada: "euphoric-pink",
  aceptada: "mint-neon",
  rechazada: "confetti-orange",
  cancelada: "default",
};

const FILTROS_ESTADO = [
  { key: "todas", label: "Todas" },
  { key: "enviada", label: "Nuevas" },
  { key: "aceptada", label: "Aceptadas" },
  { key: "rechazada", label: "Rechazadas" },
] as const;

type FiltroEstado = (typeof FILTROS_ESTADO)[number]["key"];

interface OfertasRecibidasViewProps {
  eventos: EventoFiltro[];
  ofertas: OfertaListado[];
  tieneNotificacionesNuevas?: boolean;
}

export default function OfertasRecibidasView({
  eventos,
  ofertas,
  tieneNotificacionesNuevas,
}: OfertasRecibidasViewProps) {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<string>("todos");
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todas");

  const ofertasPorEvento =
    eventoSeleccionado === "todos"
      ? ofertas
      : ofertas.filter((o) => o.id_evento === eventoSeleccionado);

  const ofertasFiltradas =
    filtroEstado === "todas"
      ? ofertasPorEvento
      : ofertasPorEvento.filter((o) => o.estado === filtroEstado);

  const ofertasNuevas = ofertas.filter((o) => o.estado === "enviada").length;

  const contarPorEstado = (estado: FiltroEstado) =>
    estado === "todas"
      ? ofertasPorEvento.length
      : ofertasPorEvento.filter((o) => o.estado === estado).length;

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
        user={user}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user!} signOut={signOut} />

      <section className="px-5 flex-1 pb-6 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div>
            <h1 className="text-festiva-midnight-blue font-bold text-xl m-0">
              Ofertas Recibidas
            </h1>
            <p className="text-xs text-festiva-midnight-blue/50 mt-0.5">
              {ofertas.length} en total ·{" "}
              <span className="text-festiva-euphoric-pink font-bold">
                {ofertasNuevas} nuevas
              </span>
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/cliente/eventos/crear")}
          >
            <Plus size={15} />
            Publicar
          </Button>
        </div>

        {/* Filtro por evento — cada uno muestra cuántas ofertas tiene */}
        {eventos.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 [scrollbar-width:none]">
            <Button
              variant={eventoSeleccionado === "todos" ? "dark" : "light"}
              shape="pill"
              size="sm"
              onClick={() => setEventoSeleccionado("todos")}
              className="!h-8 !px-3 !text-[11px] whitespace-nowrap shrink-0"
            >
              Todos
            </Button>
            {eventos.map((ev) => (
              <Button
                key={ev.id_evento}
                variant={eventoSeleccionado === ev.id_evento ? "dark" : "light"}
                shape="pill"
                size="sm"
                onClick={() => setEventoSeleccionado(ev.id_evento)}
                className="!h-8 !px-3 !text-[11px] whitespace-nowrap shrink-0"
              >
                {ev.titulo} ({ev.cantidad_ofertas})
              </Button>
            ))}
          </div>
        )}

        {/* Filtro por estado */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mt-2 mb-3 [scrollbar-width:none]">
          {FILTROS_ESTADO.map((f) => (
            <Button
              key={f.key}
              variant={filtroEstado === f.key ? "dark" : "light"}
              shape="pill"
              size="sm"
              onClick={() => setFiltroEstado(f.key)}
              className="!h-7 !px-2.5 !text-[10px] whitespace-nowrap shrink-0"
            >
              {f.label} ({contarPorEstado(f.key)})
            </Button>
          ))}
        </div>

        {/* Lista de ofertas */}
        {ofertasFiltradas.length === 0 ? (
          <Card className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-3 text-festiva-midnight-blue/20">
              <Inbox size={24} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              No hay ofertas
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50 mb-4">
              {ofertas.length === 0
                ? "Aún no has recibido ofertas para tus eventos."
                : "No hay ofertas que coincidan con este filtro."}
            </p>
            <Button variant="primary" onClick={() => router.push("/cliente/eventos/crear")}>
              <Plus size={16} />
              Publicar un evento
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-2.5">
            {ofertasFiltradas.map((oferta) => (
              <div
                key={`${oferta.id_evento}-${oferta.id_proveedor}`}
                onClick={() =>
                  router.push(`/cliente/ofertas/${oferta.id_evento}/${oferta.id_proveedor}`)
                }
                className="cursor-pointer"
              >
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex gap-3.5 items-center">
                    <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-festiva-electric-violet/10 to-festiva-euphoric-pink/10 border border-festiva-electric-violet/15 flex items-center justify-center shrink-0 text-lg font-bold text-festiva-electric-violet">
                      {oferta.proveedor_nombre.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="font-bold text-[15px] text-festiva-midnight-blue">
                          {oferta.proveedor_nombre}
                        </span>
                        <Chip variant={ESTADO_VARIANT[oferta.estado]}>
                          {ESTADO_LABEL[oferta.estado]}
                        </Chip>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                        {oferta.descripcion_servicio && (
                          <span className="text-[13px] text-festiva-midnight-blue/50 truncate max-w-[180px]">
                            {oferta.descripcion_servicio}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-festiva-midnight-blue/40">
                          <Clock size={12} />
                          {tiempoRelativo(oferta.creada_en)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {oferta.precio_total != null && (
                          <span className="text-xl font-extrabold text-festiva-electric-violet">
                            L. {oferta.precio_total.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[11px] text-festiva-midnight-blue/50 bg-[#F5F2FA] px-2 py-0.5 rounded-md">
                          {oferta.evento_titulo}
                        </span>
                        {oferta.calificacion_promedio != null && (
                          <span className="flex items-center gap-0.5 text-[11px] font-semibold text-festiva-confetti-orange">
                            <Star size={11} className="fill-festiva-confetti-orange" />
                            {oferta.calificacion_promedio}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight size={16} className="text-festiva-midnight-blue/30 shrink-0" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}