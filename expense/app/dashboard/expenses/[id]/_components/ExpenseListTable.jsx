import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Expenses } from '../../../../../utils/schema';

function ExpenseListTable({ expensesList, refreshData }) {

  const deleteExpense = async (expense) => {
    const confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    const result = await db.delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result.length > 0) {
      toast.success("Expense deleted successfully");
      refreshData();
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-3 w-full">
      <h1 className="font-bold text-3xl">Latest Expenses</h1>
      <br></br>
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 bg-slate-400 p-3 gap-3 rounded-t-md">
        <h2 className="font-semibold">Name</h2>
        <h2 className="font-semibold">Amount</h2>
        <h2 className="font-semibold">Date</h2>
        <h2 className="font-semibold">Actions</h2>
      </div>

      {/* Table Body */}
      <div className="space-y-3">
        {expensesList.map((expense) => (
          <div
            key={expense.id}
            className="grid grid-cols-1 md:grid-cols-4 bg-slate-100 p-4 gap-2 rounded-md shadow-sm"
          >
            {/* Mobile View Labels */}
            <div className="md:hidden">
              <p className="text-sm text-gray-500">Name</p>
              <h2 className="font-bold">{expense.name}</h2>
            </div>
            <div className="md:hidden">
              <p className="text-sm text-gray-500">Amount</p>
              <h2 className="font-bold">{expense.amount}</h2>
            </div>
            <div className="md:hidden">
              <p className="text-sm text-gray-500">Date</p>
              <h2 className="font-bold">{expense.createdAt}</h2>
            </div>
            <div className="md:hidden">
              <p className="text-sm text-gray-500">Actions</p>
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </div>

            {/* Desktop View */}
            <h2 className="hidden md:block font-bold">{expense.name}</h2>
            <h2 className="hidden md:block font-bold">{expense.amount}</h2>
            <h2 className="hidden md:block font-bold">{expense.createdAt}</h2>
            <div className="hidden md:flex justify-start">
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseListTable;
