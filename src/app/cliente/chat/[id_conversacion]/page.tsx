/**
 * Ubicación real:
 *   src/app/cliente/chat/[id_conversacion]/page.tsx
 */

import { notFound } from "next/navigation";

import { getConversacionDetalle } from "@/modules/cliente/chat/services/conversacion-detalle.service";
import ConversacionView from "@/modules/cliente/chat/components/ConversacionView";

interface ConversacionPageProps {
  params: Promise<{ id_conversacion: string }>;
}

export default async function ConversacionPage({ params }: ConversacionPageProps) {
  const { id_conversacion } = await params;
  const conversacion = await getConversacionDetalle(id_conversacion);

  if (!conversacion) notFound();

  return <ConversacionView conversacion={conversacion} />;
}