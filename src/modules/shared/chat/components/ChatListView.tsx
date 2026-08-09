// modules/shared/chat/components/ChatListView.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquareText } from "lucide-react";
import { useAuthContext } from "@/lib/context/auth-context";
import type { ConversacionListado } from "../types/chat.types";
import Header from "@/shared/components/HeaderInicio";
import Sidebar from "@/shared/components/Sidebar";
import Card from "@/shared/components/Card";
import { getAvatarUrl } from "@/shared/utils/getAvatarUrl";
import { clienteLinks, proveedorLinks } from "@/shared/constant/sidebarLinks";

interface ChatListViewProps {
  conversaciones: ConversacionListado[];
  tieneNotificacionesNuevas: boolean;
  basePath: string; // "/cliente/chat" o "/proveedor/chat"
}


function tiempoRelativo(fechaISO: string): string {
  const diffMs = Date.now() - new Date(fechaISO).getTime();
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  if (horas < 1) return "hace un momento";
  if (horas < 24) return `hace ${horas}h`;
  const dias = Math.floor(horas / 24);
  return `hace ${dias}d`;
}

export default function ChatListView({ conversaciones, tieneNotificacionesNuevas, basePath }: ChatListViewProps) {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainLinks = user?.rol === "cliente" ? clienteLinks : proveedorLinks;

  return (
    <div className="relative min-h-dvh bg-[#F5F2FA] flex flex-col">
      <Header
        user={user!}
        onMenuClick={() => setSidebarOpen(true)}
        tieneNotificacionesNuevas={tieneNotificacionesNuevas}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user!} signOut={signOut} mainLinks={mainLinks} />

      <section className="px-5 flex-1 pb-6">
        <h1 className="text-festiva-midnight-blue font-bold text-xl pt-1 pb-4 m-0">Chat</h1>

        {conversaciones.length === 0 ? (
          <Card className="text-center py-14">
            <div className="w-14 h-14 rounded-full bg-[#F5F2FA] flex items-center justify-center mx-auto mb-3 text-festiva-midnight-blue/20">
              <MessageSquareText size={24} />
            </div>
            <h3 className="font-bold text-base text-festiva-midnight-blue mb-1">
              Todavía no tenés conversaciones
            </h3>
            <p className="text-[13px] text-festiva-midnight-blue/50">
              Cuando contactes a alguien desde uno de tus eventos, va a aparecer acá.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-2.5">
            {conversaciones.map((c) => {
              
              const avatarUrl = getAvatarUrl(c.foto_perfil_otro_url);

              return (
                <div
                  key={c.id_conversacion}
                  onClick={() => router.push(`${basePath}/${c.id_conversacion}`)}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-md transition-shadow !p-3.5">
                    <div className="flex items-center gap-3">
                      
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={c.nombre_otro}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-2xl object-cover shrink-0 border border-festiva-electric-violet/20"
                          unoptimized
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-2xl bg-festiva-electric-violet/10 border border-festiva-electric-violet/20 flex items-center justify-center shrink-0 text-sm font-bold text-festiva-electric-violet">
                          {c.nombre_otro.charAt(0)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[14px] text-festiva-midnight-blue truncate">
                            {c.nombre_otro}
                          </span>
                          {c.ultimo_mensaje_en && (
                            <span className="text-[11px] text-festiva-midnight-blue/40 shrink-0">
                              {tiempoRelativo(c.ultimo_mensaje_en)}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-festiva-midnight-blue/50 truncate m-0 mt-0.5">
                          {c.ultimo_mensaje ?? `Sobre: ${c.evento_titulo}`}
                        </p>
                      </div>

                      {c.mensajes_no_leidos > 0 && (
                        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-festiva-euphoric-pink text-white text-[11px] font-bold shrink-0">
                          {c.mensajes_no_leidos}
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}