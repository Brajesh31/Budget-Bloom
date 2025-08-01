"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu, X, ArrowLeft } from 'lucide-react';
import { Budgets, Expenses } from "../../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../utils/dbConfig";
import DashboardHeader from '../../dashboard/_components/DashboardHeader';
import ExpenseListTable from '../expenses/[id]/_components/ExpenseListTable';

function expensesdashboard() {

    const { user } = useUser();

    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);
    useEffect(() => {
        user && getBudgetList();
    }, [user])
    const getBudgetList = async () => {

        const result = await db.select({
            ...getTableColumns(Budgets),

            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
        getAllExpenses();
    }
    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);

    }

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const path = usePathname();

    const menuList = [
        { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
        { name: "Budget", icon: PiggyBank, href: "/dashboard/budgets" },
        { name: "Expenses", icon: ReceiptText, href: "/dashboard/expensesdashboard" },
        { name: "About us", icon: ShieldCheck, href: "/dashboard/about" },
    ];
    const handleHamburgerClick = () => setSidebarOpen(!isSidebarOpen);
    const handleCloseSidebar = () => setSidebarOpen(false);

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
                <div className="p-10 w-full">
                    <h2 className="font-bold text-3xl flex justify-between items-center">
                        <span className="flex gap-2 items-center">
                            <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
                            My Expense List
                        </span>
                    </h2>

                    <div className="mt-6">
                        <ExpenseListTable
                            expensesList={expensesList}
                            refreshData={() => getBudgetList()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default expensesdashboard;
