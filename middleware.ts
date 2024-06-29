import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("dToken");

  if (!authToken?.value) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/auth/onboard/:path*",
    "/auth/verify-email/:path*",
    "/dashboard/:path*",
  ],
};
