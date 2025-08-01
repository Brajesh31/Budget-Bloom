"use client"
import React, { useEffect, useState } from 'react'; // ✅ Removed `use`
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu, X, Trash, ArrowLeft, PenBox } from 'lucide-react';
import DashboardHeader from '../../../dashboard/_components/DashboardHeader';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../utils/schema'
import { db } from '../../../../utils/dbConfig'
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from './_components/AddExpense';
import ExpenseListTable from './_components/ExpenseListTable';
import { Button } from '../../../../components/ui/button';
import EditBudget from './_components/EditBudget';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../../@/components/ui/alert-dialog"

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter();
    // const resolvedParams = use(params); ❌ (Remove this line)

    useEffect(() => {
        if (user) {
            getBudgetInfo();
        }
    }, [user, params]); // ✅ Depend on params directly

    const getBudgetInfo = async () => {
        if (!params?.id) return; // ✅ Use params directly

        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(
                and(
                    eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
                    eq(Budgets.id, params.id) // ✅ Use params.id
                )
            )
            .groupBy(...Object.values(getTableColumns(Budgets)));

        setBudgetInfo(result[0]);
        getExpeneslist();
    };

    const getExpeneslist = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id)) // ✅ Use params.id
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
        console.log(result)
    }

    const deleteBudget = async () => {
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id)) // ✅ Use params.id
            .returning()

        if (deleteExpenseResult) {
            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, params.id)) // ✅ Use params.id
                .returning();
        }
        toast("Budget deleted successfully")
        route.replace('/dashboard/budgets')
    }

    // rest of your code (Sidebar, Hamburger Menu, etc.) is fine ✅



    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
    const menuList = [
        { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
        { name: "Budget", icon: PiggyBank, href: "/dashboard/budgets" },
        { name: "Expenses", icon: ReceiptText, href: "/dashboard/expensesdashboard" },
        { name: "About us", icon: ShieldCheck, href: "/dashboard/about" },
    ];

    const path = usePathname();
    console.log("Current Path:", path); // Debugging

    // Handle hamburger icon click to toggle the sidebar
    const handleHamburgerClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Handle close button click to close the sidebar
    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <>
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                <DashboardHeader />
            </div>

            <div className="flex">
                {/* Hamburger (Mobile Only) */}
                <div className="lg:hidden p-4">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <Menu size={24} />
                    </button>
                </div>

                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block h-auto p-5 w-64 bg-white border shadow-sm">
                    <ul className="mt-6 px-8 space-y-6 text-lg">
                        {menuList.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href}>
                                    <div
                                        className={`flex items-center space-x-4 p-3 rounded-md transition hover:text-blue-400 hover:bg-blue-100 ${path === link.href ? "text-blue-600 bg-blue-100 font-semibold" : ""
                                            }`}
                                    >
                                        <link.icon size={24} />
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sidebar (Mobile) */}
                <div
                    className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-white p-5 border shadow-sm z-20 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex justify-end">
                        <button onClick={() => setSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <ul className="mt-10 px-4 space-y-6 text-lg">
                        {menuList.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href}>
                                    <div
                                        className={`flex items-center space-x-4 p-3 rounded-md transition hover:text-blue-400 hover:bg-blue-100 ${path === link.href ? "text-blue-600 bg-blue-100 font-semibold" : ""
                                            }`}
                                    >
                                        <link.icon size={24} />
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Page Content */}
                <div className="p-4 sm:p-10 w-full">
                    <h2 className="font-bold text-2xl sm:text-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <span className="flex gap-2 items-center text-gray-800">
                            <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
                            My Expense
                        </span>

                        {/* Buttons / Controls - Stack under on mobile */}
                        <div className="flex gap-2 items-center">
                            <EditBudget
                                budgetInfo={budgetInfo}
                                refreshData={() => getBudgetInfo()}
                            />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="flex gap-2" variant="destructive" size="sm">
                                        <Trash />delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className={undefined}>
                                    <AlertDialogHeader className={undefined}>
                                        <AlertDialogTitle className={undefined}>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className={undefined}>
                                            This action cannot be undone. This will permanently delete your current budget along with all its expenses.
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className={undefined}>
                                        <AlertDialogCancel className={undefined}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteBudget()} className={undefined}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </h2>
                    <br></br>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                        {budgetInfo ? (
                            <BudgetItem budget={budgetInfo} />
                        ) : (
                            <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-bounce"></div>
                        )}
                        <AddExpense budgetId={params.id}
                            user={user}
                            refreshData={() => getBudgetInfo()}
                        /> {/* ✅ Pass unwrapped params */}
                    </div>
                    <div className='mt-4'>
                        <ExpenseListTable
                            expensesList={expensesList}
                            refreshData={() => getBudgetInfo()}

                        />
                    </div>
                </div>
            </div>
        </>
    );
}
