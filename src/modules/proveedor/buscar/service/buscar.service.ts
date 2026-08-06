import { serverApiClient } from "@/lib/api/server-api-client";
import type { EventoDisponible } from "@/shared/types/buscar-proveedor.types";

export async function getEventosDisponibles(): Promise<EventoDisponible[]> {
  return serverApiClient.get<EventoDisponible[]>("/api/proveedor/eventos-disponibles");
}