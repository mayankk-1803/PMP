"use client";

import { usePathname } from "next/navigation";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MobileStickyCTA } from "@/components/ui/MobileStickyCTA";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/87564/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ShortlistProvider>
      <Navbar />
      <main className="flex-1 flex flex-col pt-20">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </ShortlistProvider>
  );
}
