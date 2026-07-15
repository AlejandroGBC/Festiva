/**
 * Ubicación:
 *   src/app/cliente/perfil/page.tsx
 */

import { redirect } from "next/navigation";
import { getPerfilCliente } from "@/modules/cliente/perfil/services/perfil.service";
import PerfilClienteView from "@/modules/cliente/perfil/components/PerfilClienteView";

export default async function PerfilClientePage() {
  const perfil = await getPerfilCliente();

  if (!perfil) {
    redirect("/login");
  }

  return <PerfilClienteView perfil={perfil} />;
}