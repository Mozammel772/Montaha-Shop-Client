import { Grid, Heart, Home, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navbarCategoryData } from "@/lib/navbarData";
import MobileCategoryDrawer from "./MobileCategoryDrawer";

export default function MobileBottomNav() {
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openCategory ? "hidden" : "auto";
  }, [openCategory]);

  return (
    <>
      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-background border-t sm:hidden shadow-md">
        <div className="relative grid grid-cols-5 items-center h-16 px-2">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-orange-500 text-xs font-medium"
          >
            <Home size={20} />
            <span className="mt-1">Home</span>
          </Link>

          {/* Categories */}
          <button
            onClick={() => setOpenCategory(true)}
            className="flex flex-col items-center justify-center text-muted-foreground text-xs font-medium"
          >
            <Grid size={20} />
            <span className="mt-1">Categories</span>
          </button>

          {/* Center Empty Column for Floating Button */}
          <div></div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="flex flex-col items-center justify-center text-muted-foreground text-xs font-medium"
          >
            <Heart size={20} />
            <span className="mt-1">Wishlist</span>
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="flex flex-col items-center justify-center text-muted-foreground text-xs font-medium"
          >
            <User size={20} />
            <span className="mt-1">Login</span>
          </Link>

          {/* Floating Cart Button */}
          <Link
            href="/cart"
            className="absolute left-1/2 -translate-x-1/2 -top-7"
          >
            <div className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center shadow-xl  transition-all duration-300 active:scale-95">
              <ShoppingBag className="text-white" size={22} />
            </div>
          </Link>
        </div>
      </nav>

      {/* Category Drawer */}
      <MobileCategoryDrawer
        open={openCategory}
        onClose={() => setOpenCategory(false)}
        categoryData={navbarCategoryData}
      />
    </>
  );
}
