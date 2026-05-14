import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { verifyResetPasswordToken } from "./lib/jwtHanlders";
import { getNewAccessToken } from "./services/auth/auth.service";

const routeAccessMap: Record<string, UserRole[]> = {
  ADMIN: ["SUPER_ADMIN", "ADMIN"],
  MODERATOR: ["MODERATOR"],
  USER: ["USER"],
};

// ✅ skip routes — এগুলোতে কোনো check নেই
const SKIP_ROUTES = [
  "/session-expired",
  "/login",
  "/register",
  "/forgot-password",
  "/",
];

const clearCookiesAndRedirect = (url: string, request: NextRequest) => {
  const response = NextResponse.redirect(new URL(url, request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ এই routes এ কোনো check করবে না
  if (SKIP_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value || null;
  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      if (typeof verifiedToken === "string") {
        return clearCookiesAndRedirect(
          "/session-expired?reason=expired",
          request,
        );
      }

      userRole = verifiedToken.role;
    } catch {
      // token expired → refresh try
      const tokenRefreshResult = await getNewAccessToken();
      if (tokenRefreshResult?.tokenRefreshed) {
        return NextResponse.next();
      }
      // refresh ব্যর্থ → session expired modal
      return clearCookiesAndRedirect(
        "/session-expired?reason=expired",
        request,
      );
    }
  }

  const routerOwner = getRouteOwner(pathname);

  // ✅ protected route এ token নেই → login
  if (routerOwner !== null && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ reset-password handle
  if (pathname === "/reset-password") {
    const phone = request.nextUrl.searchParams.get("phone");
    const token = request.nextUrl.searchParams.get("token");
    if (phone && token) {
      try {
        const verifiedToken = await verifyResetPasswordToken(token);
        if (!verifiedToken.success) {
          return NextResponse.redirect(
            new URL("/forgot-password?error=expired-link", request.url),
          );
        }
        if (verifiedToken.payload!.phone !== phone) {
          return NextResponse.redirect(
            new URL("/forgot-password?error=invalid-link", request.url),
          );
        }
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(
          new URL("/forgot-password?error=expired-link", request.url),
        );
      }
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ public route — check দরকার নেই
  if (routerOwner === null) return NextResponse.next();

  // ✅ logged in user auth route এ গেলে dashboard এ পাঠাও
  if (accessToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }

  // ✅ COMMON route — login থাকলেই হবে
  if (routerOwner === "COMMON") return NextResponse.next();

  // ✅ role check — mismatch হলে session expired modal
  const allowedRoles = routeAccessMap[routerOwner] ?? [];
  if (!allowedRoles.includes(userRole as UserRole)) {
    return clearCookiesAndRedirect("/session-expired?reason=role", request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
