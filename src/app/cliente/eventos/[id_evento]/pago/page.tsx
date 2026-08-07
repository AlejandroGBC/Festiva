import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id_evento: string }>;
}

// Esta ruta ya no se usa directamente.
// El flujo de pago va por /pago/[id_contratacion] (ver subdirectorio).
export default async function PagoIndexPage({ params }: PageProps) {
  const { id_evento } = await params;
  redirect(`/cliente/eventos/${id_evento}`);
}