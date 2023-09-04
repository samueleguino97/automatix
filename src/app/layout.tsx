import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarLayout, { classNames } from "../components/sidebar-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automatix",
  description: "An app to rule all apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className={inter.className + " h-full"}>{children}</body>
    </html>
  );
}
