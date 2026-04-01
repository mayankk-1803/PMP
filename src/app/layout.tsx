import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corporate Gifting & Packaging Solutions India | PacMyProduct",
  description: "Premium corporate gifting, custom packaging, and bulk gifting solutions across India. Trusted by 100+ businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col pt-20 relative">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        
        {/* Global Sticky CTA */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a 
            href="https://wa.me/919818601834"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
        </div>
      </body>
    </html>
  );
}
