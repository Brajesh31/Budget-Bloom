"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { name: "Budgets", icon: PiggyBank, href: "/dashboard/budgets" },
  { name: "Expenses", icon: ReceiptText, href: "/dashboard/expensesdashboard" },
  { name: "About", icon: ShieldCheck, href: "/dashboard/about" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 border-r bg-white p-5 shadow-sm">
      <nav aria-label="Dashboard navigation">
        <ul className="mt-6 space-y-2">
          {menuItems.map(({ name, icon: Icon, href }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={21} aria-hidden="true" />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
