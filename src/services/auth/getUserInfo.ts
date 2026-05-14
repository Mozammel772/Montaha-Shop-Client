"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

// ✅ return type এ "UNAUTHORIZED" যোগ করো
export const getUserInfo = async (): Promise<
  UserInfo | null | "UNAUTHORIZED"
> => {
  try {
    const response = await serverFetch.get("/user/me", {
      cache: "no-store",
    });

    if (response.status === 401) {
      return "UNAUTHORIZED";
    }

    if (!response.ok) return null;

    const result = await response.json();
    if (!result.success) return null;

    return {
      id: result.data?.id,
      name: result.data?.name || "Unknown User",
      profilePicture: result.data?.profilePicture,
      phone: result.data?.phone || "",
      email: result.data?.email || "",
      address: result.data?.address || "",
      gender: result.data?.gender || "",
      role: result.data?.userRole || "USER",
      status: result.data?.userStatus,
      createdAt: result.data?.createdAt,
      updatedAt: result.data?.updatedAt,
    };
  } catch {
    return null;
  }
};
