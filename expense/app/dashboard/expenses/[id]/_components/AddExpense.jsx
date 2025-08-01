"use client"
import React from 'react'
import { useState } from 'react'
import { Input } from "../../../../../@/components/ui/input"
import { Button } from '../../../../../components/ui/button';
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';
function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    const addNewExpenses = async () => {
        setLoading(true)
        if (!user) {
            toast.error("User not found! Please log in.");
            return;
        }

        try {
            // ✅ Ensure `budgetId` is a number
            const parsedBudgetId = Number(budgetId);
            if (isNaN(parsedBudgetId)) {
                throw new Error("Invalid budgetId: Not a number.");
            }

            const result = await db.insert(Expenses).values({
                name: name,
                amount: Number(amount), // ✅ Ensure it's a number
                budgetId: parsedBudgetId, // ✅ Corrected budgetId 
                createdAt: moment().format('DD/MM/yyy') // ✅ Store current timestamp
            }).returning({ insertedId: Expenses.id });
            
            setAmount('');
            setName('');
            if (result.length > 0) {
                setLoading(false)
                refreshData();
                toast("New Expense Added!");
            }
            setLoading(false) 
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error("Failed to add expense. Try again!");
        }
    };

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    placeholder="Enter Expense Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    placeholder="Enter Expense Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading}
                onClick={() => addNewExpenses()}
                className="mt-3 w-full">
                    {loading ?
                    <Loader className="animate-spin"/>: "Add New Expense"
                    }
                </Button>
        </div>
    )
}

export default AddExpense
