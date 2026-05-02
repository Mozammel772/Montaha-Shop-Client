/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const registerUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    console.log(payload);
  } catch (error: any) {}
};

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
