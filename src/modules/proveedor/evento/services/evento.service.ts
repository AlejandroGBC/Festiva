import { serverApiClient } from "@/lib/api/server-api-client";
import { Propuesta, PropuestaDetalle } from "@/shared/types/propuestas-proveedor.types";

export async function getPropuestas(): Promise<Propuesta[]> {
  return serverApiClient.get<Propuesta[]>("/api/proveedor/propuestas");
}

export async function getPropuestaDetalle(idEvento: string): Promise<PropuestaDetalle> {
  return serverApiClient.get<PropuestaDetalle>(`/api/proveedor/propuestas/${idEvento}`);
}