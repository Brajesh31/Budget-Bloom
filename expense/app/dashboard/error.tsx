"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep diagnostic details in server-side logs where possible.
    console.error("Dashboard route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <AlertTriangle aria-hidden="true" size={28} />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">We couldn't load your dashboard</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Something went wrong while loading this page. Your data has not been intentionally changed by this screen.
        </p>
        {error.digest ? <p className="mt-3 text-xs text-slate-400">Reference: {error.digest}</p> : null}
        <Button type="button" onClick={() => reset()} className="mt-6">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </section>
    </main>
  );
}
