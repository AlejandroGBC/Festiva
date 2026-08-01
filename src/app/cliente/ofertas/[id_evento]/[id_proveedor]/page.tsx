/**
 * Ubicación real:
 *   src/app/cliente/ofertas/[id_evento]/[id_proveedor]/page.tsx
 */

import { notFound } from "next/navigation";

import { getOfertaDetalle } from "@/modules/cliente/ofertas/services/oferta-detalle.service";
import OfertaDetalleView from "@/modules/cliente/ofertas/components/OfertaDetalleView";

interface OfertaDetallePageProps {
  params: Promise<{ id_evento: string; id_proveedor: string }>;
}

export default async function OfertaDetallePage({ params }: OfertaDetallePageProps) {
  const { id_evento, id_proveedor } = await params;
  const oferta = await getOfertaDetalle(id_evento, id_proveedor);

  if (!oferta) notFound();

  return <OfertaDetalleView oferta={oferta} />;
}