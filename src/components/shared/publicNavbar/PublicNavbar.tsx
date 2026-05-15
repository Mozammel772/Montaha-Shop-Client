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

import { Heart, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import logo from "@/assets/icons/theme-logo.png";
import { navbarCategoryData } from "@/lib/navbarData";
import { getUserInfo } from "@/services/auth/getUserInfo";

import dynamic from "next/dynamic";
import CartDrawer from "../CartDrawer";
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
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // ✅ isFetching ref — একসাথে multiple fetch আটকাবে
  const isFetching = useRef(false);

  const fetchUser = async () => {
    if (isFetching.current) return; // ইতিমধ্যে fetch চললে নতুন call skip
    isFetching.current = true;
    try {
      const data = await getUserInfo();
      setUser(data || null);
    } catch {
      setUser(null);
    } finally {
      isFetching.current = false;
    }
  };

  // ✅ শুধু mount এ একবার fetch
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    init();
  }, []);

  // ✅ login/logout event এ fetch — এটা ঠিকই আছে
  useEffect(() => {
    const handler = () => fetchUser();
    window.addEventListener("userChanged", handler);
    return () => window.removeEventListener("userChanged", handler);
  }, []);

  // ✅ visibilitychange — debounce দিয়ে বারবার call আটকাও
  // useEffect(() => {
  //   let timeout: ReturnType<typeof setTimeout>;
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       clearTimeout(timeout);
  //       // tab switch এ 500ms debounce — rapid tab switch এ একটাই call যাবে
  //       timeout = setTimeout(() => fetchUser(), 500);
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     clearTimeout(timeout);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  // ✅ scroll — শুধু UI state, কোনো fetch নেই
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ search open এ focus
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // ❌ console.log সরানো হয়েছে — প্রতি render এ fire হতো

  return (
    <>
      {/* FIXED NAVBAR */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 hidden sm:block
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
              : "bg-white shadow-sm"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-2 h-[72px] flex items-center gap-5">
          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <Image src={logo} alt="ShopKing" width={120} height={40} />
          </Link>

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
                      {/* TABS */}
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

                      {/* CONTENT */}
                      <div className="flex gap-6 p-6">
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

                        <div className="flex gap-10 flex-1">
                          {Object.entries(active.columns).map(
                            ([columnName, items]) => (
                              <div key={columnName} className="flex flex-col">
                                <p className="text-sm font-semibold text-gray-800 mb-3">
                                  {columnName}
                                </p>
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
            <div className="relative flex items-center w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchRef}
                placeholder="Search products..."
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="
                  w-full pl-9 pr-9 py-2 text-sm
                  bg-gray-50 border border-gray-200 rounded-full
                  outline-none
                  focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100
                  transition-all duration-200
                "
              />
              {searchOpen && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  onMouseDown={() => setSearchOpen(false)}
                />
              )}
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart />
            </Link>

            <button onClick={() => setCartOpen(true)} aria-label="Cart">
              <ShoppingBag />
            </button>

            {loading ? (
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

      {/* spacer */}
      <div className="hidden sm:block h-[72px]" />

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />

      <MobileTopNavbar onMenuClick={() => setMenuOpen(true)} />
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileBottomNav />
    </>
  );
}
