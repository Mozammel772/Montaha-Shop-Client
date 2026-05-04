"use client";

import FloatingCartButton from "@/components/shared/FloatingCartButton";
import PublicFooter from "@/components/shared/publicFooter/PublicFooter";
import PublicNavbar from "@/components/shared/publicNavbar/PublicNavbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <FloatingCartButton />
      <div>{children}</div>
      <PublicFooter />
    </>
  );
}
