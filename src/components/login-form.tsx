"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginUser } from "@/services/auth/loginUser";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

export function LoginForm({
  redirect,
  className,
  ...props
}: {
  redirect?: string;
} & React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // ✅ inputs
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isResetting, startTransition] = useTransition();

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
    }

    if (state.success) {
      toast.success(state.message || "Login successful");

      startTransition(() => {
        setPhone("");
        setPassword("");
        setResetKey((p) => p + 1);
      });
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          {/* 📲 PHONE */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

            <div className="flex">
              {/* +880 prefix */}
              <div className="flex items-center px-2 border border-r-0 rounded-l-md bg-gray-100 text-gray-600">
                +880
              </div>

              {/* input */}
              <Input
                id="phone"
                type="text"
                placeholder="01XXXXXXXXX"
                className="rounded-l-none"
                value={phone}
                autoComplete="phone"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                }}
              />
            </div>

            {/* hidden full phone */}
            <input type="hidden" name="phone" value={`+880${phone}`} />

            <InputFieldError
              field="phone"
              state={state}
              key={`phone-${resetKey}`}
            />
          </Field>

          {/* 🔐 PASSWORD */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="pr-10"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <InputFieldError
              field="password"
              state={state}
              key={`password-${resetKey}`}
            />
          </Field>

          {/* Forgot password */}
          <div className="flex justify-start">
            <Link
              href="#"
              className="text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* BUTTON */}
          <Field className="space-y-1.5">
            <Button type="submit" disabled={isPending || isResetting}>
              {isPending ? "Logging..." : "Login"}
            </Button>

            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
