"use client";

import { useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service here
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[500px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-md flex-col items-center gap-8 text-center">
        {/* Giant error indicator */}
        <div className="relative flex items-center justify-center">
          <span className="select-none text-[9rem] font-black leading-none tracking-tighter text-muted/40 sm:text-[12rem]">
            500
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
              Something went wrong
            </Badge>
          </div>
        </div>

        <Separator className="w-16 bg-border" />

        {/* Message */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            An unexpected error occurred
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Don&apos;t worry — it&apos;s not your fault. Our team has been
            notified and we&apos;re working on a fix.
          </p>
        </div>

        {/* Error detail box — only shown if error message exists */}
        {error?.message && (
          <Alert
            variant="destructive"
            className="text-left border-red-200 bg-red-50 text-red-800 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-sm font-semibold">
              Error detail
            </AlertTitle>
            <AlertDescription className="mt-1 text-xs font-mono break-all text-red-700 dark:text-red-400">
              {error.message}
              {error.digest && (
                <span className="block mt-1 text-red-500/70">
                  Digest: {error.digest}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="rounded-full bg-orange-500 hover:bg-orange-600 px-7 shadow-md shadow-orange-500/20 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-7 border-border gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>

        {/* Brand footer */}
        <p className="mt-2 text-xs text-muted-foreground/50 font-medium tracking-wide">
          Montaha<span className="text-red-400">.</span> Shop
        </p>
      </div>
    </div>
  );
}
