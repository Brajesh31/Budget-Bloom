import { Oxanium } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../@/components/ui/sonner"


const oxanium = Oxanium({
  subsets: ["latin"], // ✅ Add this line
});

export const metadata = {
  title: "Budget Bloom App",
  description: "Track your expenses and save money!",
  icons: {
    icon: "/icon.ico", 
  },
   
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={oxanium.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
