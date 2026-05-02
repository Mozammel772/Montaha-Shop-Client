import logo from "@/assets/icons/theme-logo.png";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Offers", href: "/offers" },
  { label: "FAQ", href: "/faq" },
  { label: "Return & Exchange", href: "/return-exchange" },
  { label: "Shipping", href: "/shipping" },
  { label: "Size Charts", href: "/size-chart" },
  { label: "Cookies Policy", href: "/cookies-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function MobileMenuDrawer({ open, onClose }: Props) {
  // 🔥 AUTO CLOSE when screen >= md
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        onClose();
      }
    };

    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-[65%] max-w-sm bg-white z-50 animate-slideLeft overflow-y-auto md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link href="/" onClick={onClose} className="shrink-0">
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

          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        {/* Menu */}
        <ul className="divide-y">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-base hover:bg-gray-100 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
