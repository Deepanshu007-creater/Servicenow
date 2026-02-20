import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ServiceNow SaaS Starter",
  description: "Production-ready SaaS authentication starter with Next.js 14"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
