/**
 * Ubicación:
 *   src/app/cliente/eventos/page.tsx
 *
 * Server Component — hace el fetch directo del service (sin hook) y le
 * pasa los datos ya cargados a la vista cliente, que solo maneja UI.
 */

import { getEventosCliente } from "@/modules/cliente/anuncio/services/eventos-list.service";
import MisEventosView from "@/modules/cliente/anuncio/components/MisEventosView";

export default async function MisEventosPage() {
  const eventos = await getEventosCliente();
  return <MisEventosView eventos={eventos} />;
}