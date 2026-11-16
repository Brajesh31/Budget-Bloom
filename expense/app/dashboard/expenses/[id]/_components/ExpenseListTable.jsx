"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { db } from "../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Expenses } from "../../../../../utils/schema";
import { Button } from "../../../../../components/ui/button";

function ExpenseListTable({ expensesList = [], refreshData }) {
  const [deletingId, setDeletingId] = useState(null);

  const deleteExpense = async (expense) => {
    if (!window.confirm(`Delete the expense "${expense.name}"?`)) return;

    setDeletingId(expense.id);
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning({ deletedId: Expenses.id });

      if (result.length > 0) {
        toast.success("Expense deleted.");
        await refreshData?.();
      } else {
        toast.error("This expense could not be found.");
      }
    } catch (error) {
      console.error("Unable to delete expense:", error);
      toast.error("We couldn't delete this expense. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-6 w-full" aria-labelledby="latest-expenses-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="latest-expenses-heading" className="text-2xl font-bold sm:text-3xl">
          Latest Expenses
        </h2>
        <span className="text-sm text-slate-500">
          {expensesList.length} {expensesList.length === 1 ? "record" : "records"}
        </span>
      </div>

      {expensesList.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-slate-50 px-5 py-10 text-center">
          <p className="text-2xl" aria-hidden="true">🧾</p>
          <h3 className="mt-2 font-semibold text-slate-900">No expenses yet</h3>
          <p className="mt-1 text-sm text-slate-600">Expenses you add to your budgets will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="hidden grid-cols-4 gap-3 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 md:grid">
            <span>Expense</span>
            <span>Amount</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y">
            {expensesList.map((expense) => (
              <li
                key={expense.id}
                className="grid grid-cols-1 gap-3 px-4 py-4 transition-colors hover:bg-slate-50 md:grid-cols-4 md:items-center"
              >
                <div className="min-w-0">
                  <span className="text-xs text-slate-500 md:hidden">Expense</span>
                  <p className="break-words font-semibold text-slate-900">{expense.name}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 md:hidden">Amount</span>
                  <p className="font-medium text-slate-800">
                    ${Number(expense.amount || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 md:hidden">Date</span>
                  <p className="text-sm text-slate-600">{expense.createdAt || "Date unavailable"}</p>
                </div>
                <div className="flex justify-start md:justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    aria-label={`Delete expense ${expense.name}`}
                    disabled={deletingId === expense.id}
                    onClick={() => deleteExpense(expense)}
                  >
                    <Trash2 size={17} aria-hidden="true" />
                    <span className="ml-2 md:hidden">{deletingId === expense.id ? "Deleting..." : "Delete"}</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default ExpenseListTable;
