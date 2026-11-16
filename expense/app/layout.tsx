import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../@/components/ui/sonner";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Budget Bloom | Personal Budget Tracker",
    template: "%s | Budget Bloom",
  },
  description:
    "Organize budgets, record expenses, and understand your spending with Budget Bloom.",
  applicationName: "Budget Bloom",
  keywords: ["budget tracker", "expense tracker", "personal finance", "budget planning"],
  icons: {
    icon: "/icon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={oxanium.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
