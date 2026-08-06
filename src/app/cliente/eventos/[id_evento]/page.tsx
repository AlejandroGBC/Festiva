import { notFound } from "next/navigation";
import { getEventoDetalle } from "@/modules/cliente/anuncio/services/evento-detalle.service";
import EventoDetalleView from "@/modules/cliente/anuncio/components/EventoDetalleView";

interface PageProps {
  params: { id_evento: string };
}

export default async function EventoDetallePage({ params }: PageProps) {
  const evento = await getEventoDetalle(params.id_evento);

  if (!evento) {
    notFound();
  }

  return <EventoDetalleView evento={evento} />;
}