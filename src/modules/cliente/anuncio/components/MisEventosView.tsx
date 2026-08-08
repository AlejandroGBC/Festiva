"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/anuncio/components/MisEventosView.tsx
 *
 * Recibe los eventos ya cargados desde el Server Component (page.tsx) —
 * este archivo NO hace fetch, según la regla de "hooks/componentes
 * cliente = solo estado UI".
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MapPin, Clock, Calendar } from "lucide-react";

import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import Button from "@/shared/components/Button";
import { useAuthContext } from "@/lib/context/auth-context";

import type { EventoListado } from "@/modules/cliente/anuncio/services/eventos-list.service";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";

const ESTADO_LABEL: Record<string, string> = {
  recibiendo_ofertas: "Recibiendo ofertas",
  en_proceso: "En proceso",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

const ESTADO_VARIANT: Record<
  string,
  "electric-violet" | "mint-neon" | "confetti-orange" | "default"
> = {
  recibiendo_ofertas: "mint-neon",
  en_proceso: "electric-violet",
  finalizado: "default",
  cancelado: "confetti-orange",
};

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "recibiendo_ofertas", label: "Recibiendo ofertas" },
  { id: "en_proceso", label: "En proceso" },
  { id: "finalizado", label: "Finalizados" },
] as const;

type FiltroId = (typeof FILTROS)[number]["id"];

interface MisEventosViewProps {
  eventos: EventoListado[];
  tieneNotificacionesNuevas?: boolean;
}


export default function MisEventosView({ eventos, tieneNotificacionesNuevas }: MisEventosViewProps) {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtro, setFiltro] = useState<FiltroId>("todos");
  const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;


  const eventosFiltrados =
    filtro === "todos" ? eventos : eventos.filter((e) => e.estado === filtro);

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
        user={user}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} signOut={signOut} mainLinks={mainLinks} />

      <section className="px-5 flex-1">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4">
          <h1 className="text-festiva-midnight-blue font-bold text-2xl m-0">
            Mis Eventos
          </h1>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/cliente/eventos/crear")}
          >
            <Plus size={16} />
            Nuevo
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 [scrollbar-width:none]">
          {FILTROS.map((f) => (
            <Button
              key={f.id}
              variant={filtro === f.id ? "dark" : "light"}
              shape="pill"
              size="sm"
              onClick={() => setFiltro(f.id)}
              className="!h-9 !px-3.5 !text-[12px] whitespace-nowrap shrink-0"
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Lista de eventos */}
        {eventosFiltrados.length === 0 ? (
          <Card className="text-center py-14">
            <div className="w-16 h-16 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-4 text-festiva-midnight-blue/20">
              <Calendar size={28} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              {eventos.length === 0 ? "No tienes eventos" : "No hay eventos en este filtro"}
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50 mb-4">
              Publica tu primer evento y recibe ofertas de los mejores proveedores
            </p>
            <Button variant="primary" onClick={() => router.push("/cliente/eventos/crear")}>
              <Plus size={16} />
              Crear evento
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {eventosFiltrados.map((evento) => (
              <div
                key={evento.id_evento}
                onClick={() => router.push(`/cliente/eventos/${evento.id_evento}`)}
                className="cursor-pointer"
              >
                <Card className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="font-bold text-[15px] text-festiva-midnight-blue">
                    {evento.titulo}
                  </span>
                  <Chip variant={ESTADO_VARIANT[evento.estado] ?? "default"}>
                    {ESTADO_LABEL[evento.estado] ?? evento.estado}
                  </Chip>
                </div>

                <div className="flex items-center gap-3 flex-wrap mb-1.5">
                  {evento.ubicacion && (
                    <span className="flex items-center gap-1 text-xs text-festiva-midnight-blue/50">
                      <MapPin size={13} /> {evento.ubicacion}
                    </span>
                  )}
                  {evento.fecha_evento && (
                    <span className="flex items-center gap-1 text-xs text-festiva-midnight-blue/50">
                      <Clock size={13} /> {evento.fecha_evento}
                    </span>
                  )}
                  {evento.tipo_evento && (
                    <span className="text-xs text-festiva-midnight-blue/50 bg-[#F5F2FA] px-2 py-0.5 rounded-md">
                      {evento.tipo_evento}
                    </span>
                  )}
                </div>

                {evento.presupuesto_min && evento.presupuesto_max && (
                  <span className="text-[13px] font-semibold text-festiva-electric-violet">
                    L. {evento.presupuesto_min} - {evento.presupuesto_max}
                  </span>
                )}
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAB — sticky (no fixed): respeta el ancho real del contenedor
          (a diferencia de fixed, que se escapa a todo el viewport). Ahora
          que <section> tiene flex-1, la página siempre llena el alto
          completo, así que sticky sí puede "engancharse" correctamente. */}
      {!sidebarOpen && (
        <div className="sticky bottom-0 z-30 h-0 pointer-events-none">
          <button
            onClick={() => router.push("/cliente/eventos/crear")}
            className="absolute bottom-24 right-4 lg:bottom-7 lg:right-7 pointer-events-auto flex items-center gap-2 rounded-2xl bg-festiva-euphoric-pink text-white font-bold text-[13px] px-[18px] py-3 shadow-[0_6px_24px_rgba(255,77,141,0.36)] hover:-translate-y-0.5 hover:shadow-[0_9px_32px_rgba(255,77,141,0.44)] transition-all"
          >
            <Plus size={16} />
            Nuevo Evento
          </button>
        </div>
      )}

    </div>
  );
}