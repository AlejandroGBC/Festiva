import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { buscarOCrearConversacion } from "@/modules/shared/chat/services/chat.service";

interface IniciarChatPageProps {
  params: Promise<{ id_evento: string }>;
}

export default async function IniciarChatPage({ params }: IniciarChatPageProps) {
  const { id_evento } = await params;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const idConversacion = await buscarOCrearConversacion(id_evento, user.id, "proveedor");

  if (!idConversacion) notFound();

  redirect(`/proveedor/chat/${idConversacion}`);
}