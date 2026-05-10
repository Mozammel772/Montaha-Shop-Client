// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { registerUserValidationZodSchema } from "@/zod/auth.validation";
// import { loginUser } from "./loginUser";

// export const registerUser = async (
//   _currentState: any,
//   formData: any,
// ): Promise<any> => {
//   try {
//     const payload = {
//       name: formData.get("name"),
//       phone: formData.get("phone"),
//       password: formData.get("password"),
//       confirmPassword: formData.get("confirmPassword"),
//     };

//     if (
//       zodValidator(payload, registerUserValidationZodSchema).success === false
//     ) {
//       return zodValidator(payload, registerUserValidationZodSchema);
//     }

//     const validatedPayload: any = zodValidator(
//       payload,
//       registerUserValidationZodSchema,
//     ).data;
//     const registerData = {
//       name: validatedPayload.name,
//       phone: validatedPayload.phone,
//       password: validatedPayload.password,
//     };

//     const res = await serverFetch.post("/user/register", {
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(registerData),
//     });

//     const result = await res.json();

//     if (result.success) {
//       await loginUser(_currentState, formData);
//     }

//     return result;
//   } catch (error: any) {
//     // Re-throw NEXT_REDIRECT errors so Next.js can handle them
//     if (error?.digest?.startsWith("NEXT_REDIRECT")) {
//       throw error;
//     }
//     console.log(error);
//     return {
//       success: false,
//       message: `${process.env.NODE_ENV === "development" ? error.message : "Registration Failed. Please try again."}`,
//     };
//   }
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";

export const registerUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || "/";

    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    /* ================= VALIDATION ================= */
    const validated = zodValidator(payload, registerUserValidationZodSchema);
    if (!validated.success) {
      return validated;
    }

    const validatedData = validated.data as {
      name: string;
      phone: string;
      password: string;
      confirmPassword: string;
    };

    const registerData = {
      name: validatedData.name,
      phone: validatedData.phone,
      password: validatedData.password,
    };

    /* ================= REGISTER API ================= */
    const res = await serverFetch.post("/user/register", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.message || "Registration failed");
    }

    /* ================= AUTO LOGIN ================= */
    const loginRes = await serverFetch.post("/auth/login", {
      body: JSON.stringify({
        phone: validatedData.phone,
        password: validatedData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const loginResult = await loginRes.json();

    if (!loginRes.ok || !loginResult.success) {
      // Registration succeeded but login failed — redirect to login
      return {
        success: true,
        message: "Registration successful! Please log in.",
        redirectTo: "/login",
      };
    }

    /* ================= GET COOKIES ================= */
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const setCookieHeaders = loginRes.headers.getSetCookie();
    if (!setCookieHeaders?.length) {
      throw new Error("No Set-Cookie header found after login");
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
      message: "Registration successful! Welcome aboard.",
      redirectTo: redirectTo.toString(),
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
