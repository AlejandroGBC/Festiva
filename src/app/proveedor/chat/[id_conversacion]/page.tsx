import { notFound } from "next/navigation";
import ConversacionView from "@/modules/shared/chat/components/ConversacionView";
import { getConversacionDetalle } from "@/modules/shared/chat/services/chat.service";

interface ConversacionPageProps {
  params: Promise<{ id_conversacion: string }>;
}

export default async function ConversacionPage({ params }: ConversacionPageProps) {
  const { id_conversacion } = await params;
  const conversacion = await getConversacionDetalle(id_conversacion);

  if (!conversacion) notFound();

  return <ConversacionView conversacion={conversacion} />;
}