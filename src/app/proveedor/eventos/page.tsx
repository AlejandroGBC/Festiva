import MisPropuestasView from "@/modules/proveedor/evento/components/MisPropuestasView";
import { getPropuestas } from "@/modules/proveedor/evento/services/evento.service";

export default async function MisPropuestasPage() {
  try {
    const propuestas = await getPropuestas();
    return <MisPropuestasView propuestasIniciales={propuestas} error={null} />;
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : "No se pudieron cargar las propuestas";
    return <MisPropuestasView propuestasIniciales={[]} error={mensaje} />;
  }
}