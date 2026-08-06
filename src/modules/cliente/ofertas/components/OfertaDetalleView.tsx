"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star, Clock, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import type { OfertaDetalle } from "@/modules/cliente/ofertas/types/oferta-detalle.types";
import Link from "next/link";
import { useState } from "react";
import { aceptarOferta } from "@/modules/cliente/ofertas/services/aceptar-oferta.service";
import Button from "@/shared/components/Button";
import { formatFecha } from "@/shared/utils/tiempo";

const ESTADO_LABEL: Record<OfertaDetalle["estado"], string> = {
  enviada: "Nueva",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  cancelada: "Cancelada",
};

const ESTADO_VARIANT: Record<
  OfertaDetalle["estado"],
  "euphoric-pink" | "mint-neon" | "confetti-orange" | "default"
> = {
  enviada: "euphoric-pink",
  aceptada: "mint-neon",
  rechazada: "confetti-orange",
  cancelada: "default",
};


interface OfertaDetalleViewProps {
  oferta: OfertaDetalle;
}


export default function OfertaDetalleView({ oferta }: OfertaDetalleViewProps) {
  const router = useRouter();
  const [confirmandoAceptar, setConfirmandoAceptar] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const puedeAceptar = oferta.estado === "enviada";
  const inicial = oferta.proveedor_nombre.charAt(0);

  async function handleAceptar() {
    setProcesando(true);
    setError("");
    try {
      await aceptarOferta(oferta.id_evento, oferta.id_proveedor);
      router.refresh();
      setConfirmandoAceptar(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo aceptar la oferta");
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar">
      <header className="bg-festiva-midnight-blue px-5 pt-14 pb-7 rounded-b-[28px]">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-festiva-euphoric-pink/20 border-2 border-festiva-euphoric-pink/30 flex items-center justify-center shrink-0 text-lg font-bold text-white">
            {inicial}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-white m-0 truncate">{oferta.proveedor_nombre}</h1>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[13px] text-white/50">{oferta.proveedor_categoria}</span>
              {oferta.proveedor_ubicacion && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1 text-[13px] text-white/50">
                    <MapPin size={12} />
                    {oferta.proveedor_ubicacion}
                  </span>
                </>
              )}
            </div>
            {oferta.proveedor_calificacion != null && (
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={13} className="fill-festiva-confetti-orange text-festiva-confetti-orange" />
                <span className="text-[13px] font-bold text-white">{oferta.proveedor_calificacion}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        <Card className="mt-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide m-0">
                Oferta para
              </p>
              <p className="font-bold text-base text-festiva-midnight-blue m-0">{oferta.evento_titulo}</p>
            </div>
            <Chip variant={ESTADO_VARIANT[oferta.estado]}>{ESTADO_LABEL[oferta.estado]}</Chip>
          </div>

          <p className="font-extrabold text-2xl text-festiva-electric-violet m-0 mt-2">
            L. {oferta.precio_total.toLocaleString()}
          </p>

          {oferta.servicios_cubiertos.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {oferta.servicios_cubiertos.map((servicio) => (
                <Chip key={servicio} variant="electric-violet">
                  {servicio}
                </Chip>
              ))}
            </div>
          )}

          {oferta.descripcion_servicio && (
            <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed mt-3 mb-0">
              {oferta.descripcion_servicio}
            </p>
          )}

          <p className="flex items-center gap-1 text-[11px] text-festiva-midnight-blue/40 mt-3 mb-0">
            <Clock size={11} />
            Recibida el {formatFecha(oferta.creada_en)}
          </p>
        </Card>

        {oferta.items_incluidos.length > 0 && (
          <Card className="mt-3">
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2">
              Incluye
            </p>
            <div className="flex flex-col gap-2">
              {oferta.items_incluidos.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-festiva-mint-neon shrink-0 mt-0.5" />
                  <span className="text-[13px] text-festiva-midnight-blue/70">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-2.5 mt-5">
          <Link
            href={`/cliente/chat/iniciar/${oferta.id_evento}/${oferta.id_proveedor}`}
            className="flex items-center justify-center gap-2 w-full bg-festiva-electric-violet text-white rounded-2xl px-4 py-3.5 text-[14px] font-bold shadow-[0_6px_20px_rgba(124,58,237,0.3)]"
          >
            <MessageCircle size={18} />
            Chatear con {oferta.proveedor_nombre}
          </Link>

          {puedeAceptar && (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setConfirmandoAceptar(true)}
            >
              <CheckCircle2 size={16} />
              Aceptar oferta
            </Button>
          )}
        </div>

        {confirmandoAceptar && (
          <div className="mt-4 rounded-2xl bg-white border border-festiva-mint-neon/20 p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle size={16} className="text-festiva-mint-neon shrink-0 mt-0.5" />
              <p className="text-sm text-festiva-midnight-blue m-0">
                ¿Confirmás que querés aceptar esta oferta de {oferta.proveedor_nombre} por L.{" "}
                {oferta.precio_total.toLocaleString()}?
              </p>
            </div>

            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1"
                disabled={procesando}
                onClick={() => {
                  setConfirmandoAceptar(false);
                  setError("");
                }}
              >
                No, volver
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                disabled={procesando}
                onClick={handleAceptar}
              >
                {procesando ? "Procesando..." : "Sí, aceptar"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}