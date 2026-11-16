import { UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/exlogo.jpg";

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm sm:px-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        aria-label="Budget Bloom dashboard home"
      >
        <Image
          src={img}
          alt=""
          width={44}
          height={44}
          priority
          className="rounded-full"
        />
        <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Budget Bloom
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 sm:inline">Your personal workspace</span>
        <UserButton />
      </div>
    </header>
  );
}

export default DashboardHeader;
