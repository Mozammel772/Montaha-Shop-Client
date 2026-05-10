/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || "/";

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const payload = {
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    /* ================= VALIDATION ================= */
    const validated = zodValidator(payload, loginValidationZodSchema);

    if (!validated.success) {
      return validated;
    }

    /* ================= LOGIN API ================= */
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validated.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.message || "Login failed");
    }

    /* ================= GET COOKIES ================= */
    const setCookieHeaders = res.headers.getSetCookie();

    if (!setCookieHeaders?.length) {
      throw new Error("No Set-Cookie header found");
    }

    setCookieHeaders.forEach((cookie: string) => {
      const parsedCookie = parse(cookie);

      if (parsedCookie["accessToken"]) {
        accessTokenObject = parsedCookie;
      }

      if (parsedCookie["refreshToken"]) {
        refreshTokenObject = parsedCookie;
      }
    });

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    /* ================= SAVE ACCESS TOKEN ================= */
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    /* ================= SAVE REFRESH TOKEN ================= */
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject["Max-Age"]) || 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    return {
      success: true,
      message: "Login successful",
      redirectTo: redirectTo.toString(),
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login Failed. ফোন বা password ভুল হতে পারে।",
    };
  }
};
