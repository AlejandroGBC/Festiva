"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  Pencil,
  Ban,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  RefreshCw,
  CreditCard,
  Star,
} from "lucide-react";

import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import Button from "@/shared/components/Button";
import {
  cancelarEvento,
  eliminarEvento,
  finalizarEvento,
} from "@/modules/cliente/anuncio/services/evento-gestion.service";
import type { EventoDetalle } from "@/modules/cliente/anuncio/types/evento-detalle.types";
import Link from "next/link";

const ESTADO_LABEL: Record<EventoDetalle["estado"], string> = {
  recibiendo_ofertas: "Recibiendo ofertas",
  en_proceso: "En proceso",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

type Confirmacion = "cancelar" | "eliminar" | "finalizar" | null;

interface EventoDetalleViewProps {
  evento: EventoDetalle;
}

export default function EventoDetalleView({ evento }: EventoDetalleViewProps) {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState<Confirmacion>(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const puedeEliminar = evento.cantidad_ofertas === 0;
  const puedeEditar = evento.estado === "recibiendo_ofertas";
  const puedeCancelar = evento.estado === "recibiendo_ofertas" || evento.estado === "en_proceso";
  const puedeFinalizar = evento.estado === "en_proceso";

  async function ejecutar(accion: Confirmacion) {
    if (!accion) return;
    setProcesando(true);
    setError("");
    try {
      if (accion === "cancelar") await cancelarEvento(evento.id_evento);
      if (accion === "finalizar") await finalizarEvento(evento.id_evento);
      if (accion === "eliminar") {
        await eliminarEvento(evento.id_evento);
        router.push("/cliente/eventos");
        return;
      }
      router.refresh();
      setConfirmando(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo completar la acción");
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar w-full">
      {/* Header oscuro con progreso — reemplaza al TopNavbar simple */}
      <header className="bg-festiva-midnight-blue px-5 pt-6 pb-6 rounded-b-[28px]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-white" />
          </button>

          <span className="text-white/90 text-[13px] font-semibold tracking-wide">
            Detalle del evento
          </span>

          {puedeEditar ? (
            <button
              onClick={() => router.push(`/cliente/eventos/${evento.id_evento}/editar`)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <Pencil size={14} className="text-white" />
            </button>
          ) : (
            <div className="w-8 h-8" /> 
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-white m-0 truncate">{evento.titulo}</h1>
            <p className="text-[13px] text-white/50 mt-1 m-0">
              {evento.fecha_evento} — {evento.ubicacion}
            </p>
          </div>
          {evento.estado !== "finalizado" && evento.estado !== "cancelado" && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/10 px-2.5 py-1 rounded-full shrink-0">
              <RefreshCw size={11} />
              Activo
            </span>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] text-white/60 mb-1.5">
            <span>Progreso del evento</span>
            <span className="font-bold text-festiva-euphoric-pink">
              {evento.progreso_porcentaje}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-festiva-euphoric-pink rounded-full transition-all"
              style={{ width: `${evento.progreso_porcentaje}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Proveedores contratados */}
        {evento.proveedores_contratados.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-base text-festiva-midnight-blue m-0">
                Proveedores contratados
              </h2>
              <button
                onClick={() => router.push("/cliente/ofertas")}
                className="text-[13px] font-semibold text-festiva-euphoric-pink"
              >
                Ver todos
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {evento.proveedores_contratados.map((p) => {
                return (
                  <Card key={p.id_contratacion} className="!p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-festiva-euphoric-pink/10 border border-festiva-euphoric-pink/20 flex items-center justify-center shrink-0 text-sm font-bold text-festiva-euphoric-pink">
                        {p.nombre_comercial
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w.charAt(0))
                          .join("")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-festiva-midnight-blue m-0 truncate">
                          {p.nombre_comercial}
                        </p>
                        <p className="text-[12px] text-festiva-midnight-blue/50 m-0 mt-0.5">
                          {p.servicios.join(" + ")}
                        </p>
                        <p className="text-[12px] font-semibold text-festiva-midnight-blue/70 m-0 mt-0.5">
                          L{p.precio_total.toLocaleString()} HN
                        </p>
                      </div>

                      <Chip variant={p.confirmado ? "mint-neon" : "confetti-orange"}>
                        {p.confirmado ? "Confirmado" : "Pendiente"}
                      </Chip>
                    </div>

                    {/* Botón pagar — solo si aún no está confirmado */}
                    {!p.confirmado && (
                      <Link
                        href={`/cliente/eventos/${evento.id_evento}/pago/${p.id_contratacion}`}
                        className="flex items-center justify-center gap-2 mt-3 w-full bg-festiva-euphoric-pink text-white rounded-xl px-4 py-2.5 text-[13px] font-bold"
                      >
                        <CreditCard size={15} />
                        Pagar a {p.nombre_comercial}
                      </Link>
                    )}

                    <Link
                      href={`/cliente/chat/iniciar/${evento.id_evento}/${p.id_proveedor}`}
                      className="flex items-center justify-center gap-2 mt-2 w-full bg-festiva-electric-violet/10 text-festiva-electric-violet rounded-xl px-4 py-2.5 text-[13px] font-bold"
                    >
                      <MessageCircle size={15} />
                      Chatear con {p.nombre_comercial}
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Banner de calificación pendiente */}
        {evento.estado === "finalizado" && evento.calificaciones_pendientes > 0 && (
          <Link
            href={`/cliente/eventos/${evento.id_evento}/calificar`}
            className="block mt-5 rounded-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-festiva-confetti-orange to-festiva-euphoric-pink p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Star size={20} className="text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[14px] m-0">
                  Califica a tus proveedores
                </p>
                <p className="text-white/80 text-[12px] m-0 mt-0.5">
                  {evento.calificaciones_pendientes} reseña{evento.calificaciones_pendientes > 1 ? "s" : ""} pendiente{evento.calificaciones_pendientes > 1 ? "s" : ""} — es obligatorio
                </p>
              </div>
              <ArrowRight size={18} className="text-white shrink-0" />
            </div>
          </Link>
        )}

        {/* Éxito: ya calificó a todos */}
        {evento.estado === "finalizado" &&
          evento.calificaciones_pendientes === 0 &&
          evento.proveedores_contratados.length > 0 && (
            <div className="mt-5 rounded-2xl bg-festiva-mint-neon/10 border border-festiva-mint-neon/20 p-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-festiva-mint-neon shrink-0" />
              <p className="text-[13px] font-semibold text-festiva-midnight-blue m-0">
                Ya calificaste a todos tus proveedores. ¡Gracias!
              </p>
            </div>
          )}

        {/* Timeline del evento */}
        <div className="mt-6">
          <h2 className="font-bold text-base text-festiva-midnight-blue mb-4">
            Timeline del evento
          </h2>

          <div className="flex flex-col">
            {evento.timeline.map((hito, i) => {
              const esUltimo = i === evento.timeline.length - 1;
              return (
                <div key={hito.id} className="flex gap-3.5">
                  {/* Línea + punto */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        hito.estado === "completado"
                          ? "bg-festiva-mint-neon text-white"
                          : hito.estado === "actual"
                          ? "bg-festiva-electric-violet text-white"
                          : "bg-festiva-midnight-blue/10 text-festiva-midnight-blue/30"
                      }`}
                    >
                      {hito.estado === "completado" || hito.estado === "actual" ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <Calendar size={13} />
                      )}
                    </span>
                    {!esUltimo && (
                      <span
                        className={`w-0.5 flex-1 min-h-[2.25rem] my-0.5 ${
                          hito.estado === "completado" ? "bg-festiva-mint-neon" : "bg-festiva-midnight-blue/10"
                        }`}
                      />
                    )}
                  </div>

                  {/* Contenido */}
                  <div className={`pb-6 flex-1 min-w-0 ${hito.estado === "pendiente" ? "opacity-50" : ""}`}>
                    <p className="font-bold text-[14px] text-festiva-midnight-blue m-0">
                      {hito.titulo}
                    </p>
                    {hito.descripcion && (
                      <p className="text-[12px] text-festiva-midnight-blue/50 m-0 mt-0.5">
                        {hito.descripcion}
                      </p>
                    )}
                    <p className="flex items-center gap-1 text-[11px] text-festiva-midnight-blue/40 mt-1 m-0">
                      <Calendar size={11} />
                      {hito.fecha ?? (hito.estado === "pendiente" ? "Próximo paso" : "—")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalle del evento */}
        <Card className="mt-2">
          <h2 className="font-bold text-base text-festiva-midnight-blue mb-3 leading-snug">
            {evento.titulo}
          </h2>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Chip variant="electric-violet">{evento.tipo_evento}</Chip>
                <Chip
                  variant={
                    evento.estado === "recibiendo_ofertas"
                      ? "mint-neon"
                      : evento.estado === "en_proceso"
                      ? "electric-violet"
                      : evento.estado === "cancelado"
                      ? "confetti-orange"
                      : "default"
                  }
                >
                  {ESTADO_LABEL[evento.estado]}
                </Chip>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Calendar size={13} />
                <span className="text-[10px]">Fecha</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {evento.fecha_evento}
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Users size={13} />
                <span className="text-[10px]">Invitados</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {evento.cantidad_invitados} personas
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <MapPin size={13} />
                <span className="text-[10px]">Ubicación</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {evento.ubicacion}
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Wallet size={13} />
                <span className="text-[10px]">Presupuesto</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {evento.presupuesto_min && evento.presupuesto_max
                  ? `L. ${evento.presupuesto_min} - ${evento.presupuesto_max}`
                  : "Por definir"}
              </span>
            </div>
          </div>

          {evento.servicios.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-1.5">
                Servicios solicitados
              </p>
              <div className="flex flex-wrap gap-2">
                {evento.servicios.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-1.5">
              Descripción
            </p>
            <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
              {evento.descripcion}
            </p>
          </div>
        </Card>

        {/* Ofertas de este evento */}
        <div onClick={() => router.push("/cliente/ofertas")} className="cursor-pointer mt-3">
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-festiva-midnight-blue m-0">
                  {evento.cantidad_ofertas} oferta{evento.cantidad_ofertas === 1 ? "" : "s"} recibida
                  {evento.cantidad_ofertas === 1 ? "" : "s"}
                </p>
                <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">
                  Ver ofertas para este evento
                </p>
              </div>
              <ArrowRight size={16} className="text-festiva-midnight-blue/30" />
            </div>
          </Card>
        </div>

        {/* Acciones */}
        <div className="mt-5 flex flex-col gap-2.5">


          {puedeFinalizar && (
            <Button variant="light" className="w-full" onClick={() => setConfirmando("finalizar")}>
              <CheckCircle2 size={16} />
              Marcar como finalizado
            </Button>
          )}

          {puedeCancelar && (
            <Button
              variant="light"
              className="w-full !text-red-500"
              onClick={() => setConfirmando("cancelar")}
            >
              <Ban size={16} />
              Cancelar evento
            </Button>
          )}

          {puedeEliminar && (
            <Button
              variant="light"
              className="w-full !text-red-500"
              onClick={() => setConfirmando("eliminar")}
            >
              <Trash2 size={16} />
              Eliminar evento
            </Button>
          )}

          {!puedeEliminar && evento.estado !== "cancelado" && evento.estado !== "finalizado" && (
            <p className="text-[11px] text-festiva-midnight-blue/40 text-center px-4">
              Ya tiene ofertas, así que no se puede eliminar — solo cancelar.
            </p>
          )}
        </div>

        {/* Confirmación inline */}
        {confirmando && (
          <div className="mt-4 rounded-2xl bg-white border border-festiva-confetti-orange/20 p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle size={16} className="text-festiva-confetti-orange shrink-0 mt-0.5" />
              <p className="text-sm text-festiva-midnight-blue m-0">
                {confirmando === "cancelar" &&
                  "¿Seguro que querés cancelar este evento? Los proveedores ya no podrán ofertar."}
                {confirmando === "finalizar" && "¿Confirmás que este evento ya se realizó?"}
                {confirmando === "eliminar" &&
                  "¿Seguro que querés eliminar este evento? Esta acción no se puede deshacer."}
              </p>
            </div>

            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1"
                disabled={procesando}
                onClick={() => {
                  setConfirmando(null);
                  setError("");
                }}
              >
                No, volver
              </Button>
              <Button
                variant={confirmando === "eliminar" ? "dark" : "primary"}
                className="flex-1"
                disabled={procesando}
                onClick={() => ejecutar(confirmando)}
              >
                {procesando ? "Procesando..." : "Sí, confirmar"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}