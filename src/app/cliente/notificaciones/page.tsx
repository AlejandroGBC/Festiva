/**
 * Ubicación:
 *   src/app/cliente/notificaciones/page.tsx
 */

import { getNotificaciones } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import NotificacionesView from "@/modules/cliente/notificaciones/components/NotificacionesView";

export default async function NotificacionesPage() {
  const notificaciones = await getNotificaciones();
  return <NotificacionesView notificaciones={notificaciones} />;
}