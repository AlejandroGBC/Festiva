"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/notificaciones/components/NotificacionesView.tsx
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Inbox } from "lucide-react";

import TopNavbar from "@/shared/components/TopNavbar";
import Card from "@/shared/components/Card";
import Chip from "@/shared/components/Chip";

import { marcarNotificacionesVistas } from "@/modules/cliente/notificaciones/services/notificaciones.service";
import type { NotificacionItem } from "@/modules/cliente/notificaciones/types/notificaciones.types";

function tiempoRelativo(fechaISO: string): string {
  const diffMs = Date.now() - new Date(fechaISO).getTime();
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  if (horas < 1) return "hace un momento";
  if (horas < 24) return `hace ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `hace ${dias}d`;
}

interface NotificacionesViewProps {
  notificaciones: NotificacionItem[];
}

export default function NotificacionesView({ notificaciones }: NotificacionesViewProps) {
  const router = useRouter();

  // Al entrar, marcamos todo como visto (no bloquea el render)
  useEffect(() => {
    marcarNotificacionesVistas();
  }, []);

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col">
      <TopNavbar title="Notificaciones" />

      <section className="px-5 flex-1 pb-6">
        {notificaciones.length === 0 ? (
          <Card className="text-center py-14 mt-4">
            <div className="w-14 h-14 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-3 text-festiva-midnight-blue/20">
              <Inbox size={24} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              No tenés notificaciones
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50">
              Te avisamos acá cuando lleguen ofertas nuevas para tus eventos.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-2.5 mt-4">
            {notificaciones.map((n) => (
              <div key={n.id} onClick={() => router.push(n.href)} className="cursor-pointer">
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-xl bg-festiva-electric-violet/10 flex items-center justify-center shrink-0">
                      <Bell size={18} className="text-festiva-electric-violet" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-festiva-midnight-blue">
                          {n.titulo}
                        </span>
                        {n.nueva && <Chip variant="euphoric-pink">Nueva</Chip>}
                      </div>
                      <p className="text-[13px] text-festiva-midnight-blue/60 mt-0.5 mb-1">
                        {n.mensaje}
                      </p>
                      <span className="text-[11px] text-festiva-midnight-blue/40">
                        {tiempoRelativo(n.fecha)}
                      </span>
                    </div>
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