"use client";

import { changePassword, verifyPasswordAction } from "@/lib/change-password";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

// ── Reusable password input with eye toggle ──────────────────────
const PasswordInput = ({
  value,
  onChange,
  placeholder = "********",
  disabled = false,
  autoComplete = "off",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={(e) => e.target.removeAttribute("readonly")}
        readOnly
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        disabled={disabled}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────
export default function ChangePassword() {
  const [step, setStep] = useState<"verify" | "change">("verify");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleVerify = () => {
    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }
    startTransition(async () => {
      const res = await verifyPasswordAction(currentPassword);
      if (res.success) {
        setStep("change");
      } else {
        toast.error(res.message || "Incorrect password");
      }
    });
  };

  const handleChange = () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    startTransition(async () => {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setStep("verify");
      } else {
        toast.error(res.message || "Failed to change password");
        setStep("verify");
      }
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-slate-800">
        Change Password
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        {step === "verify"
          ? "Enter your current password to continue"
          : "Set your new password"}
      </p>

      {/* Current Password */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Current Password
        </label>
        <PasswordInput
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={step === "change"}
          autoComplete="current-password" // ✅
        />
      </div>

      {/* Step 1 — Verify */}
      {step === "verify" && (
        <button
          onClick={handleVerify}
          disabled={isPending || !currentPassword}
          className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Continue"}
        </button>
      )}

      {/* Step 2 — Change */}
      {step === "change" && (
        <>
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              New Password
            </label>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password" // ✅
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Confirm New Password
            </label>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password" // ✅
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep("verify");
                setNewPassword("");
                setConfirmPassword("");
              }}
              className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleChange}
              disabled={isPending || !newPassword || !confirmPassword}
              className="flex-1 rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
