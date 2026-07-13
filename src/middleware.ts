import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = ["/", "/auth", "/auth/login", "/auth/registro", "/api/servicios"];

function esRutaPublica(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // No autenticado intentando entrar a una ruta protegida → a login
  if (!user && !esRutaPublica(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url)); // 👈 antes: "/login"
  }

  if (user) {
    const rol = (user.user_metadata?.rol as "cliente" | "proveedor") ?? "cliente";

    // Autenticado pero visitando login/registro → mandar a ver su perfil
    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/registro")) {
      return NextResponse.redirect(new URL(`/${rol}/perfil`, request.url));
    }

    // Autenticado como cliente intentando ver rutas de proveedor, o viceversa
    if (
      (pathname.startsWith("/cliente") && rol !== "cliente") ||
      (pathname.startsWith("/proveedor") && rol !== "proveedor")
    ) {
      return NextResponse.redirect(new URL(`/${rol}/perfil`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};