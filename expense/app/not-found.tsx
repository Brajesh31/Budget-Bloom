import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <section className="w-full max-w-lg rounded-2xl border bg-white p-10 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <SearchX size={32} aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">404 · Page not found</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">This page isn't in the garden.</h1>
        <p className="mt-3 text-slate-600">
          The link may be incorrect, or the page may have moved. Head back to Budget Bloom and continue from there.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          <Home size={18} className="mr-2" aria-hidden="true" />
          Back to home
        </Link>
      </section>
    </main>
  );
}
