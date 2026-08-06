import { serverApiClient } from "@/lib/api/server-api-client";
import type { EventoParaPropuesta } from "@/shared/types/enviar-propuesta-proveedor.types";

export async function getEventoParaPropuesta(idEvento: string): Promise<EventoParaPropuesta> {
  return serverApiClient.get<EventoParaPropuesta>(`/api/proveedor/eventos-disponibles/${idEvento}`);
}