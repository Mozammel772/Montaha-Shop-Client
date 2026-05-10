"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/user.interface";
import { Settings, User } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  userInfo?: UserInfo | null; // 🔥 make optional
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  // console.log("userinfo", userInfo);
  // ✅ Safe destructuring with fallback
  const { name = "User", phone = "", role = "user" } = userInfo || {};

  // ✅ Ensure role is string before toLowerCase
  const safeRole = typeof role === "string" ? role.toLowerCase() : "user";

  // ✅ First letter safe
  const firstLetter =
    typeof name === "string" && name.length > 0
      ? name.charAt(0).toUpperCase()
      : "U";

  // ✅ Optional: loading state (if needed)
  if (!userInfo) return <p>Loading...</p>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm font-semibold">{firstLetter}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">
              {phone || "No phone"}
            </p>
            <p className="text-xs text-primary capitalize">{safeRole}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/my-profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/change-password" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
