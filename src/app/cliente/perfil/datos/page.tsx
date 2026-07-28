/**
 * Ubicación:
 *   src/app/cliente/perfil/datos/page.tsx
 */

import { redirect } from "next/navigation";
import { getPerfilCliente } from "@/modules/cliente/perfil/services/perfil.service";
import DatosPersonalesView from "@/modules/cliente/perfil/components/DatosPersonalesView";

export default async function DatosPersonalesPage() {
  const perfil = await getPerfilCliente();
  if (!perfil) redirect("/auth/login");
  return <DatosPersonalesView perfil={perfil} />;
}