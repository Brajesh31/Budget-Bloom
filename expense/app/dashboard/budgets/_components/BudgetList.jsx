"use client";

import React, { useCallback, useEffect, useState } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";

export default function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  const getBudgetList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setBudgetList([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`coalesce(sum(${Expenses.amount}), 0)`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
    } catch (error) {
      console.error("Unable to load budgets:", error);
      toast.error("We couldn't load your budgets. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded) {
      getBudgetList();
    }
  }, [getBudgetList, isLoaded]);

  return (
    <section className="mt-9" aria-labelledby="budget-list-heading">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="budget-list-heading" className="text-2xl font-bold">Your budgets</h2>
          <p className="mt-1 text-sm text-slate-500">Keep your spending plans organized in one place.</p>
        </div>
        <CreateBudget refreshData={getBudgetList} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading budgets">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-40 animate-pulse rounded-lg border bg-slate-100" />
          ))}
        </div>
      ) : budgetList.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {budgetList.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed bg-slate-50 px-6 py-12 text-center">
          <p className="text-3xl" aria-hidden="true">🌱</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">Your budget garden is empty</h3>
          <p className="mt-1 text-sm text-slate-600">Create your first budget to start organizing your expenses.</p>
        </div>
      )}
    </section>
  );
}
