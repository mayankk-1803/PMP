"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gift, Bookmark, Trash2, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/corporate-kits", label: "Corporate Kits" },
  { href: "/festive-gifting", label: "Festive Gifting" },
  { href: "/packaging-solutions", label: "Packaging" },
  { href: "/about", label: "Company" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items, removeFromShortlist } = useShortlist();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleBulkQuote = () => {
    setIsDrawerOpen(false);
    router.push("/enquiry?source=shortlist");
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white border-b border-gray-100 shadow-sm" 
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gray-900 p-1.5 rounded-lg transition-colors shadow-sm">
                  <Gift className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight text-red-600">
                  PACMYPRODUCT
                </span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-[14px] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none flex items-center justify-center group"
                aria-label="View Shortlist"
              >
                <Bookmark className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 bg-gray-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {items.length}
                  </span>
                )}
              </button>
              
              <Button variant="default" className="rounded-lg px-5 py-2 h-10 text-sm" asChild>
                <Link href="/enquiry">Bulk Enquiry</Link>
              </Button>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {items.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 px-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl text-base shadow-lg shadow-red-100" asChild>
                    <Link href="/enquiry" onClick={() => setIsOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Shortlist Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 p-2 rounded-lg">
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-600">Your Shortlist</h2>
                    <p className="text-xs text-gray-400 font-medium">{items.length} items saved</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <Bookmark className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-red-600 mb-2">Shortlist is empty</h3>
                    <p className="text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">
                      Add products you like to request a bulk quote.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-8 border-gray-200" 
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-gray-200 transition-all">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-red-600 text-sm mb-1 truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-3">{item.price || "Contact for price"}</p>
                        <button 
                          onClick={() => removeFromShortlist(item.title)}
                          className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-gray-100 space-y-3">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-7 rounded-xl text-base shadow-xl shadow-red-100 flex items-center justify-center gap-2 group"
                    onClick={handleBulkQuote}
                  >
                    Request Bulk Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-center text-[11px] text-gray-400 font-medium">
                    Our team typically responds within 2-4 business hours.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

