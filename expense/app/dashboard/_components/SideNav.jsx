"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

function SideNav() {
  const menuList = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { name: "Budget", icon: PiggyBank, href: "/dashboard/budgets" },
    { name: "Expenses", icon: ReceiptText, href: "/dashboard/expenses" },
    { name: "Upgrade", icon: ShieldCheck, href: "/dashboard/upgrade" },
  ];

  const path = usePathname();
  console.log("Current Path:", path); // Debugging

  return (
    <div className="h-screen p-5 border shadow-sm w-64 bg-white">
      
      <ul className="mt-6 px-8 space-y-6 text-lg">
        {menuList.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="block">
              <div className={`flex items-center space-x-4 p-3 rounded-md transition hover:text-blue-400 hover:bg-blue-100 ${path === link.href ? "text-primary bg-blue-100" : ""}`}>
                <link.icon size={24} />
                <span>{link.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;