/* //Comentado mientras se trabaja
import { NextRequest, NextResponse } from "next/server";
import { getUser, updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest, response: NextResponse) {
  const protectedRoutesList = ["/perfil"],
  authRoutesList = ["/", "/login", "/registro"];
  const currentPath = new URL(request.url).pathname;

  const {
    data: { user },
  } = await getUser(request, response);
  if (protectedRoutesList.includes(currentPath) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authRoutesList.includes(currentPath) && user) {
    return NextResponse.redirect(new URL("/perfil", request.url));
  }
  await updateSession(request);
}

export const config = {
  matcher: ['/cliente/:path*', '/proveedor/:path*']
};
*/
