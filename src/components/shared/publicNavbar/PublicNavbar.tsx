/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Heart, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@/assets/icons/theme-logo.png";
import { navbarCategoryData } from "@/lib/navbarData";

import { getUserInfo } from "@/services/auth/getUserInfo";

import dynamic from "next/dynamic";
import MobileBottomNav from "./MobileBottomNav";
import MobileTopNavbar from "./MobileTopNavbar";

const MobileMenuDrawer = dynamic(() => import("./MobileMenuDrawer"), {
  ssr: false,
});

const AuthDropdown = dynamic(() => import("./AuthDropdown"), {
  ssr: false,
});

const UserRoleBaseDropdown = dynamic(() => import("./UserRoleBaseDropdown"), {
  ssr: false,
});

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<keyof typeof navbarCategoryData>("men");

  const active = navbarCategoryData[activeTab];

  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // DevTools থেকে cookie delete করলে tab focus এ recheck
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const data = await getUserInfo();
        setUser(data || null);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  useEffect(() => {
    const init = async () => {
      try {
        let data = await getUserInfo();

        if (!data) {
          await new Promise((r) => setTimeout(r, 300));
          data = await getUserInfo();
        }

        if (!data) {
          await new Promise((r) => setTimeout(r, 500));
          data = await getUserInfo();
        }

        setUser(data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handler = async () => {
      try {
        let data = await getUserInfo();

        if (!data) {
          await new Promise((r) => setTimeout(r, 300));
          data = await getUserInfo();
        }

        setUser(data || null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);
  return (
    <>
      <header className="w-full bg-[var(--background)] shadow-sm hidden sm:block">
        <div className="max-w-[1600px] mx-auto px-2 h-18 flex items-center gap-5">
          {/* LOGO */}
          <Link href="/">
            <Image src={logo} alt="ShopKing" width={120} height={40} />
          </Link>

          {/* MENU */}
          {/* MENU */}
          <div className="flex-2 flex justify-end">
            <NavigationMenu>
              <NavigationMenuList className="gap-5 font-bold">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="w-[750px]">
                      {/* TABS — উপরে */}
                      <div className="flex border-b px-6">
                        {Object.keys(navbarCategoryData).map((tab) => (
                          <button
                            key={tab}
                            onMouseEnter={() =>
                              setActiveTab(
                                tab as keyof typeof navbarCategoryData,
                              )
                            }
                            className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
                              activeTab === tab
                                ? "text-orange-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500"
                                : "text-gray-500 hover:text-gray-800"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* CONTENT — image + columns */}
                      <div className="flex gap-6 p-6">
                        {/* IMAGE */}
                        <div className="w-[180px] shrink-0">
                          <Image
                            src={active.image}
                            alt={activeTab}
                            width={180}
                            height={220}
                            className="rounded-lg object-cover w-full h-[220px]"
                            loading="lazy"
                          />
                        </div>

                        {/* COLUMNS */}
                        <div className="flex gap-10 flex-1">
                          {Object.entries(active.columns).map(
                            ([columnName, items]) => (
                              <div key={columnName} className="flex flex-col">
                                {/* Column title */}
                                <p className="text-sm font-semibold text-gray-800 mb-3">
                                  {columnName}
                                </p>

                                {/* Items */}
                                <ul className="flex flex-col gap-2">
                                  {items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/offers">Offers</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* SEARCH */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4" />
              <input
                placeholder="Search products..."
                className="w-full pl-9 py-2 border rounded-full"
              />
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart />
            </Link>

            <Link href="/cart" aria-label="Cart">
              <ShoppingBag />
            </Link>

            {/* USER section */}
            {loading ? (
              // ✅ loading এর সময় shimmer দেখাও — user icon flash করবে না
              <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <UserRoleBaseDropdown user={user} />
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setShowAuth(true)}
                onMouseLeave={() => setShowAuth(false)}
              >
                <div className="h-9 w-9 border flex items-center justify-center rounded-full cursor-pointer">
                  <User />
                </div>

                {showAuth && (
                  <AuthDropdown onClose={() => setShowAuth(false)} />
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <MobileTopNavbar onMenuClick={() => setMenuOpen(true)} />
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileBottomNav />
    </>
  );
}
