/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import { getCookie } from "./tokenHandlers";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getUserInfo = async (retries = 3): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      // ✅ token না পেলে retry করো
      if (retries > 0) {
        await delay(300);
        return getUserInfo(retries - 1);
      }
      return null;
    }

    const response = await serverFetch.get("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const result = await response.json();

    if (!result.success) {
      return null;
    }

    return {
      id: result.data?.id,
      name: result.data?.name || "Unknown User",
      phone: result.data?.phone || "",
      role: result.data?.userRole || "USER",
      status: result.data?.status,
      createdAt: result.data?.createdAt,
      updatedAt: result.data?.updatedAt,
    };
  } catch (error: any) {
    console.log("getUserInfo error:", error.message);

    // ✅ error হলেও retry করো
    if (retries > 0) {
      await delay(300);
      return getUserInfo(retries - 1);
    }

    return null;
  }
};
