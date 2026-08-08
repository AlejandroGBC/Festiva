"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/perfil/components/ConfiguracionView.tsx
 *
 * Sin tabla de "settings" en la DB, esta pantalla es un hub de enlaces
 * a lo que ya existe (Datos personales, Seguridad, Notificaciones) +
 * legal + cerrar sesión.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Bell, FileText, Shield, LogOut, ChevronRight, BellRing } from "lucide-react";

import TopNavbar from "@/shared/components/TopNavbar";
import Toggle from "@/shared/components/Toggle";
import { useAuthContext } from "@/lib/context/auth-context";
import {
  pushEsSoportado,
  estaSuscrito,
  activarPush,
  desactivarPush,
} from "@/modules/cliente/notificaciones/services/push.service";

interface FilaProps {
  icon: React.ReactNode;
  iconBg: string;
  titulo: string;
  subtitulo?: string;
  onClick: () => void;
}

function Fila({ icon, iconBg, titulo, subtitulo, onClick }: FilaProps) {
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
        {subtitulo && (
          <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">{subtitulo}</p>
        )}
      </div>
      <ChevronRight size={16} className="text-festiva-midnight-blue/25 shrink-0" />
    </div>
  );
}

export default function ConfiguracionView() {
  const router = useRouter();
  const { signOut } = useAuthContext();
  const [soportaPush, setSoportaPush] = useState(false);
  const [pushActivo, setPushActivo] = useState(false);
  const [cargandoPush, setCargandoPush] = useState(false);
  const [errorPush, setErrorPush] = useState("");

  useEffect(() => {
    setSoportaPush(pushEsSoportado());
    estaSuscrito().then(setPushActivo);
  }, []);

  async function handleTogglePush() {
    setErrorPush("");
    setCargandoPush(true);
    try {
      if (pushActivo) {
        await desactivarPush();
        setPushActivo(false);
      } else {
        await activarPush();
        setPushActivo(true);
      }
    } catch (e) {
      setErrorPush(e instanceof Error ? e.message : "No se pudo cambiar el estado");
    } finally {
      setCargandoPush(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Configuración" />

      <main className="flex-1 px-5 pb-8 lg:max-w-2xl lg:mx-auto lg:w-full overflow-y-auto no-scrollbar">
        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 mt-4 px-1">
          Cuenta
        </p>
        <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
          <Fila
            icon={<User size={18} className="text-festiva-electric-violet" />}
            iconBg="rgba(123,63,228,0.08)"
            titulo="Información personal"
            subtitulo="Nombre, correo, teléfono"
            onClick={() => router.push("/cliente/perfil/datos")}
          />
          <Fila
            icon={<Lock size={18} className="text-festiva-mint-neon" />}
            iconBg="rgba(46,196,182,0.10)"
            titulo="Seguridad y contraseña"
            subtitulo="Cambiar contraseña"
            onClick={() => router.push("/cliente/perfil/seguridad")}
          />
          <Fila
            icon={<Bell size={18} className="text-festiva-confetti-orange" />}
            iconBg="rgba(255,156,46,0.10)"
            titulo="Notificaciones"
            subtitulo="Ver notificaciones recientes"
            onClick={() => router.push("/cliente/notificaciones")}
          />
        </div>

        {soportaPush && (
          <>
            <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
              Notificaciones push
            </p>
            <div className="rounded-2xl bg-white border border-[#EDEAF8] p-4 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,77,141,0.08)" }}
                >
                  <BellRing size={18} className="text-festiva-euphoric-pink" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-festiva-midnight-blue m-0">
                    Notificaciones en este dispositivo
                  </p>
                  <p className="text-xs text-festiva-midnight-blue/45 m-0 mt-0.5">
                    Recibí avisos aunque no tengas la app abierta
                  </p>
                </div>
                <Toggle isOn={pushActivo} onToggle={handleTogglePush} />
              </div>
              {cargandoPush && (
                <p className="text-xs text-festiva-midnight-blue/40 mt-2 mb-0">Actualizando...</p>
              )}
              {errorPush && (
                <p className="text-xs text-red-500 mt-2 mb-0">{errorPush}</p>
              )}
            </div>
          </>
        )}

        <p className="text-[11px] font-bold text-festiva-midnight-blue/40 uppercase tracking-wide mb-2 px-1">
          Privacidad y datos
        </p>
        <div className="rounded-2xl bg-white border border-[#EDEAF8] overflow-hidden divide-y divide-[#F5F2FA] mb-5">
          <Fila
            icon={<FileText size={18} className="text-festiva-midnight-blue/50" />}
            iconBg="#F5F2FA"
            titulo="Términos y condiciones"
            onClick={() => router.push("/legal/terminos")}
          />
          <Fila
            icon={<Shield size={18} className="text-festiva-midnight-blue/50" />}
            iconBg="#F5F2FA"
            titulo="Política de privacidad"
            onClick={() => router.push("/legal/privacidad")}
          />
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-festiva-midnight-blue/10 text-festiva-midnight-blue hover:bg-festiva-midnight-blue/15 transition-colors font-bold text-sm py-3.5"
          onClick={async () => {
            await signOut();
            router.push("/auth/login");
            router.refresh();
          }}
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>

        <p className="text-center text-[11px] text-slate-400 font-medium mt-6">
          Festiva v2.4.1 · © 2026 Festiva Technologies
        </p>
      </main>
    </div>
  );
}