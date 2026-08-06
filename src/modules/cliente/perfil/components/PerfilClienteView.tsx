"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/perfil/components/PerfilClienteView.tsx
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Bell,
  Calendar,
  CreditCard,
  Star,
  ChevronRight,
  LogOut,
} from "lucide-react";

import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";
import { useAuthContext } from "@/lib/context/auth-context";

import type { PerfilClienteData } from "@/modules/cliente/perfil/types/perfil.types";

function iniciales(nombreCompleto: string): string {
  const partes = nombreCompleto.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

function anioDesde(fechaISO: string): number {
  return new Date(fechaISO).getFullYear();
}

interface FilaCuentaProps {
  icon: React.ReactNode;
  iconBg: string;
  titulo: string;
  subtitulo: string;
  onClick: () => void;
}

function FilaCuenta({ icon, iconBg, titulo, subtitulo, onClick }: FilaCuentaProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-[#F9F8FF] transition-colors"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-festiva-midnight-blue m-0">{titulo}</p>
        <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">{subtitulo}</p>
      </div>
      <ChevronRight size={16} className="text-festiva-midnight-blue/25 shrink-0" />
    </div>
  );
}

interface PerfilClienteViewProps {
  perfil: PerfilClienteData;
  tieneNotificacionesNuevas?: boolean;
}

export default function PerfilClienteView({ perfil, tieneNotificacionesNuevas }: PerfilClienteViewProps) {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
        user={user}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} signOut={signOut} />

      <section className="px-5 flex-1 pb-6">
        <h1 className="text-festiva-midnight-blue font-bold text-xl pt-1 pb-4 m-0">
          Mi Perfil
        </h1>

        {/* Cabecera colorida */}
        <div className="relative overflow-hidden rounded-[18px] bg-festiva-midnight-blue p-5 mb-4">
          <svg
            className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
            viewBox="0 0 120 120"
          >
            <circle cx="100" cy="20" r="50" fill="#7B3FE4" opacity="0.25" />
            <circle cx="80" cy="90" r="35" fill="#FF4D8D" opacity="0.18" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-[72px] h-[72px] rounded-full bg-festiva-euphoric-pink flex items-center justify-center text-2xl font-extrabold text-white shadow-lg mb-3">
              {iniciales(perfil.nombreCompleto)}
            </div>
            <h2 className="text-white font-bold text-lg m-0">{perfil.nombreCompleto}</h2>
            <p className="text-white/50 text-xs mt-1 mb-3">
              {perfil.correo} · Cliente desde {anioDesde(perfil.clienteDesde)}
            </p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {perfil.cuentaActiva && <Chip variant="mint-neon">Cuenta verificada</Chip>}
              <Chip variant="electric-violet">
                {perfil.totalEventos} evento{perfil.totalEventos === 1 ? "" : "s"}
              </Chip>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { valor: perfil.totalEventos, label: "Eventos", color: "text-festiva-electric-violet" },
            { valor: perfil.totalProveedores, label: "Proveedores", color: "text-festiva-euphoric-pink" },
            { valor: perfil.totalResenas, label: "Reseñas", color: "text-festiva-confetti-orange" },
          ].map((stat) => (
            <Card key={stat.label} className="!p-3.5 text-center">
              <div className={`text-xl font-extrabold ${stat.color}`}>{stat.valor}</div>
              <div className="text-[11px] text-festiva-midnight-blue/45 mt-0.5">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Mi cuenta */}
        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
          Mi cuenta
        </p>
        <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
          <FilaCuenta
            icon={<User size={18} className="text-festiva-electric-violet" />}
            iconBg="rgba(123,63,228,0.08)"
            titulo="Datos personales"
            subtitulo="Nombre, correo, teléfono"
            onClick={() => router.push("/cliente/perfil/datos")}
          />
          <FilaCuenta
            icon={<Lock size={18} className="text-festiva-mint-neon" />}
            iconBg="rgba(46,196,182,0.10)"
            titulo="Seguridad"
            subtitulo="Contraseña, verificación"
            onClick={() => router.push("/cliente/perfil/seguridad")}
          />
          <FilaCuenta
            icon={<Bell size={18} className="text-festiva-confetti-orange" />}
            iconBg="rgba(255,156,46,0.10)"
            titulo="Notificaciones"
            subtitulo="Email y push"
            onClick={() => router.push("/cliente/perfil/notificaciones")}
          />
        </div>

        {/* Historial */}
        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
          Historial
        </p>
        <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
          <FilaCuenta
            icon={<Calendar size={18} className="text-festiva-euphoric-pink" />}
            iconBg="rgba(255,77,141,0.08)"
            titulo="Mis eventos"
            subtitulo={`${perfil.totalEventos} evento${perfil.totalEventos === 1 ? "" : "s"} registrados`}
            onClick={() => router.push("/cliente/eventos")}
          />
          <FilaCuenta
            icon={<CreditCard size={18} className="text-festiva-electric-violet" />}
            iconBg="rgba(123,63,228,0.08)"
            titulo="Historial de pagos"
            subtitulo="Facturas y recibos"
            onClick={() => router.push("/cliente/pagos")}
          />
          <FilaCuenta
            icon={<Star size={18} className="text-festiva-confetti-orange" />}
            iconBg="rgba(255,156,46,0.10)"
            titulo="Mis reseñas"
            subtitulo={`${perfil.totalResenas} reseña${perfil.totalResenas === 1 ? "" : "s"} escritas`}
            onClick={() => router.push("/cliente/perfil/resenas")}
          />
        </div>

        {/* Cerrar sesión */}
        <button
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/8 text-red-500 font-bold text-sm py-3.5"
          onClick={async () => {
            await signOut();
            router.push("/auth/login");
            router.refresh();
          }}
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </section>

    </div>
  );
}