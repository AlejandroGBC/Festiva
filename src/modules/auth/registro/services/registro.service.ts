import { RegistroProveedorPayload } from "../types/registro.types";
import { apiClient } from "@/lib/api/api-client";
import { UsuarioSesion } from "@/shared/types/auth.types";

export async function registrarProveedor(payload: RegistroProveedorPayload) {
  return apiClient.post<UsuarioSesion & { requiereConfirmacionCorreo: boolean }>(
    "/api/auth/registro",
    payload
  );
}