"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Wallet,
  MessageCircle,
} from "lucide-react";
import Card from "@/shared/components/Card"; // 🔧 ajustá los paths reales
import Chip from "@/shared/components/Chip";
import { PropuestaDetalle } from "@/shared/types/propuestas-proveedor.types";

interface PropuestaDetalleViewProps {
  propuesta: PropuestaDetalle;
}

const ESTADO_LABEL: Record<PropuestaDetalle["estado"], string> = {
  enviada: "Enviada",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  cancelada: "Cancelada",
};

const ESTADO_VARIANT: Record<PropuestaDetalle["estado"], "confetti-orange" | "mint-neon" | "default"> = {
  enviada: "confetti-orange",
  aceptada: "mint-neon",
  rechazada: "default",
  cancelada: "default",
};

export default function PropuestaDetalleView({ propuesta }: PropuestaDetalleViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col overflow-y-auto no-scrollbar w-full">
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

          <div className="w-8 h-8" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-white m-0 truncate">{propuesta.tituloEvento}</h1>
            <p className="text-[13px] text-white/50 mt-1 m-0">
              {propuesta.fechaEvento} — {propuesta.ubicacion}
            </p>
          </div>
          <Chip variant={ESTADO_VARIANT[propuesta.estado]}>{ESTADO_LABEL[propuesta.estado]}</Chip>
        </div>
      </header>

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Card de la oferta */}
        <Card className="mt-5">
          <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide m-0">
            Tu oferta
          </p>
          <p className="font-extrabold text-2xl text-festiva-electric-violet m-0 mt-2">
            L. {propuesta.precioTotal.toLocaleString()}
          </p>

          {propuesta.servicios.length > 0 && (
            <p className="text-[13px] text-festiva-midnight-blue/60 mt-2 mb-0">
              {propuesta.servicios.join(" · ")}
            </p>
          )}

          {propuesta.descripcionServicio && (
            <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed mt-3 mb-0">
              {propuesta.descripcionServicio}
            </p>
          )}

          <p className="flex items-center gap-1 text-[11px] text-festiva-midnight-blue/40 mt-3 mb-0">
            <Calendar size={11} />
            Enviada el {propuesta.creadaEn}
          </p>
        </Card>


        {/* Detalle del evento */}
        <Card className="mt-3">
          <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-1.5">
            Detalle del evento
          </p>
          <h2 className="font-bold text-base text-festiva-midnight-blue mb-4 leading-snug">
            {propuesta.tituloEvento}
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Calendar size={13} />
                <span className="text-[10px]">Fecha</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {propuesta.fechaEvento}
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Users size={13} />
                <span className="text-[10px]">Invitados</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {propuesta.cantidadInvitados} personas
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <MapPin size={13} />
                <span className="text-[10px]">Ubicación</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {propuesta.ubicacion}
              </span>
            </div>
            <div className="bg-[#F9F8FF] rounded-lg px-3 py-2.5 border border-festiva-electric-violet/10">
              <div className="flex items-center gap-1 mb-0.5 text-festiva-midnight-blue/50">
                <Wallet size={13} />
                <span className="text-[10px]">Presupuesto</span>
              </div>
              <span className="text-[13px] font-semibold text-festiva-midnight-blue">
                {propuesta.presupuestoMin && propuesta.presupuestoMax
                  ? `L. ${propuesta.presupuestoMin} - ${propuesta.presupuestoMax}`
                  : "Por definir"}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-1.5">
              Descripción
            </p>
            <p className="text-[13px] text-festiva-midnight-blue/70 leading-relaxed m-0">
              {propuesta.descripcionEvento}
            </p>
          </div>
        </Card>

        <Link
          href={`/proveedor/chat/iniciar/${propuesta.id_evento}`}
          className="flex items-center justify-center gap-2 mt-5 w-full bg-festiva-electric-violet text-white rounded-2xl px-4 py-3.5 text-[14px] font-bold shadow-[0_6px_20px_rgba(124,58,237,0.3)]"
        >
          <MessageCircle size={18} />
          Chatear con el cliente
        </Link>
      </main>
    </div>
  );
}