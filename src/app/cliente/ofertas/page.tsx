/**
 * Ubicación:
 *   src/app/cliente/ofertas/page.tsx
 *
 * Server Component — hace el fetch directo del service (sin hook).
 */

import { getOfertasRecibidas } from "@/modules/cliente/ofertas/services/ofertas-list.service";
import OfertasRecibidasView from "@/modules/cliente/ofertas/components/OfertasRecibidasView";

export default async function OfertasRecibidasPage() {
  const { eventos, ofertas } = await getOfertasRecibidas();
  return <OfertasRecibidasView eventos={eventos} ofertas={ofertas} />;
}