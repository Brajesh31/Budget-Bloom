import React from "react";
import Link from "next/link";

export default function BudgetItem({ budget }) {
  const amount = Number(budget?.amount) || 0;
  const spent = Number(budget?.totalSpend) || 0;
  const itemCount = Number(budget?.totalItem) || 0;
  const progress = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;
  const remaining = Math.max(amount - spent, 0);

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      aria-label={`Open ${budget?.name || "budget"} budget details`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <article className="h-full min-h-[170px] rounded-lg border p-5 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="rounded-full bg-slate-100 px-4 py-3 text-2xl">
              {budget?.icon || "💰"}
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-bold text-slate-900">{budget?.name || "Untitled budget"}</h2>
              <p className="text-sm text-slate-500">{itemCount} {itemCount === 1 ? "expense" : "expenses"}</p>
            </div>
          </div>
          <p className="shrink-0 text-lg font-bold text-primary">
            ${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-slate-500">
            <span>${spent.toLocaleString("en-US", { maximumFractionDigits: 2 })} spent</span>
            <span>${remaining.toLocaleString("en-US", { maximumFractionDigits: 2 })} remaining</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label={`Spending progress for ${budget?.name || "budget"}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-blue-700 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-slate-500">{progress.toFixed(0)}% used</p>
        </div>
      </article>
    </Link>
  );
}
