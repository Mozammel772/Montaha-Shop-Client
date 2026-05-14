"use client";

import { changePassword, verifyPasswordAction } from "@/lib/change-password";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ChangePassword() {
  const [step, setStep] = useState<"verify" | "change">("verify");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  // handleVerify — current password verify
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

  // handleChange — actual password change
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
        setStep("verify"); // wrong current password হলে আবার শুরু থেকে
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-1 text-xl font-semibold text-slate-800">
          Change Password
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          {step === "verify"
            ? "Enter your current password to continue"
            : "Set your new password"}
        </p>

        {/* Current Password — সবসময় দেখাবে */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={step === "change"}
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50"
          />
        </div>

        {/* Verify button — step 1 এ দেখাবে */}
        {step === "verify" && (
          <button
            onClick={handleVerify}
            disabled={isPending || !currentPassword}
            className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Continue"}
          </button>
        )}

        {/* New password fields — step 2 এ দেখাবে */}
        {step === "change" && (
          <>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300"
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
    </div>
  );
}
