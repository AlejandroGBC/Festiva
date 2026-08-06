/**
 * Ubicación real:
 *   src/app/cliente/chat/iniciar/[id_evento]/[id_proveedor]/page.tsx
 *
 * No renderiza nada — busca o crea la conversación y redirige a la
 * página real. Es a esto a lo que deberían apuntar los botones
 * "Chatear" que hoy van a WhatsApp (EventoDetalleView, OfertaDetalleView),
 * cuando decidas reemplazarlos.
 */

import { redirect, notFound } from "next/navigation";

import { buscarOCrearConversacion } from "@/modules/cliente/chat/services/iniciar-conversacion.service";

interface IniciarChatPageProps {
  params: Promise<{ id_evento: string; id_proveedor: string }>;
}

export default async function IniciarChatPage({ params }: IniciarChatPageProps) {
  const { id_evento, id_proveedor } = await params;
  const idConversacion = await buscarOCrearConversacion(id_evento, id_proveedor);

  if (!idConversacion) notFound();

  redirect(`/cliente/chat/${idConversacion}`);
}