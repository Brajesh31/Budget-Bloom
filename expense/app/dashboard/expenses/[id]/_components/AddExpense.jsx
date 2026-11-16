"use client";

import React, { useState } from "react";
import { Input } from "../../../../../@/components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async (event) => {
    event.preventDefault();

    const cleanName = name.trim();
    const parsedAmount = Number(amount);
    const parsedBudgetId = Number(budgetId);

    if (!user) {
      toast.error("Please sign in before adding an expense.");
      return;
    }
    if (!cleanName) {
      toast.error("Enter an expense name.");
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter an amount greater than zero.");
      return;
    }
    if (!Number.isInteger(parsedBudgetId) || parsedBudgetId <= 0) {
      toast.error("This budget could not be identified. Refresh and try again.");
      return;
    }

    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: cleanName,
          amount: parsedAmount,
          budgetId: parsedBudgetId,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ insertedId: Expenses.id });

      if (result.length > 0) {
        setName("");
        setAmount("");
        await refreshData?.();
        toast.success("Expense added successfully.");
      } else {
        toast.error("The expense could not be added. Please try again.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("We couldn't add this expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addNewExpense} className="rounded-lg border p-5">
      <h2 className="text-lg font-bold">Add an expense</h2>
      <p className="mt-1 text-sm text-slate-500">Record a purchase against this budget.</p>

      <div className="mt-4">
        <label htmlFor="expense-name" className="my-1 block text-sm font-medium text-slate-800">
          Expense name
        </label>
        <Input
          id="expense-name"
          name="name"
          placeholder="e.g. Weekly groceries"
          value={name}
          maxLength={100}
          required
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="expense-amount" className="my-1 block text-sm font-medium text-slate-800">
          Expense amount
        </label>
        <Input
          id="expense-amount"
          name="amount"
          type="number"
          inputMode="decimal"
          min="0.01"
          step="0.01"
          placeholder="e.g. 450"
          value={amount}
          required
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !name.trim() || !amount}
        className="mt-4 w-full"
      >
        {loading ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : "Add expense"}
      </Button>
    </form>
  );
}

export default AddExpense;
