"use client";

/**
 * Ubicación sugerida:
 *   src/modules/cliente/chat/components/ConversacionView.tsx
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

import { useAuthContext } from "@/lib/context/auth-context";
import { createClient } from "@/lib/supabase/client";
import { enviarMensaje } from "@/modules/cliente/chat/services/mensajes.service";
import type { ConversacionDetalle, Mensaje } from "@/modules/cliente/chat/types/chat.types";

function formatHora(iso: string): string {
  return new Intl.DateTimeFormat("es-HN", { hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

interface ConversacionViewProps {
  conversacion: ConversacionDetalle;
}

export default function ConversacionView({ conversacion }: ConversacionViewProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [mensajes, setMensajes] = useState<Mensaje[]>(conversacion.mensajes);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  // Suscripción en vivo: cualquier mensaje nuevo insertado en esta
  // conversación (mío o del proveedor) llega acá — por eso NO agregamos
  // el mensaje "a mano" al enviar, esperamos a que Realtime lo traiga,
  // así evitamos duplicados y el código queda con una sola fuente de verdad.
  useEffect(() => {
    const supabase = createClient();

    const canal = supabase
      .channel(`mensajes:${conversacion.id_conversacion}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "tbl_mensajes",
          filter: `id_conversacion=eq.${conversacion.id_conversacion}`,
        },
        (payload) => {
          const nuevo = payload.new as Mensaje;
          setMensajes((prev) => (prev.some((m) => m.id_mensaje === nuevo.id_mensaje) ? prev : [...prev, nuevo]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversacion.id_conversacion]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes.length]);

  async function handleEnviar() {
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    const textoAEnviar = texto;
    setTexto("");
    try {
      await enviarMensaje(conversacion.id_conversacion, textoAEnviar);
    } catch {
      setTexto(textoAEnviar); // devolvemos el texto al input si falló, para no perderlo
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F5F2FA] flex flex-col">
      <header className="bg-festiva-midnight-blue px-5 pt-14 pb-4 flex items-center gap-3 shrink-0">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div className="min-w-0">
          <p className="font-bold text-[15px] text-white m-0 truncate">{conversacion.nombre_otro}</p>
          <p className="text-[12px] text-white/50 m-0 truncate">{conversacion.evento_titulo}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
        {mensajes.length === 0 && (
          <p className="text-center text-[13px] text-festiva-midnight-blue/40 mt-10">
            Todavía no hay mensajes — escribí el primero.
          </p>
        )}

        {mensajes.map((m) => {
          const esMio = m.id_remitente === user?.id;
          return (
            <div key={m.id_mensaje} className={`flex ${esMio ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                  esMio
                    ? "bg-festiva-electric-violet text-white rounded-br-sm"
                    : "bg-white text-festiva-midnight-blue border border-[#EDEAF8] rounded-bl-sm"
                }`}
              >
                <p className="text-[14px] m-0 whitespace-pre-wrap break-words">{m.contenido}</p>
                <p className={`text-[10px] mt-1 mb-0 ${esMio ? "text-white/60" : "text-festiva-midnight-blue/40"}`}>
                  {formatHora(m.creado_en)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={finRef} />
      </main>

      <div className="shrink-0 bg-white border-t border-[#EDEAF8] px-4 py-3 flex items-center gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleEnviar();
            }
          }}
          placeholder="Escribí un mensaje..."
          className="flex-1 bg-[#F5F2FA] rounded-2xl px-4 py-3 text-[14px] text-festiva-midnight-blue placeholder:text-festiva-midnight-blue/40 outline-none"
        />
        <button
          onClick={handleEnviar}
          disabled={!texto.trim() || enviando}
          className="w-11 h-11 rounded-2xl bg-festiva-electric-violet text-white flex items-center justify-center shrink-0 disabled:opacity-40"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
}