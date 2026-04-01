"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Gift } from "lucide-react";
import { Button } from "../ui/Button";

const LINKS = [
  { href: "/corporate-kits", label: "Corporate Kits" },
  { href: "/festive-gifting", label: "Festive Gifting" },
  { href: "/promotional-merchandise", label: "Merchandise" },
  { href: "/industry-solutions", label: "Industries" },
  { href: "/packaging-solutions", label: "Packaging" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                PACMYPRODUCT
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button variant="ghost">Contact Us</Button>
            </Link>
            <Link href="/enquiry">
              <Button variant="gradient">Request Quote</Button>
            </Link>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-[#0A0A0A] border-b border-gray-800 absolute w-full left-0 z-50 overflow-hidden"
        >
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/gifts-by-budget"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-primary hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Gifts by Budget
            </Link>
            <div className="px-3 pt-4 flex flex-col gap-3">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-center">Contact Us</Button>
              </Link>
              <Link href="/enquiry" onClick={() => setIsOpen(false)}>
                <Button variant="gradient" className="w-full justify-center">Request Quote</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

