"use client";

import { navbarRoleBaseMenu } from "@/lib/navbarUserRoleBaseInfo";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "../LogOutButton";

type Props = {
  user: {
    name: string;
    phone: string;
    role: "ADMIN" | "USER" | "SUPER_ADMIN" | "MODERATOR";
  };
};

export default function UserRoleBaseDropdown({ user }: Props) {
  const [open, setOpen] = useState(false);

  // ✅ userChanged হলে dropdown বন্ধ করো
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  if (!user) return null;

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* BUTTON */}
      <button className="flex items-center gap-2 border px-3 py-2 rounded-full">
        <User className="h-5 w-5" />
        <span className="hidden md:block">{user.name}</span>
        <ChevronDown className={open ? "rotate-180" : ""} />
      </button>

      {/* DROPDOWN */}
      <div
        className={`absolute right-0 top-full z-50 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="w-64 bg-white shadow-xl rounded-xl">
          {/* USER INFO */}
          <div className="p-4 border-b">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>

          {/* MENU */}
          <div>
            {navbarRoleBaseMenu[user.role]?.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="px-4 py-2 hover:bg-gray-100">{item.name}</div>
              </Link>
            ))}
          </div>

          {/* LOGOUT */}
          <div className="border-t p-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
