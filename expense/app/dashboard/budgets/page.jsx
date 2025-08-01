"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Menu, X, ArrowLeft } from 'lucide-react'; // Added X for close icon
import DashboardHeader from '../_components/DashboardHeader';  // Assuming DashboardHeader is inside _components folder
import BudgetList from './_components/BudgetList';  // Importing BudgetList component
import { useRouter } from 'next/navigation';

export default function Budgets() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const route = useRouter();// State for sidebar toggle
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
        <div className="p-10 w-full">
          <h2 className="font-bold text-3xl">
            <span className='flex gap-2 items-center'>
              <ArrowLeft onClick={() => route.back()} className='cursor-pointer'>
              </ArrowLeft>
              Budgets
            </span>
          </h2>
          {/* BudgetList Component */}
          <BudgetList />
        </div>
      </div>
    </>
  );
}
