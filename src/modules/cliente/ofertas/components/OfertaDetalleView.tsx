"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/ofertas/components/OfertaDetalleView.tsx
 */

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star, Clock, MessageCircle, CheckCircle2 } from "lucide-react";

import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import { useAuthContext } from "@/lib/context/auth-context";
import { construirLinkWhatsApp, construirMensajeOferta } from "@/shared/lib/whatsapp";
import type { OfertaDetalle } from "@/modules/cliente/ofertas/types/oferta-detalle.types";

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

function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-HN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

interface OfertaDetalleViewProps {
  oferta: OfertaDetalle;
}

export default function OfertaDetalleView({ oferta }: OfertaDetalleViewProps) {
  const router = useRouter();
  const { user } = useAuthContext();

  const linkWhatsApp = oferta.proveedor_telefono
    ? construirLinkWhatsApp(
        oferta.proveedor_telefono,
        construirMensajeOferta({
          nombreCliente: user?.nombre ?? "un cliente de Festiva",
          nombreProveedor: oferta.proveedor_nombre,
          eventoTitulo: oferta.evento_titulo,
          servicio: oferta.proveedor_categoria,
          precio: oferta.precio_total,
          yaAceptada: oferta.estado === "aceptada",
        })
      )
    : null;

  const inicial = oferta.proveedor_nombre.charAt(0);

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
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

        {linkWhatsApp ? (
          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-5 w-full bg-[#25D366] text-white rounded-2xl px-4 py-3.5 text-[14px] font-bold shadow-[0_6px_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={18} />
            Chatear por WhatsApp
          </a>
        ) : (
          <p className="text-[12px] text-festiva-midnight-blue/40 text-center mt-5">
            Este proveedor todavía no cargó un teléfono de contacto.
          </p>
        )}
      </main>
    </div>
  );
}