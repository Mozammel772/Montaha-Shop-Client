"use client";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { logoutUser } from "@/services/auth/logoutUser";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/session-expired",
];

export const AuthGuard = () => {
  const pathname = usePathname();
  const isRedirecting = useRef(false);

  useEffect(() => {
    const originalFetch = window.fetch;
    const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (!isPublic && !isRedirecting.current) {
        if (response.status === 401) {
          isRedirecting.current = true;
          await logoutUser();
          window.location.href = "/session-expired?reason=expired";
        } else if (response.status === 403) {
          isRedirecting.current = true;
          await logoutUser();
          const clone = response.clone();
          const data = await clone.json().catch(() => ({}));
          const msg = data?.message?.toLowerCase() ?? "";
          const reason = msg.includes("suspend")
            ? "suspended"
            : msg.includes("delet")
              ? "deleted"
              : "inactive";
          window.location.href = `/session-expired?reason=${reason}`;
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [pathname]);

  // ✅ প্রতিটি route change এ session check — sessionChecked নেই
  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
    if (isPublic || isRedirecting.current) return;

    getUserInfo().then((userInfo) => {
      if (isRedirecting.current) return;

      if (userInfo === "UNAUTHORIZED") {
        // ✅ role change / session expired
        isRedirecting.current = true;
        logoutUser().then(() => {
          window.location.href = "/session-expired?reason=role";
        });
      } else if (!userInfo) {
        // ✅ login নেই
        isRedirecting.current = true;
        window.location.href = "/login";
      }
    });
  }, [pathname]); // ✅ pathname change হলেই check হবে

  return null;
};
