import type { Metadata } from "next";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export const metadata: Metadata = {
  title: "Personal Budget and Expense Tracker",
  description:
    "Plan your budgets, track everyday expenses, and see where your money goes with Budget Bloom.",
  openGraph: {
    title: "Budget Bloom",
    description: "A simpler way to organize budgets and track expenses.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
      </main>
    </>
  );
}
