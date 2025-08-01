"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu, X } from "lucide-react"; // Added X for close icon
import DashboardHeader from '../dashboard/_components/DashboardHeader'; // Corrected typo
import { useUser } from "@clerk/nextjs";
import CardInfo from '../dashboard/_components/CardInfo';
import { Budgets, Expenses } from "../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../../utils/dbConfig";
import BarChartDashboard from '../dashboard/_components/BarChartDashboard'
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/[id]/_components/ExpenseListTable";
function SideNav() {
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
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  const menuList = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { name: "Budget", icon: PiggyBank, href: "/dashboard/budgets" },
    { name: "Expenses", icon: ReceiptText, href: "/dashboard/expensesdashboard" },
    { name: "About us", icon: ShieldCheck, href: "/dashboard/about" },
  ];

  const path = usePathname();

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
        <div className="p-5">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">Hi, {user?.fullName}</h2>
          <br></br>
          <p className="text-gray-500 text-sm md:text-base lg:text-lg">Welcome to your dashboard!</p>
          <div className="w-full mt-4">
            <CardInfo budgetList={budgetList} />
            <br></br>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
            <div className="md:col-span-2">
              <BarChartDashboard
                budgetList={budgetList} />
              <br></br>
              <ExpenseListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
              />
            </div>
            {/* <br></br> */}
            <div className="grid gap-5 w-2xs">
              <h2 className="font-bold text-3xl">Latest Budgets</h2>
              {budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default SideNav;
