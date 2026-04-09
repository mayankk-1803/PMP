"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gift, Bookmark, Trash2, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";

const LINKS = [
  { href: "/corporate-kits", label: "Corporate Kits" },
  { href: "/festive-gifting", label: "Festive Gifting" },
  { href: "/promotional-merchandise", label: "Merchandise" },
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
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-0" 
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-[#1E3A5F] p-2.5 rounded-xl group-hover:bg-[#11233A] transition-colors shadow-sm">
                  <Gift className="h-5 w-5 text-[#C9A227]" />
                </div>
                <span className="font-bold text-xl tracking-wide text-[#1E3A5F] hidden sm:block">
                  PACMYPRODUCT
                </span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#1E3A5F]/80 hover:text-[#1E3A5F] hover:bg-gray-50 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-[#1E3A5F] hover:text-[#C9A227] transition-colors focus:outline-none flex items-center justify-center group"
                aria-label="View Shortlist"
              >
                <Bookmark className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C9A227] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border-2 border-white transform group-hover:scale-110 transition-transform">
                    {items.length}
                  </span>
                )}
              </button>
              
              <Button variant="gold" className="rounded-full px-8 font-bold" asChild>
                <Link href="/enquiry">Bulk Enquiry</Link>
              </Button>
            </div>

            <div className="flex items-center lg:hidden gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-[#1E3A5F] hover:text-[#C9A227] transition-colors focus:outline-none"
              >
                <Bookmark className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C9A227] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {items.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#1E3A5F] hover:bg-gray-100 p-2 rounded-md focus:outline-none transition-colors"
                aria-label="Mobile Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100 absolute w-full left-0 z-40 overflow-hidden shadow-xl"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-[#1E3A5F] hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-6 pb-2">
                  <Button variant="gold" className="w-full justify-center rounded-xl py-6 text-lg font-bold" asChild>
                    <Link href="/enquiry" onClick={() => setIsOpen(false)}>Bulk Enquiry</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Shortlist Sidebar Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#1E3A5F]/40 backdrop-blur-sm z-50"
              onClick={() => setIsDrawerOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col border-l border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F9FAFB]">
                <div className="flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-[#C9A227]" />
                  <h2 className="text-xl font-bold text-[#1E3A5F]">Your Shortlist</h2>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#1E3A5F] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                    <Bookmark className="w-16 h-16 text-gray-200 mb-4" />
                    <p className="text-[#1E3A5F] font-bold text-lg mb-2">Your list is empty</p>
                    <p className="text-sm text-[#1E3A5F]/70">Save products by clicking the bookmark icon to easily request a bulk quote.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.title} 
                      className="flex gap-4 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-gray-200 transition-colors"
                    >
                      <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-sm text-[#1E3A5F] line-clamp-2 leading-tight mb-1">{item.title}</h4>
                        {item.price && <p className="text-xs font-semibold text-[#C9A227]">{item.price}</p>}
                      </div>
                      <button 
                        onClick={() => removeFromShortlist(item.title)}
                        className="self-center p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-[#F9FAFB]">
                  <p className="text-xs text-[#1E3A5F]/70 mb-4 font-medium text-center">
                    You have {items.length} item{items.length !== 1 ? 's' : ''} in your shortlist.
                  </p>
                  <Button 
                    onClick={handleBulkQuote} 
                    className="w-full py-6 rounded-xl font-bold flex items-center justify-center gap-2 group"
                  >
                    Request Bulk Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

