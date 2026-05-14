import { AuthGuard } from "@/components/AuthGuard";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

// ✅ Primary font — UI, body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// ✅ Display font — headings, logo, bold text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

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
      className={`${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-16 md:pb-0">
        <NextTopLoader
          color="#f97316"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #f97316"
        />
        <Providers>
          <AuthGuard />
          {children}
        </Providers>

        <Toaster position="top-right" richColors />

        <Suspense fallback={null}>
          <LoginSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
