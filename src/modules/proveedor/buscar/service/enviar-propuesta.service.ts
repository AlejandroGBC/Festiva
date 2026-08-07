import { apiClient } from "@/lib/api/api-client";
import type { EnviarPropuestaPayload } from "@/shared/types/enviar-propuesta-proveedor.types";

export async function enviarPropuesta(payload: EnviarPropuestaPayload) {
  return apiClient.post<{ id_evento: string }>("/api/proveedor/propuestas/ofertas", payload);
}