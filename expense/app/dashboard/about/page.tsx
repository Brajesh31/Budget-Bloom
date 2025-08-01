"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import aboutImg from "../../../public/dashboard.png";
import DashboardHeader from "../_components/DashboardHeader";

function AboutPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname(); // Current path

  const menuList = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { name: "Budget", icon: PiggyBank, href: "/dashboard/budgets" },
    { name: "Expenses", icon: ReceiptText, href: "/dashboard/expensesdashboard" },
    { name: "About us", icon: ShieldCheck, href: "/dashboard/about" },
  ];

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

        {/* Main Content */}
        <section className="flex-1 bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-16">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={aboutImg}
                alt="About Budget Bloom"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-blue-600 mb-4">About Budget Bloom</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Budget Bloom is more than just an expense tracker—it's your personal guide to financial wellness.
                We believe in making finance simple, accessible, and empowering for everyone. Whether you're saving
                for your dreams or managing everyday spending, Budget Bloom keeps you in control.
              </p>
              <p className="mt-4 text-gray-600">
                Our platform offers smart visualizations, real-time insights, and budgeting tools tailored to your lifestyle.
                We’re here to help your finances bloom—one thoughtful decision at a time.
              </p>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="inline-block rounded bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-black transition duration-300"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20 max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-600">
              {[
                {
                  title: "Simplicity",
                  desc: "We make budgeting clear, clean, and easy to follow for everyone.",
                },
                {
                  title: "Empowerment",
                  desc: "Helping you make better financial decisions with confidence.",
                },
                {
                  title: "Transparency",
                  desc: "No fluff. Just honest, data-driven insights you can trust.",
                },
                {
                  title: "Well-being",
                  desc: "Because smart money leads to a stress-free mind and life.",
                },
              ].map((val) => (
                <div key={val.title}>
                  <h4 className="text-xl font-semibold text-blue-600">{val.title}</h4>
                  <p className="mt-2">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
