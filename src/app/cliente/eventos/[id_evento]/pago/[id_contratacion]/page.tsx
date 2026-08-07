import { notFound } from "next/navigation";
import { getResumenPago } from "@/modules/cliente/pagos/services/resumen-pago.service";
import ConfirmarPagoView from "@/modules/cliente/pagos/components/ConfirmarPagoView";

interface PageProps {
  params: Promise<{ id_evento: string; id_contratacion: string }>;
}

export default async function ConfirmarPagoPage({ params }: PageProps) {
  const { id_contratacion } = await params;
  const resumen = await getResumenPago(id_contratacion);

  // null = no encontrado, ya pagado, o no autorizado
  if (!resumen) notFound();

  return <ConfirmarPagoView resumen={resumen} />;
}
