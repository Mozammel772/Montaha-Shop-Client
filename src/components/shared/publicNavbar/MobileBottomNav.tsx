"use client";

import { useCart } from "@/hooks/useCart";
import { navbarCategoryData } from "@/lib/navbarData";
import { Grid, Heart, Home, ShoppingBag, User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartDrawer = dynamic(() => import("../CartDrawer"), {
  ssr: false,
});
const MobileCategoryDrawer = dynamic(() => import("./MobileCategoryDrawer"), {
  ssr: false,
});

export default function MobileBottomNav() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const { cartItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = openCategory || openCart ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCategory, openCart]);

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

          {/* Center Empty */}
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
          <button
            onClick={() => setOpenCart(true)}
            className="absolute left-1/2 -translate-x-1/2 -top-7"
          >
            <div className="relative h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center shadow-xl transition-all duration-300 active:scale-95">
              <ShoppingBag className="text-white" size={22} />

              <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#0f3ea9] text-white text-[10px] font-bold flex items-center justify-center">
                {cartItems?.length ?? 0}
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer open={openCart} setOpen={setOpenCart} />

      {/* CATEGORY DRAWER */}
      <MobileCategoryDrawer
        open={openCategory}
        onClose={() => setOpenCategory(false)}
        categoryData={navbarCategoryData}
      />
    </>
  );
}
