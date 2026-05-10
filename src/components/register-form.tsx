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
import { registerUser } from "@/services/auth/registerUser";
import { Eye, EyeOff, Lock, Phone, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";

export function RegisterForm({
  redirect,
  className,
  ...props
}: {
  redirect?: string;
} & React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(registerUser, null);

  const errorResetKey = JSON.stringify(state);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRedirecting] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
      return;
    }

    const handleSuccess = async () => {
      if (!state.success) return;

      toast.success(state.message || "Registration successful!");

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
          {/* 👤 NAME */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={16} />
              </span>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="pl-9"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <InputFieldError
              field="name"
              state={state}
              key={`name-${errorResetKey}`}
            />
          </Field>

          {/* 📲 PHONE */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

            <div className="flex">
              <div className="flex items-center gap-1.5 px-3 border border-r-0 rounded-l-md bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                <Phone size={14} />
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
                placeholder="Min. 6 characters"
                className="pl-9 pr-10"
                autoComplete="new-password"
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

          {/* 🔐 CONFIRM PASSWORD */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ShieldCheck size={16} />
              </span>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="pl-9 pr-10"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <InputFieldError
              field="confirmPassword"
              state={state}
              key={`confirmPassword-${errorResetKey}`}
            />
          </Field>

          {/* SUBMIT BUTTON */}
          <Field className="space-y-1.5">
            <Button
              type="submit"
              disabled={isPending || isRedirecting}
              className="w-full"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </Button>

            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline underline-offset-4"
              >
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
