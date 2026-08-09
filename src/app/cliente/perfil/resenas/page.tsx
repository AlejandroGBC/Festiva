import { redirect } from "next/navigation";
import { getMisResenas } from "@/modules/cliente/perfil/services/mis-resenas.service";
import MisResenasView from "@/modules/cliente/perfil/components/MisResenasView";

export const metadata = {
  title: "Festiva – Mis reseñas",
  description: "Historial de reseñas que escribiste a tus proveedores",
};

export default async function MisResenasPage() {
  const resenas = await getMisResenas();

  if (resenas === null) redirect("/auth/login");

  return <MisResenasView resenas={resenas} />;
}
