"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavFooter = pathname === "/auth";
  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
}