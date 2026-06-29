"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Gift, Bookmark, Trash2, ArrowRight, ChevronDown, 
  Briefcase, Sparkles, Coins, Phone, Mail
} from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";
import { 
  COMPANY_INFO, 
  BUDGETS,
  PRODUCTS,
  PRODUCT_HIERARCHY,
  CORPORATE_KITS,
  OCCASION_HAMPERS
} from "@/data/siteConfig";
import { SafeImage } from "../ui/SafeImage";

interface MenuSubcategory {
  name: string;
  slug: string;
  category?: string;
  parentGroup?: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [mounted, setMounted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const { items, removeFromShortlist } = useShortlist();
  const router = useRouter();
  const pathname = usePathname() || "";
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu or shortlist drawer is open
  useEffect(() => {
    if (isOpen || isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isDrawerOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBulkQuote = () => {
    setIsDrawerOpen(false);
    router.push("/enquiry?source=shortlist");
  };

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const menuHref = (item: any) => `/products?subcategory=${encodeURIComponent(item.slug)}`;
  const kitHref = (item: any) => `/corporate-kits?kit=${item.slug}`;

  const promotionalCats = PRODUCT_HIERARCHY[0]?.categories || [];

  const getSubcategories = (catSlug: string) => {
    const cat = promotionalCats.find((c) => c.slug === catSlug);
    return cat ? cat.subcategories : [];
  };

  const corporateKits = CORPORATE_KITS;

  const festiveHampers = OCCASION_HAMPERS;

  return (
    <>
      <motion.header 
        initial={mounted ? { y: -100 } : false}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-45 flex flex-col pointer-events-none"
      >
        {/* Main Navigation Bar */}
        <nav 
          className={`w-full transition-all duration-300 pointer-events-auto ${
            scrolled 
              ? "organic-navbar-scrolled" 
              : "organic-navbar"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[72px] lg:h-20">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="bg-gradient-to-br from-[#6E7757] to-[#4E583F] p-2.5 rounded-xl transition-all duration-500 group-hover:scale-105 shadow-[0_0_15px_rgba(110,119,87,0.3)]">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-black text-xl tracking-wider text-[#2B2B2B] transition-colors">
                    PACMY<span className="text-[#6E7757]">PRODUCT</span>
                  </span>
                </Link>
              </div>
              
              {/* Desktop Mega Menu Navigation */}
              <motion.div
                ref={menuRef}
                initial={mounted ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.06, delayChildren: 0.3 }}
                className="hidden lg:flex items-center space-x-2"
              >
                
                {/* 1. Promotional Products Dropdown */}
                <div className="relative group/nav-item">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleDropdown("products")}
                    className={`relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-3 py-2 rounded-xl transition-all duration-300 ${
                      activeDropdown === "products" || pathname.startsWith("/products") || pathname.startsWith("/promotional-merchandise")
                        ? "text-[#6E7757]" 
                        : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>Promotional Products</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                      activeDropdown === "products" || pathname.startsWith("/products") || pathname.startsWith("/promotional-merchandise") ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === "products" && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute left-0 mt-3 w-[min(980px,calc(100vw-2rem))] max-h-[72vh] overflow-hidden rounded-2xl border border-[#DDD5C8] bg-white p-5 shadow-[0_20px_50px_rgba(43,43,43,0.12)] z-50 grid grid-cols-12 gap-5 pointer-events-auto"
                      >
                        <div className="col-span-8 text-left">
                          <h4 className="text-[11px] font-bold text-[#2B2B2B] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Gift className="w-3.5 h-3.5 text-[#6E7757]" /> Promotional Categories
                          </h4>
                          <div className="grid max-h-[52vh] grid-cols-3 gap-x-6 gap-y-5 overflow-y-auto pr-2">
                            {promotionalCats.map((cat) => {
                              const subs = getSubcategories(cat.slug);
                              return (
                                <div key={cat.slug} className="min-w-0">
                                  <Link
                                    href={`/products?category=${cat.slug}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="mb-2 block text-[10px] font-extrabold uppercase tracking-widest text-[#6E7757] hover:text-[#4E583F] transition-colors"
                                  >
                                    {cat.name}
                                  </Link>
                                  {subs.length > 0 && (
                                    <div className="space-y-1">
                                      {subs.map((item) => (
                                        <Link
                                          key={item.name}
                                          href={menuHref(item)}
                                          onClick={() => setActiveDropdown(null)}
                                          className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-[#6B6B63] transition-colors hover:border-[#6E7757] hover:bg-[#F8F5EF] hover:text-[#6E7757]"
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 3: Featured Panel */}
                        <div className="col-span-4 flex flex-col justify-between bg-gradient-to-br from-[#F8F5EF] to-[#EFE7DB] rounded-xl p-4 border border-[#DDD5C8] text-left">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#C8A36A] uppercase tracking-widest block mb-1">Trending Solution</span>
                            <h4 className="text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                              Premium Corporate Gifting
                            </h4>
                            <p className="text-[11px] text-[#6B6B63] leading-normal mb-3 font-medium">
                              Employee welcome kits, executive gift sets, custom branding, premium giveaways.
                            </p>
                          </div>
                          <Link
                            href="/promotional-merchandise"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E7757] hover:text-[#4E583F] transition-colors uppercase tracking-wider"
                          >
                            Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  
                {/* 2. Kits & Hampers Dropdown */}
                <div className="relative group/nav-item">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleDropdown("kits")}
                    className={`relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-3 py-2 rounded-xl transition-all duration-300 ${
                      activeDropdown === "kits" || pathname.startsWith("/corporate-kits")
                        ? "text-[#6E7757]" 
                        : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>Kits &amp; Hampers</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "kits" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                      activeDropdown === "kits" || pathname.startsWith("/corporate-kits") ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === "kits" && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-[min(980px,calc(100vw-2rem))] max-h-[72vh] overflow-hidden rounded-2xl border border-[#DDD5C8] bg-white p-5 shadow-[0_20px_50px_rgba(43,43,43,0.12)] z-50 grid grid-cols-12 gap-5 pointer-events-auto"
                      >
                        {/* Column 1: Corporate Kits */}
                        <div className="col-span-5 text-left">
                          <h4 className="text-[11px] font-bold text-[#2B2B2B] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-[#6E7757]" /> Corporate Kits
                          </h4>
                          <div className="grid max-h-[52vh] grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto pr-2">
                            {corporateKits.map((item) => (
                              <Link
                                key={item.name}
                                href={kitHref(item)}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-[#6B6B63] transition-colors hover:border-[#6E7757] hover:bg-[#F8F5EF] hover:text-[#6E7757]"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Festive Hampers */}
                        <div className="col-span-4 text-left">
                          <h4 className="text-[11px] font-bold text-[#2B2B2B] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#C8A36A]" /> Festive Hampers
                          </h4>
                          <div className="max-h-[52vh] space-y-1 overflow-y-auto pr-2">
                            {festiveHampers.map((item) => (
                              <Link
                                key={item.name}
                                href={kitHref(item)}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-[#6B6B63] transition-colors hover:border-[#C8A36A] hover:bg-[#F8F5EF] hover:text-[#6E7757]"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured Panel */}
                        <div className="col-span-3 flex flex-col justify-between rounded-xl border border-[#DDD5C8] bg-gradient-to-br from-[#EFE7DB] to-[#F8F5EF] p-4 text-left">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#C8A36A] uppercase tracking-widest block mb-1">Kit Onboarding</span>
                            <h4 className="text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                              Curated Corporate Kits
                            </h4>
                            <p className="text-[11px] text-[#6B6B63] leading-normal mb-3 font-medium">
                              Onboarding kits, dealer welcome packs, startup collections, custom branded hampers.
                            </p>
                          </div>
                          <Link
                            href="/corporate-kits"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E7757] hover:text-[#4E583F] transition-colors uppercase tracking-wider"
                          >
                            Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  
  
                {/* 4. Budget Dropdown */}
                <div className="relative group/nav-item">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleDropdown("budget")}
                    className={`relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-3 py-2 rounded-xl transition-all duration-300 ${
                      activeDropdown === "budget" || pathname.startsWith("/gifts-by-budget")
                        ? "text-[#6E7757]" 
                        : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>Budget</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "budget" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                      activeDropdown === "budget" || pathname.startsWith("/gifts-by-budget") ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === "budget" && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute right-0 mt-3 w-[240px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(43,43,43,0.12)] border border-[#DDD5C8] p-4 z-50 space-y-1 pointer-events-auto"
                      >
                        <h4 className="text-[11px] font-bold text-[#2B2B2B] uppercase tracking-wide px-3 py-1 mb-2 flex items-center gap-2">
                          <Coins className="w-3.5 h-3.5 text-[#C8A36A]" /> Shop by Budget
                        </h4>
                        {BUDGETS.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block text-[13px] text-[#6B6B63] hover:text-[#6E7757] hover:bg-[#F8F5EF] font-medium px-3 py-2 rounded-lg transition-all"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  
                {/* 3. Packaging Link */}
                <Link
                  href="/packaging-solutions"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/packaging-solutions" ? "text-[#6E7757]" : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                  }`}
                >
                  <span>Packaging</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                    pathname === "/packaging-solutions" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>

                {/* 5. Brands Link */}
                <Link
                  href="/brands"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/brands" ? "text-[#6E7757]" : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                  }`}
                >
                  <span>Brands</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                    pathname === "/brands" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>

                {/* 6. Company Link */}
                <Link
                  href="/about"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/about" ? "text-[#6E7757]" : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                  }`}
                >
                  <span>Company</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                    pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>
                
                {/* 7. Contact Link */}
                <Link
                  href="/contact"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/contact" ? "text-[#6E7757]" : "text-[#2B2B2B]/80 hover:text-[#2B2B2B]"
                  }`}
                >
                  <span>Contact</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#C8A36A] origin-left transition-transform duration-300 ${
                    pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>
              </motion.div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <button 
                  suppressHydrationWarning
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-2.5 text-[#6B6B63] hover:text-[#2B2B2B] hover:bg-[#EFE7DB] rounded-xl transition-all focus:outline-none flex items-center justify-center group pointer-events-auto"
                  aria-label="View Shortlist"
                >
                  <Bookmark className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {mounted && items.length > 0 && (
                    <span className="absolute top-1 right-1 bg-[#6E7757] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
                      {items.length}
                    </span>
                  )}
                </button>
                
                <Button variant="default" className="rounded-2xl px-6 py-2.5 h-11 text-[13px] font-bold pointer-events-auto" asChild>
                  <Link href="/enquiry">Get Custom Quote</Link>
                </Button>
              </div>

              {/* Mobile Actions Menu Trigger */}
              <div className="lg:hidden flex items-center gap-2 pointer-events-auto">
                <button 
                  suppressHydrationWarning
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-2.5 text-[#6B6B63] hover:bg-[#EFE7DB] rounded-xl transition-all"
                >
                  <Bookmark className="w-5.5 h-5.5" />
                  {mounted && items.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-[#6E7757] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
                      {items.length}
                    </span>
                  )}
                </button>
                <motion.button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(!isOpen)}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-2.5 rounded-xl text-[#6B6B63] hover:bg-[#EFE7DB] focus:outline-none transition-colors"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
              </div>

            </div>
          </div>
        </nav>

        {/* Mobile Full Screen Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-0 z-[999] bg-[#F8F5EF] overflow-y-auto flex flex-col pointer-events-auto"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center h-[72px] px-5 border-b border-[#DDD5C8] flex-shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-[#6E7757] to-[#4E583F] p-2.5 rounded-xl">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-black text-xl tracking-wider text-[#2B2B2B]">
                    PACMY<span className="text-[#6E7757]">PRODUCT</span>
                  </span>
                </Link>
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl text-[#6B6B63] hover:bg-[#EFE7DB] focus:outline-none transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Collapsible Accordion Navigation Items */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
                className="flex-1 px-6 py-6 space-y-2"
              >
                
                {/* 1. Promotional Products Accordion */}
                <div className="border-b border-[#DDD5C8]">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("products")}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Promotional Products</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B6B63] transition-transform duration-300 ${expandedSection === "products" ? "rotate-180 text-[#6E7757]" : "group-hover:text-[#2B2B2B]"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === "products" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pb-4"
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pl-2 pt-1">
                          <Link
                            key="explore-all-products"
                            href="/products"
                            onClick={() => setIsOpen(false)}
                            className="col-span-2 text-xs font-extrabold text-[#6E7757] hover:text-[#4E583F] uppercase tracking-widest py-1 flex items-center gap-1"
                          >
                            Explore All Products <ArrowRight className="w-3 h-3" />
                          </Link>
                            {promotionalCats.map((cat) => (
                              <div key={cat.slug} className="col-span-2 mt-2 first:mt-0">
                                <h5 className="text-[10px] font-extrabold text-[#6E7757] uppercase tracking-wider mb-1">{cat.name}</h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {getSubcategories(cat.slug).map((item) => (
                                    <Link
                                      key={item.name}
                                      href={menuHref(item)}
                                      onClick={() => setIsOpen(false)}
                                      className="text-sm font-semibold text-[#6B6B63] hover:text-[#2B2B2B] py-1 block truncate transition-colors"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Kits & Hampers Accordion */}
                <div className="border-b border-[#DDD5C8]">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("kits")}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Kits &amp; Hampers</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B6B63] transition-transform duration-300 ${expandedSection === "kits" ? "rotate-180 text-[#6E7757]" : "group-hover:text-[#2B2B2B]"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === "kits" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pb-4"
                      >
                        <div className="pl-2 space-y-4 pt-1">
                          <div>
                            <h4 className="text-[10px] font-extrabold text-[#6E7757] uppercase tracking-widest mb-2">Corporate Kits</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {corporateKits.map((item) => (
                                <Link
                                  key={item.name}
                                  href={kitHref(item)}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sm font-semibold text-[#6B6B63] hover:text-[#2B2B2B] py-1 block truncate transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-[#DDD5C8]">
                            <h4 className="text-[10px] font-extrabold text-[#C8A36A] uppercase tracking-widest mb-2">Festive Hampers</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {festiveHampers.map((item) => (
                                <Link
                                  key={item.name}
                                  href={kitHref(item)}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sm font-semibold text-[#6B6B63] hover:text-[#2B2B2B] py-1 block truncate transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <Link
                            key="explore-all-kits"
                            href="/corporate-kits"
                            onClick={() => setIsOpen(false)}
                            className="block text-xs font-extrabold text-[#6E7757] hover:text-[#4E583F] uppercase tracking-widest pt-1 flex items-center gap-1"
                          >
                            Explore All Kits <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Budget Accordion */}
                <div className="border-b border-[#DDD5C8]">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("budget")}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Budget</span>
                    <ChevronDown className={`w-4 h-4 text-[#6B6B63] transition-transform duration-300 ${expandedSection === "budget" ? "rotate-180 text-[#6E7757]" : "group-hover:text-[#2B2B2B]"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSection === "budget" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pb-4"
                      >
                        <div className="grid grid-cols-2 gap-2 pl-2 pt-1">
                          {BUDGETS.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-semibold text-[#6B6B63] hover:text-[#2B2B2B] py-1 block truncate transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Direct Link: Packaging */}
                <div className="border-b border-[#DDD5C8]">
                  <Link
                    key="packaging-solutions"
                    href="/packaging-solutions"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left hover:text-[#6E7757] transition-colors"
                  >
                    Packaging
                  </Link>
                </div>

                {/* 5. Direct Link: Company */}
                <div className="border-b border-[#DDD5C8]">
                  <Link
                    key="about-company"
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left hover:text-[#6E7757] transition-colors"
                  >
                    Company
                  </Link>
                </div>

                {/* 6. Direct Link: Contact */}
                <div className="border-b border-[#DDD5C8]">
                  <Link
                    key="contact-us"
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center w-full py-4 text-[#2B2B2B] text-base font-bold text-left hover:text-[#6E7757] transition-colors"
                  >
                    Contact
                  </Link>
                </div>

              </motion.div>

              {/* Footer inside drawer */}
              <div className="px-6 py-8 border-t border-[#DDD5C8] bg-[#EFE7DB] space-y-4 flex-shrink-0">
                <Button 
                  className="w-full py-6 rounded-2xl text-base font-bold flex items-center justify-center gap-2"
                  asChild
                >
                  <Link href="/enquiry" onClick={() => setIsOpen(false)}>
                    Get Custom Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <div className="flex justify-center gap-8 text-xs text-[#6B6B63] font-bold">
                  <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-[#2B2B2B] transition-colors">
                    <Phone className="w-3.5 h-3.5" /> Call Us
                  </a>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-[#2B2B2B] transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

    {/* Shortlist Drawer */}
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-[#2B2B2B]/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-[#DDD5C8] shadow-[0_0_60px_rgba(43,43,43,0.15)] z-50 flex flex-col"
          >
            <div className="p-6 border-b border-[#DDD5C8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#6E7757] to-[#4E583F] p-2.5 rounded-xl shadow-lg shadow-[#6E7757]/15">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#2B2B2B]">Your Custom Selection</h2>
                  <p className="text-xs text-[#6B6B63] font-bold">{items.length} items saved</p>
                </div>
              </div>
              <button 
                suppressHydrationWarning
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-[#EFE7DB] rounded-full transition-colors text-[#6B6B63] hover:text-[#2B2B2B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8F5EF]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-[#EFE7DB] border border-[#DDD5C8] rounded-full flex items-center justify-center mb-6">
                    <Bookmark className="w-8 h-8 text-[#6B6B63]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2B2B2B] mb-2">Shortlist is empty</h3>
                  <p className="text-[#6B6B63] text-xs max-w-[240px] mx-auto leading-relaxed">
                    Add premium products and kits while browsing to request a compiled bulk quote.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6" 
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-white border border-[#DDD5C8] rounded-xl shadow-sm group hover:border-[#6E7757]/30 transition-all">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F8F5EF] border border-[#DDD5C8] flex-shrink-0 relative">
                      <SafeImage 
                        src={item.imageUrl} 
                        alt={item.title} 
                        category={Object.values(PRODUCTS).find(p => p.title === item.title)?.category}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-[#2B2B2B] text-sm mb-0.5 truncate">{item.title}</h4>
                        <p className="text-xs font-semibold text-[#6E7757]">{item.price || "Contact for price"}</p>
                      </div>
                      <button 
                        suppressHydrationWarning
                        onClick={() => removeFromShortlist(item.title)}
                        className="text-xs font-bold text-[#6B6B63] hover:text-[#6E7757] flex items-center gap-1.5 transition-colors mt-2"
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
              <div className="p-6 bg-white border-t border-[#DDD5C8] space-y-4">
                <Button 
                  className="w-full py-6 rounded-2xl text-base font-bold flex items-center justify-center gap-2 group"
                  onClick={handleBulkQuote}
                >
                  Request Bulk Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[10px] text-[#6B6B63] font-bold">
                  🛡️ Enterprise SLA: Quote compiled within 2 hours
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
