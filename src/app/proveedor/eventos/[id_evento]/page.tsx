import PropuestaDetalleView from "@/modules/proveedor/evento/components/PropuestaDetalleView";
import { getPropuestaDetalle } from "@/modules/proveedor/evento/services/evento.service";
import { notFound } from "next/navigation";


interface PropuestaDetallePageProps {
  params: Promise<{ id_evento: string }>;
}

export default async function PropuestaDetallePage({ params }: PropuestaDetallePageProps) {
  const { id_evento } = await params;

  try {
    const propuesta = await getPropuestaDetalle(id_evento);
    return <PropuestaDetalleView propuesta={propuesta} />;
  } catch {
    notFound();
  }
}