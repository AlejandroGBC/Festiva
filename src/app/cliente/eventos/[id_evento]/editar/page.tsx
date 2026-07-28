/**
 * Ubicación:
 *   src/app/cliente/eventos/[id_evento]/editar/page.tsx
 */

import { notFound } from "next/navigation";
import { getEventoDetalle } from "@/modules/cliente/anuncio/services/evento-detalle.service";
import EditarEventoView from "@/modules/cliente/anuncio/components/EditarEventoView";

interface PageProps {
  params: { id_evento: string };
}

export default async function EditarEventoPage({ params }: PageProps) {
  const evento = await getEventoDetalle(params.id_evento);

  if (!evento) {
    notFound();
  }

  return <EditarEventoView evento={evento} />;
}