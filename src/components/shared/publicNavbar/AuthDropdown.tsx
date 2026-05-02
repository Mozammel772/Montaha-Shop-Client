// components/AuthDropdown.tsx
import Link from "next/link";

export default function AuthDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0  w-[260px] bg-white rounded-2xl shadow-xl p-5 z-50">
      {/* Register */}
      <Link href="/register" onClick={onClose}>
        <button className="w-full py-2 rounded-full bg-orange-100 text-orange-500 font-medium hover:bg-orange-200 transition cursor-pointer">
          Register your account
        </button>
      </Link>

      {/* OR */}
      <div className="flex items-center my-3">
        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="px-3 text-gray-400 text-sm">OR</span>

        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Login */}
      <Link href="/login" onClick={onClose}>
        <button className="w-full py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition cursor-pointer">
          Login to your account
        </button>
      </Link>
    </div>
  );
}
