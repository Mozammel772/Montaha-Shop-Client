import logo from "@/assets/icons/theme-logo.png";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onMenuClick: () => void;
};

export default function MobileTopNavbar({ onMenuClick }: Props) {
  return (
    <header className="sm:hidden sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex gap-4 items-center">
          {/* Menu */}
          <button onClick={onMenuClick} aria-label="Open Sidebar Menu">
            <Menu className="h-6 w-6 cursor-pointer" />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="relative h-10 w-[120px]">
              <Image
                src={logo}
                alt="ShopKing"
                fill
                sizes="120px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-[160px] shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-2 py-2 rounded-full border text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
      </div>
    </header>
  );
}
