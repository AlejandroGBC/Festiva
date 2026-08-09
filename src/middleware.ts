import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routeGeneratorOverLogin } from "./shared/utils/routeGeneratosOverLogin";
const PUBLIC_PATHS = ["/", "/auth", "/auth/login", "/auth/registro", "/api/servicios", "/legal"];

function esRutaPublica(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function obtenerRutaSegura(request: NextRequest, rol: "cliente" | "proveedor") {
  const referer = request.headers.get("referer");
  const fallback = routeGeneratorOverLogin(rol);

  if (!referer) return fallback;

  try {
    const refererUrl = new URL(referer);

    // Solo confiar en referers del mismo origen (evita redirigir a otro sitio)
    if (refererUrl.origin !== request.nextUrl.origin) return fallback;

    const refererPath = refererUrl.pathname;

    // Evitar loop: si el referer es la misma ruta que rechazamos, o pertenece a la zona del OTRO rol, no confiamos en él — usamos el fallback.
    const perteneceAOtroRol =
      (refererPath.startsWith("/cliente") && rol !== "cliente") ||
      (refererPath.startsWith("/proveedor") && rol !== "proveedor");

    if (refererPath === request.nextUrl.pathname || perteneceAOtroRol) {
      return fallback;
    }

    return refererPath;
  } catch {
    return fallback;
  }
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!user && !esRutaPublica(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user) {
    const rol = (user.user_metadata?.rol as "cliente" | "proveedor") ?? "cliente";

    if (
      (pathname.startsWith("/cliente") && rol !== "cliente") ||
      (pathname.startsWith("/proveedor") && rol !== "proveedor")
    ) {
      const rutaSegura = obtenerRutaSegura(request, rol);
      return NextResponse.redirect(new URL(rutaSegura, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};