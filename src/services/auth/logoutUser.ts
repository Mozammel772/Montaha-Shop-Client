"use server";

import { deleteCookie } from "./tokenHandlers";

export const logoutUser = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
  } catch (error) {
    console.error(error);
  }

  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
};

// "use server";

// import { deleteCookie } from "./tokenHandlers";

// export const logoutUser = async () => {
//   // ✅ backend call নেই — শুধু cookie clear
//   await deleteCookie("accessToken");
//   await deleteCookie("refreshToken");
// };
