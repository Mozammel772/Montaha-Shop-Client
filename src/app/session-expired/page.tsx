"use client";
import { RefreshCw, ShieldAlert, UserMinus, UserX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const REASON_CONFIG = {
  expired: {
    icon: RefreshCw,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "Session Expired",
    message: "আপনার session শেষ হয়ে গেছে। অনুগ্রহ করে আবার login করুন।",
  },
  role: {
    icon: ShieldAlert,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "Access Changed",
    message: "আপনার role পরিবর্তন করা হয়েছে। অনুগ্রহ করে আবার login করুন।",
  },
  suspended: {
    icon: UserMinus,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "Account Suspended",
    message: "আপনার account suspend করা হয়েছে। admin এর সাথে যোগাযোগ করুন।",
  },
  deleted: {
    icon: UserX,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "Account Deleted",
    message: "আপনার account মুছে ফেলা হয়েছে। admin এর সাথে যোগাযোগ করুন।",
  },
  inactive: {
    icon: UserMinus,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    title: "Account Inactive",
    message: "আপনার account inactive করা হয়েছে। admin এর সাথে যোগাযোগ করুন।",
  },
} as const;

type Reason = keyof typeof REASON_CONFIG;

export default function SessionExpiredPage() {
  const searchParams = useSearchParams();
  const reason = (searchParams.get("reason") as Reason) ?? "expired";
  const config = REASON_CONFIG[reason] ?? REASON_CONFIG.expired;
  const Icon = config.icon;

  // ✅ back button disable
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handler = () =>
      window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    // ✅ modal এর মতো দেখাবে — blur background
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        <div
          className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{config.title}</h2>
        <p className="text-gray-500 text-sm mb-6">{config.message}</p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          Login করুন
        </button>
      </div>
    </div>
  );
}
