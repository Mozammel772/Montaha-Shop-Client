// import jwt, { JwtPayload } from "jsonwebtoken";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import {
//   getDefaultDashboardRoute,
//   getRouteOwner,
//   isAuthRoute,
//   UserRole,
// } from "./lib/auth-utils";
// import { verifyResetPasswordToken } from "./lib/jwtHanlders";
// import { getNewAccessToken } from "./services/auth/auth.service";

// const routeAccessMap: Record<string, UserRole[]> = {
//   ADMIN: ["SUPER_ADMIN", "ADMIN"],
//   MODERATOR: ["MODERATOR"],
//   USER: ["USER"],
// };

// // ✅ skip routes — এগুলোতে কোনো check নেই
// const SKIP_ROUTES = [
//   "/session-expired",
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/",
// ];

// const clearCookiesAndRedirect = (url: string, request: NextRequest) => {
//   const response = NextResponse.redirect(new URL(url, request.url));
//   response.cookies.delete("accessToken");
//   response.cookies.delete("refreshToken");
//   return response;
// };

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // ✅ এই routes এ কোনো check করবে না
//   if (SKIP_ROUTES.some((r) => pathname.startsWith(r))) {
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value || null;
//   let userRole: UserRole | null = null;

//   if (accessToken) {
//     try {
//       const verifiedToken = jwt.verify(
//         accessToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       ) as JwtPayload;

//       if (typeof verifiedToken === "string") {
//         return clearCookiesAndRedirect(
//           "/session-expired?reason=expired",
//           request,
//         );
//       }

//       userRole = verifiedToken.role;
//     } catch {
//       // token expired → refresh try
//       const tokenRefreshResult = await getNewAccessToken();
//       if (tokenRefreshResult?.tokenRefreshed) {
//         return NextResponse.next();
//       }
//       // refresh ব্যর্থ → session expired modal
//       return clearCookiesAndRedirect(
//         "/session-expired?reason=expired",
//         request,
//       );
//     }
//   }

//   const routerOwner = getRouteOwner(pathname);

//   // ✅ protected route এ token নেই → login
//   if (routerOwner !== null && !accessToken) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // ✅ reset-password handle
//   if (pathname === "/reset-password") {
//     const phone = request.nextUrl.searchParams.get("phone");
//     const token = request.nextUrl.searchParams.get("token");
//     if (phone && token) {
//       try {
//         const verifiedToken = await verifyResetPasswordToken(token);
//         if (!verifiedToken.success) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=expired-link", request.url),
//           );
//         }
//         if (verifiedToken.payload!.phone !== phone) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=invalid-link", request.url),
//           );
//         }
//         return NextResponse.next();
//       } catch {
//         return NextResponse.redirect(
//           new URL("/forgot-password?error=expired-link", request.url),
//         );
//       }
//     }
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // ✅ public route — check দরকার নেই
//   if (routerOwner === null) return NextResponse.next();

//   // ✅ logged in user auth route এ গেলে dashboard এ পাঠাও
//   if (accessToken && isAuthRoute(pathname)) {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//     );
//   }

//   // ✅ COMMON route — login থাকলেই হবে
//   if (routerOwner === "COMMON") return NextResponse.next();

//   // ✅ role check — mismatch হলে session expired modal
//   const allowedRoles = routeAccessMap[routerOwner] ?? [];
//   if (!allowedRoles.includes(userRole as UserRole)) {
//     return clearCookiesAndRedirect("/session-expired?reason=role", request);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
//   ],
// };

// import jwt, { JwtPayload } from "jsonwebtoken";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import {
//   getDefaultDashboardRoute,
//   getRouteOwner,
//   isAuthRoute,
//   UserRole,
// } from "./lib/auth-utils";
// import { verifyResetPasswordToken } from "./lib/jwtHanlders";

// const BACKEND_API_URL =
//   process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

// const routeAccessMap: Record<string, UserRole[]> = {
//   ADMIN: ["SUPER_ADMIN", "ADMIN"],
//   MODERATOR: ["MODERATOR"],
//   USER: ["USER"],
// };

// // এই routes এ কোনো check নেই
// const SKIP_ROUTES = [
//   "/session-expired",
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/",
// ];

// const clearCookiesAndRedirect = (url: string, request: NextRequest) => {
//   const response = NextResponse.redirect(new URL(url, request.url));
//   response.cookies.delete("accessToken");
//   response.cookies.delete("refreshToken");
//   return response;
// };

// // Middleware edge runtime-এ directly fetch করে token refresh
// const tryRefreshToken = async (
//   refreshToken: string,
// ): Promise<{ accessToken: string; role: UserRole } | null> => {
//   try {
//     const res = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
//       method: "POST",
//       headers: {
//         Cookie: `refreshToken=${refreshToken}`,
//       },
//     });

//     if (!res.ok) return null;

//     // Set-Cookie header থেকে নতুন accessToken নাও
//     const setCookieHeader = res.headers.get("set-cookie");
//     if (!setCookieHeader) return null;

//     // accessToken parse করো
//     const match = setCookieHeader.match(/accessToken=([^;]+)/);
//     if (!match) return null;

//     const newAccessToken = match[1];

//     // নতুন token থেকে role বের করো
//     const decoded = jwt.verify(
//       newAccessToken,
//       process.env.JWT_ACCESS_SECRET as string,
//     ) as JwtPayload;

//     return { accessToken: newAccessToken, role: decoded.role };
//   } catch {
//     return null;
//   }
// };

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // এই routes এ কোনো check করবে না
//   if (SKIP_ROUTES.some((r) => pathname.startsWith(r))) {
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value || null;
//   const refreshToken = request.cookies.get("refreshToken")?.value || null;
//   let userRole: UserRole | null = null;

//   if (accessToken) {
//     try {
//       // locally JWT verify — no DB call, no "use server"
//       const verifiedToken = jwt.verify(
//         accessToken,
//         process.env.JWT_ACCESS_SECRET as string,
//       ) as JwtPayload;

//       userRole = verifiedToken.role;
//     } catch {
//       // accessToken expire → refreshToken দিয়ে চেষ্টা করো
//       if (!refreshToken) {
//         return clearCookiesAndRedirect(
//           "/session-expired?reason=expired",
//           request,
//         );
//       }

//       const refreshResult = await tryRefreshToken(refreshToken);
//       if (!refreshResult) {
//         return clearCookiesAndRedirect(
//           "/session-expired?reason=expired",
//           request,
//         );
//       }

//       // নতুন token set করে next() — user কিছু বুঝবে না
//       userRole = refreshResult.role;
//       const response = NextResponse.next();
//       response.cookies.set("accessToken", refreshResult.accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         path: "/",
//       });
//       return response;
//     }
//   }

//   const routerOwner = getRouteOwner(pathname);

//   // protected route এ token নেই → login
//   if (routerOwner !== null && !accessToken) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // reset-password handle
//   if (pathname === "/reset-password") {
//     const phone = request.nextUrl.searchParams.get("phone");
//     const token = request.nextUrl.searchParams.get("token");
//     if (phone && token) {
//       try {
//         const verifiedToken = await verifyResetPasswordToken(token);
//         if (!verifiedToken.success) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=expired-link", request.url),
//           );
//         }
//         if (verifiedToken.payload!.phone !== phone) {
//           return NextResponse.redirect(
//             new URL("/forgot-password?error=invalid-link", request.url),
//           );
//         }
//         return NextResponse.next();
//       } catch {
//         return NextResponse.redirect(
//           new URL("/forgot-password?error=expired-link", request.url),
//         );
//       }
//     }
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // public route — check দরকার নেই
//   if (routerOwner === null) return NextResponse.next();

//   // logged in user auth route এ গেলে dashboard এ পাঠাও
//   if (accessToken && isAuthRoute(pathname)) {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
//     );
//   }

//   // COMMON route — login থাকলেই হবে
//   if (routerOwner === "COMMON") return NextResponse.next();

//   // role check — JWT-এ যে role আছে সেটা দিয়ে check
//   // tokenVersion mismatch হলে backend 401 দেবে → AuthGuard সেটা handle করবে
//   const allowedRoles = routeAccessMap[routerOwner] ?? [];
//   if (!allowedRoles.includes(userRole as UserRole)) {
//     return clearCookiesAndRedirect("/session-expired?reason=role", request);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
//   ],
// };

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

const routeAccessMap: Record<string, UserRole[]> = {
  ADMIN: ["SUPER_ADMIN", "ADMIN"],
  MODERATOR: ["MODERATOR"],
  USER: ["USER"],
};

// ✅ public routes
const SKIP_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/session-expired",
];

const clearCookiesAndRedirect = (url: string, request: NextRequest) => {
  const response = NextResponse.redirect(new URL(url, request.url));

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ FIXED PUBLIC ROUTE CHECK
  const isPublicRoute = SKIP_ROUTES.some((route) => {
    // ✅ exact match
    if (pathname === route) {
      return true;
    }

    // ✅ nested routes except "/"
    if (route !== "/" && pathname.startsWith(`${route}/`)) {
      return true;
    }

    return false;
  });

  // ✅ skip public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: UserRole | null = null;

  // ✅ protected route but no token
  const routeOwner = getRouteOwner(pathname);

  if (routeOwner !== null && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // ✅ verify access token
  if (accessToken) {
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      // ✅ invalid payload
      if (typeof verifiedToken === "string") {
        return clearCookiesAndRedirect("/login", request);
      }

      userRole = verifiedToken.role;
    } catch {
      // ✅ invalid / expired token
      return clearCookiesAndRedirect("/login", request);
    }
  }

  // ✅ reset password route
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

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // ✅ already logged in user auth route
  if (accessToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }

  // ✅ common authenticated route
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // ✅ role based protection
  const allowedRoles = routeAccessMap[routeOwner] ?? [];

  if (!allowedRoles.includes(userRole as UserRole)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
