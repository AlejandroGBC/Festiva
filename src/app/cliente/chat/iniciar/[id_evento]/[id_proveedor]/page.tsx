import { buscarOCrearConversacion } from "@/modules/shared/chat/services/chat.service";
import { notFound, redirect } from "next/navigation";

interface IniciarChatPageProps {
  params: Promise<{ id_evento: string; id_proveedor: string }>;
}

export default async function IniciarChatPage({ params }: IniciarChatPageProps) {
  const { id_evento, id_proveedor } = await params;
  const idConversacion = await buscarOCrearConversacion(id_evento, id_proveedor, "cliente");

  if (!idConversacion) notFound();

  redirect(`/cliente/chat/${idConversacion}`);
}