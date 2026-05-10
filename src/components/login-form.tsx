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
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const [state, formAction, isPending] = useActionState(loginUser, null);

  const errorResetKey = JSON.stringify(state);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isResetting, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
      return;
    }

    const handleSuccess = async () => {
      if (!state.success) return;

      toast.success(state.message || "Login successful");

      window.dispatchEvent(new Event("userChanged"));
      window.location.href = state.redirectTo || "/";
    };

    handleSuccess();
  }, [state, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          {/* 📲 PHONE */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

            <div className="flex">
              <div className="flex items-center px-2 border border-r-0 rounded-l-md bg-gray-100 text-gray-600">
                +880
              </div>

              <Input
                id="phone"
                type="text"
                placeholder="01XXXXXXXXX"
                className="rounded-l-none"
                value={phone}
                autoComplete="tel"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                }}
              />
            </div>

            <input type="hidden" name="phone" value={`+880${phone}`} />

            <InputFieldError
              field="phone"
              state={state}
              key={`phone-${errorResetKey}`}
            />
          </Field>

          {/* 🔐 PASSWORD */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={16} />
              </span>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="pl-9 pr-10"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <InputFieldError
              field="password"
              state={state}
              key={`password-${errorResetKey}`}
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
