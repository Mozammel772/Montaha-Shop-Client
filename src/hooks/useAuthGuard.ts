"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      window.location.href = "/";
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [router]);
};
