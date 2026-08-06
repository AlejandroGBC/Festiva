import { cookies, headers } from "next/headers";
import { ApiResponse } from "@/shared/types/api.types";

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

async function serverRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = await getBaseUrl();
  const cookieStore = await cookies();

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), // sin esto, el endpoint ve la request como no autenticada
      ...options?.headers,
    },
    cache: "no-store",
  });

  const body: ApiResponse<T> = await res.json();

  if (!body.success || body.data === null) {
    throw new Error(body.error ?? "Ocurrió un error inesperado");
  }

  return body.data;
}

export const serverApiClient = {
  get: <T>(path: string) => serverRequest<T>(path, { method: "GET" }),
};