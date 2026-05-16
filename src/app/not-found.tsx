import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8 text-center">
        {/* Giant 404 with overlay badge */}
        <div className="relative flex items-center justify-center">
          <span className="select-none text-[9rem] font-black leading-none tracking-tighter text-muted/40 sm:text-[12rem]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge className="bg-red-500 hover:bg-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-red-500/20">
              Page not found
            </Badge>
          </div>
        </div>

        <Separator className="w-16 bg-border" />

        {/* Message */}
        <div className="max-w-md flex flex-col gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Oops! This page doesn&apos;t exist.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for may have been moved, deleted, or
            never existed. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="rounded-full bg-red-500 hover:bg-red-600 px-7 shadow-md shadow-red-500/20"
          >
            <Link href="/">Go to homepage</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-7 border-border"
          >
            <Link href="/shop">Browse products</Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link
            href="/account"
            className="hover:text-foreground transition-colors"
          >
            My account
          </Link>
          <span className="h-1 w-1 rounded-full bg-border" />
          <Link
            href="/checkout"
            className="hover:text-foreground transition-colors"
          >
            Checkout
          </Link>
          <span className="h-1 w-1 rounded-full bg-border" />
          <Link
            href="/trending-products"
            className="hover:text-foreground transition-colors"
          >
            Trending
          </Link>
        </div>

        {/* Brand footer */}
        <p className="mt-4 text-xs text-muted-foreground/50 font-medium tracking-wide">
          Montaha<span className="text-red-400">.</span> Shop
        </p>
      </div>
    </div>
  );
}
