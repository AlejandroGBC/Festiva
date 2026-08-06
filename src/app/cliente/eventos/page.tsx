import { getEventosCliente } from "@/modules/cliente/anuncio/services/eventos-list.service";
import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import MisEventosView from "@/modules/cliente/anuncio/components/MisEventosView";

export default async function MisEventosPage() {
  const [eventos, notificacionesNuevas] = await Promise.all([
    getEventosCliente(),
    contarNotificacionesNuevas(),
  ]);
  return (
    <MisEventosView
      eventos={eventos}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
    />
  );
}