import { apiClient } from "@/lib/api/api-client";
import { LoginFormData } from "../types/login.types";
import { UsuarioSesion } from "@/shared/types/auth.types";

export async function iniciarSesion(payload: LoginFormData) {
  return apiClient.post<UsuarioSesion>("/api/auth/login", payload);
}