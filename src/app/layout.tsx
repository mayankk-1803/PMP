import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MobileStickyCTA } from "@/components/ui/MobileStickyCTA";
import { ShortlistProvider } from "@/context/ShortlistContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Corporate Gifting & Custom Swag | PacMyProduct",
  description: "Luxury corporate gifting, custom branding, and bulk employee welcome kits. Discover our curated, premium B2B gift collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased overflow-x-hidden max-w-full`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative bg-white text-gray-900 selection:bg-gray-900 selection:text-white overflow-x-hidden max-w-full">
        <ShortlistProvider>
          <Navbar />
          <main className="flex-1 flex flex-col pt-20">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <MobileStickyCTA />
        </ShortlistProvider>
      </body>
    </html>
  );
}
