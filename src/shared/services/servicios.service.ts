import { apiClient } from "@/lib/api/api-client";
import { ServiciosPaginados } from "@/shared/types/servicio.types";

export async function obtenerServicios(page: number = 1, pageSize: number = 20) {
  return apiClient.get<ServiciosPaginados>(`/api/servicios?page=${page}&pageSize=${pageSize}`);
}