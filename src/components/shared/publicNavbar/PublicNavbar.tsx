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
import { useState } from "react";

import logo from "@/assets/icons/theme-logo.png";

import { navbarCategoryData } from "@/lib/navbarData";
import AuthDropdown from "./AuthDropdown";
import MobileBottomNav from "./MobileBottomNav";
import MobileMenuDrawer from "./MobileMenuDrawer";
import MobileTopNavbar from "./MobileTopNavbar";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<keyof typeof navbarCategoryData>("men");
  const active = navbarCategoryData[activeTab];
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="w-full bg-background shadow-sm hidden sm:block">
        <div className="max-w-[1600px] mx-auto px-2 h-18 flex items-center gap-5 ">
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

          {/* Menu */}
          <div className="flex-2 flex justify-end">
            <NavigationMenu>
              <NavigationMenuList className="gap-5 font-bold">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Categories */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold">
                    Categories
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="w-[900px] p-6 grid grid-cols-4 gap-6 bg-background rounded-xl">
                      <Image
                        src={active.image}
                        alt="category"
                        width={260}
                        height={320}
                        className="rounded-lg object-cover"
                        priority
                      />

                      <div className="col-span-3">
                        <div className="flex gap-6 border-b mb-4">
                          {(["men", "women", "juniors"] as const).map((tab) => (
                            <button
                              key={tab}
                              onMouseEnter={() => setActiveTab(tab)}
                              className={`pb-2 capitalize text-base transition-all
                              ${
                                activeTab === tab
                                  ? "border-b-2 border-orange-500 text-primary font-semibold"
                                  : "text-gray-500 hover:text-black"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-base">
                          {Object.entries(active.columns).map(
                            ([title, items]) => (
                              <div key={title}>
                                <h4 className="font-semibold mb-2 border-b">
                                  {title}
                                </h4>
                                <ul className="space-y-1 text-muted-foreground">
                                  {items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        className="hover:text-primary-foreground"
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

          {/* Search */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" className="relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-orange-500 text-white rounded-full px-1">
                3
              </span>
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-orange-500 text-white rounded-full px-1">
                2
              </span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowAuth(true)}
              onMouseLeave={() => setShowAuth(false)}
            >
              <div className="h-9 w-9 rounded-full border flex items-center justify-center cursor-pointer">
                <User className="h-5 w-5" />
              </div>

              {showAuth && <AuthDropdown onClose={() => setShowAuth(false)} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile */}
      <MobileTopNavbar onMenuClick={() => setMenuOpen(true)} />
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileBottomNav />
    </>
  );
}
