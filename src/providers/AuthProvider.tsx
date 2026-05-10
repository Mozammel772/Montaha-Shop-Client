"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ================= */

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_API_URL}/user/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      // ❌ unauthorized
      if (!res.ok) {
        setUser(null);
        return;
      }

      const result = await res.json();

      if (result?.success) {
        setUser({
          id: result.data?.id,
          name: result.data?.name || "Unknown User",
          phone: result.data?.phone || "",
          role: result.data?.userRole || "USER",
          status: result.data?.status,
          createdAt: result.data?.createdAt,
          updatedAt: result.data?.updatedAt,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("LOAD USER ERROR:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    setTimeout(() => {
      loadUser();
    }, 0);
  }, [loadUser]);

  /* ================= LOGOUT ================= */

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  /* ================= CONTEXT VALUE ================= */

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      loadUser,
    }),
    [user, loading, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
