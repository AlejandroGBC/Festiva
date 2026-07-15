/**
 * Ubicación:
 *   src/app/cliente/perfil/page.tsx
 */

import { redirect } from "next/navigation";
import { getPerfilCliente } from "@/modules/cliente/perfil/services/perfil.service";
import { contarNotificacionesNuevas } from "@/modules/cliente/notificaciones/services/notificaciones-list.service";
import PerfilClienteView from "@/modules/cliente/perfil/components/PerfilClienteView";

export default async function PerfilClientePage() {
  const [perfil, notificacionesNuevas] = await Promise.all([
    getPerfilCliente(),
    contarNotificacionesNuevas(),
  ]);

  if (!perfil) {
    redirect("/login");
  }

  return (
    <PerfilClienteView
      perfil={perfil}
      tieneNotificacionesNuevas={notificacionesNuevas > 0}
    />
  );
}