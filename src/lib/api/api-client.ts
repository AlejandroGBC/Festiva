
import { ApiResponse } from "@/shared/types/api.types";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  const body: ApiResponse<T> = await res.json();

  if (!body.success || body.data === null) {
    throw new Error(body.error ?? "Ocurrió un error inesperado");
  }

  return body.data;
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),
  post: <T>(url: string, payload: unknown) =>
    request<T>(url, { method: "POST", body: JSON.stringify(payload) }),
  put: <T>(url: string, payload: unknown) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(payload) }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};