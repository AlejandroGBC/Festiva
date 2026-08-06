import EnviarPropuestaView from "@/modules/proveedor/buscar/components/EnviarPropuestaView";
import { getEventoParaPropuesta } from "@/modules/proveedor/buscar/service/propuesta.service";
import { notFound } from "next/navigation";

interface EnviarPropuestaPageProps {
  params: Promise<{ id: string }>;
}

export default async function EnviarPropuestaPage({ params }: EnviarPropuestaPageProps) {
  const { id } = await params;

  try {
    const evento = await getEventoParaPropuesta(id);
    return <EnviarPropuestaView evento={evento} />;
  } catch {
    notFound();
  }
}