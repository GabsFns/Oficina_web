import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const access = request.cookies.get("oficina_access")?.value;

  const { pathname } = request.nextUrl;

  // bloquear auth se não passou pelo acesso
  if (pathname.startsWith("/auth") && !access) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // proteger dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      await verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*"
  ],
};