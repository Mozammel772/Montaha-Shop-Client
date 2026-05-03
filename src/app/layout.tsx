import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

// ✅ Fonts
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Montaha Shop - Best Online Shopping in Bangladesh",
    template: "%s | Montaha Shop",
  },

  description:
    "Shop the best products at Montaha Shop. Fast delivery, secure payment & best deals in Bangladesh. Trusted online shopping experience.",

  keywords: [
    "bangladesh ecommerce",
    "online shopping bangladesh",
    "ecommerce bd",
    "bd online shop",
    "buy products online bangladesh",
    "best online shop bangladesh",
    "cheap price bd online shopping",
    "online marketplace bd",
    "fashion shopping bangladesh",
    "electronics shop bd",
    "trusted online shop bd",
    "fast delivery bangladesh",
    "montaha shop",
  ],

  authors: [{ name: "Montaha Shop Team" }],
  creator: "Montaha Shop",

  metadataBase: new URL("https://montahashop.com"),

  // ✅ Facebook / WhatsApp / Messenger (MAIN BOOST)
  openGraph: {
    title: "🔥 Montaha Shop - Best Deals Online in Bangladesh",
    description:
      "Shop smart with Montaha Shop. Get exclusive deals, fast delivery & trusted service across Bangladesh.",

    url: "https://montahashop.com",
    siteName: "Montaha Shop",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Montaha Shop - Online Shopping",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // optional (recommended for SEO)
  alternates: {
    canonical: "https://montahashop.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers> {children}</Providers>

        <Toaster position="top-right" richColors />

        <Suspense fallback={null}>
          <LoginSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
