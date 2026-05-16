// "use server";

// import type { UserInfo } from "@/types/user.interface";
// import { cookies } from "next/headers";
// import { logoutUser } from "./logoutUser";

// const BACKEND_API_URL =
//   process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

// export const getUserInfo = async (): Promise<UserInfo | null> => {
//   try {
//     const cookieStore = await cookies();

//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (!accessToken) {
//       return null;
//     }

//     const response = await fetch(`${BACKEND_API_URL}/user/me`, {
//       method: "GET",
//       cache: "no-store",
//       headers: {
//         Cookie: `accessToken=${accessToken}`,
//       },
//     });

//     // ✅ unauthorized
//     if (response.status === 401) {
//       await logoutUser();

//       return null;
//     }

//     if (!response.ok) {
//       return null;
//     }

//     const result = await response.json();

//     if (!result.success) {
//       return null;
//     }

//     return {
//       id: result.data?.id,
//       name: result.data?.name,
//       profilePicture: result.data?.profilePicture,
//       phone: result.data?.phone,
//       email: result.data?.email,
//       address: result.data?.address,
//       gender: result.data?.gender,
//       role: result.data?.userRole,
//       status: result.data?.userStatus,
//       createdAt: result.data?.createdAt,
//       updatedAt: result.data?.updatedAt,
//     };
//   } catch {
//     return null;
//   }
// };

// "use server";

// import type { UserInfo } from "@/types/user.interface";
// import { cookies } from "next/headers";
// import { cache } from "react"; // ✅ এটা add করুন
// import { logoutUser } from "./logoutUser";

// const BACKEND_API_URL =
//   process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

// const fetchUserInfo = cache(
//   async (accessToken: string): Promise<UserInfo | null> => {
//     const response = await fetch(`${BACKEND_API_URL}/user/me`, {
//       method: "GET",
//       cache: "no-store",
//       headers: {
//         Cookie: `accessToken=${accessToken}`,
//       },
//     });

//     if (response.status === 401) {
//       await logoutUser();
//       return null;
//     }

//     if (!response.ok) return null;

//     const result = await response.json();
//     if (!result.success) return null;

//     return {
//       id: result.data?.id,
//       name: result.data?.name,
//       profilePicture: result.data?.profilePicture,
//       phone: result.data?.phone,
//       email: result.data?.email,
//       address: result.data?.address,
//       gender: result.data?.gender,
//       role: result.data?.userRole,
//       status: result.data?.userStatus,
//       createdAt: result.data?.createdAt,
//       updatedAt: result.data?.updatedAt,
//     };
//   },
// );

// export const getUserInfo = async (): Promise<UserInfo | null> => {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (!accessToken) return null;

//     return await fetchUserInfo(accessToken); // ✅ same request-এ cache হবে
//   } catch {
//     return null;
//   }
// };

"use server";

import { serverFetch } from "@/lib/server-fetch";
import type { UserInfo } from "@/types/user.interface";
import { cache } from "react";
import { logoutUser } from "./logoutUser";

const fetchUserInfo = cache(async (): Promise<UserInfo | null> => {
  const response = await serverFetch.get("/user/me", {
    cache: "no-store",
  });

  if (response.status === 401) {
    await logoutUser();
    return null;
  }

  if (!response.ok) return null;

  const result = await response.json();

  if (!result.success) return null;

  return {
    id: result.data?.id,
    name: result.data?.name,
    profilePicture: result.data?.profilePicture,
    phone: result.data?.phone,
    email: result.data?.email,
    address: result.data?.address,
    gender: result.data?.gender,
    role: result.data?.userRole,
    status: result.data?.userStatus,
    createdAt: result.data?.createdAt,
    updatedAt: result.data?.updatedAt,
  };
});

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    return await fetchUserInfo();
  } catch {
    return null;
  }
};
