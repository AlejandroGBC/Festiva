import { apiClient } from "@/lib/api/api-client";
import { LoginPayload } from "../types/login.types";
import { UsuarioSesion } from "@/shared/types/auth.types";

export async function iniciarSesion(payload: LoginPayload) {
  return apiClient.post<UsuarioSesion>("/api/auth/login", payload);
}