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
  PRODUCTS
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
  const [promotionalMenu, setPromotionalMenu] = useState<MenuSubcategory[]>([]);
  const [corporateKitMenu, setCorporateKitMenu] = useState<MenuSubcategory[]>([]);
  const [hamperMenu, setHamperMenu] = useState<MenuSubcategory[]>([]);
  
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

  useEffect(() => {
    fetch("/api/catalog/subcategories")
      .then((response) => response.json())
      .then((payload) => {
        const subcategories = (payload.data ?? []) as MenuSubcategory[];
        setPromotionalMenu(
          subcategories.filter((item) => item.parentGroup === "Promotional Products")
        );
        setCorporateKitMenu(
          subcategories.filter((item) => item.category === "corporate-kits" || item.parentGroup === "Corporate Kits")
        );
        setHamperMenu(
          subcategories.filter((item) => item.category === "festive-hampers" || item.parentGroup === "Festive Hampers")
        );
      })
      .catch(() => {
        setPromotionalMenu([]);
        setCorporateKitMenu([]);
        setHamperMenu([]);
      });
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

  const menuHref = (item: MenuSubcategory) => `/products?subcategory=${encodeURIComponent(item.slug)}`;
  const kitHref = (item: MenuSubcategory) => `/corporate-kits?kit=${item.slug.replace(/-kits$|-hampers$|-gifts$/g, "")}`;
  const promotionalGroups = promotionalMenu.reduce<Record<string, MenuSubcategory[]>>((groups, item) => {
    const key = item.category || "promotional-products";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
  const promotionalGroupEntries = Object.entries(promotionalGroups);
  const formatGroupLabel = (value: string) => value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");

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
              ? "bg-[#0c0a09]/95 border-b border-white/10 shadow-xl backdrop-blur-xl" 
              : "bg-[#0c0a09]/80 border-b border-white/5 backdrop-blur-md shadow-md"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[72px] lg:h-20">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="bg-gradient-to-br from-red-600 to-rose-600 p-2.5 rounded-xl transition-all duration-500 group-hover:scale-105 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-black text-xl tracking-wider text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-colors">
                    PACMY<span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.2)]">PRODUCT</span>
                  </span>
                </Link>
              </div>
              
              {/* Desktop Mega Menu Navigation */}
              <div ref={menuRef} className="hidden lg:flex items-center space-x-2">
                
                {/* 1. Promotional Products Dropdown */}
                <div className="relative group/nav-item">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleDropdown("products")}
                    className={`relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-3 py-2 rounded-xl transition-all duration-300 ${
                      activeDropdown === "products" || pathname.startsWith("/products") || pathname.startsWith("/promotional-merchandise")
                        ? "text-red-500" 
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>Promotional Products</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
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
                        className="absolute left-0 mt-3 w-[min(980px,calc(100vw-2rem))] max-h-[72vh] overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-2xl z-50 grid grid-cols-12 gap-5 pointer-events-auto"
                      >
                        <div className="col-span-8 text-left">
                          <h4 className="text-[11px] font-bold text-black uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Gift className="w-3.5 h-3.5 text-red-500" /> Product Subcategories
                          </h4>
                          <div className="grid max-h-[52vh] grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto pr-2">
                            {promotionalGroupEntries.map(([group, entries]) => (
                              <div key={group} className="min-w-0">
                                <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                                  {formatGroupLabel(group)}
                                </div>
                                <div className="space-y-1">
                                  {entries.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={menuHref(item)}
                                      onClick={() => setActiveDropdown(null)}
                                      className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-gray-700 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured Panel */}
                        <div className="col-span-4 flex flex-col justify-between bg-gradient-to-br from-red-50/70 to-amber-50/50 rounded-xl p-4 border border-red-100/30 text-left">
                          <div>
                            <span className="text-[9px] font-extrabold text-red-600 uppercase tracking-widest block mb-1">Trending Solution</span>
                            <h4 className="text-[13px] font-bold text-black mb-1.5">
                              Premium Corporate Gifting
                            </h4>
                            <p className="text-[11px] text-gray-650 leading-normal mb-3 font-medium">
                              Employee welcome kits, executive gift sets, custom branding, premium giveaways.
                            </p>
                          </div>
                          
                          <div className="relative h-20 w-full rounded-lg overflow-hidden mb-3 bg-neutral-100 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=600&auto=format&fit=crop"
                              alt="Premium Gifting"
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <Link
                            href="/promotional-merchandise"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
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
                        ? "text-red-500" 
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>Kits & Hampers</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "kits" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
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
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-[min(980px,calc(100vw-2rem))] max-h-[72vh] overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-2xl z-50 grid grid-cols-12 gap-5 pointer-events-auto"
                      >
                        {/* Column 1: Corporate Kits */}
                        <div className="col-span-5 text-left">
                          <h4 className="text-[11px] font-bold text-black uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-red-500" /> Corporate Kits
                          </h4>
                          <div className="grid max-h-[52vh] grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto pr-2">
                            {corporateKitMenu.map((item) => (
                              <Link
                                key={item.name}
                                href={kitHref(item)}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-gray-750 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Festive Hampers */}
                        <div className="col-span-4 text-left">
                          <h4 className="text-[11px] font-bold text-black uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Festive Hampers
                          </h4>
                          <div className="max-h-[52vh] space-y-1 overflow-y-auto pr-2">
                            {hamperMenu.map((item) => (
                              <Link
                                key={item.name}
                                href={kitHref(item)}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-md border-l border-transparent py-1.5 pl-2 text-[13px] font-medium leading-snug text-gray-750 transition-colors hover:border-red-500 hover:bg-amber-50 hover:text-red-650"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: Featured Panel */}
                        <div className="col-span-3 flex flex-col justify-between rounded-xl border border-amber-100/30 bg-gradient-to-br from-amber-50/70 to-red-50/50 p-4 text-left">
                          <div>
                            <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest block mb-1">Kit Onboarding</span>
                            <h4 className="text-[13px] font-bold text-black mb-1.5">
                              Curated Corporate Kits
                            </h4>
                            <p className="text-[11px] text-gray-650 leading-normal mb-3 font-medium">
                              Onboarding kits, dealer welcome packs, startup collections, custom branded hampers.
                            </p>
                          </div>
                          
                          <div className="relative h-20 w-full rounded-lg overflow-hidden mb-3 bg-neutral-100 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80"
                              alt="Corporate Kits"
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <Link
                            href="/corporate-kits"
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
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
                        ? "text-red-500" 
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>Budget</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === "budget" ? "rotate-180" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
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
                        className="absolute right-0 mt-3 w-[240px] bg-white rounded-2xl shadow-2xl border border-black/5 p-4 z-50 space-y-1 pointer-events-auto"
                      >
                        <h4 className="text-[11px] font-bold text-black uppercase tracking-wide px-3 py-1 mb-2 flex items-center gap-2">
                          <Coins className="w-3.5 h-3.5 text-amber-500" /> Shop by Budget
                        </h4>
                        {BUDGETS.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block text-[13px] text-gray-750 hover:text-red-650 hover:bg-black/5 font-medium px-3 py-2 rounded-lg transition-all"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  
                {/* 5. Brands Link */}
                <Link
                  href="/brands"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/brands" ? "text-red-500" : "text-white/90 hover:text-white"
                  }`}
                >
                  <span>Brands</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
                    pathname === "/brands" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>

                {/* 6. Company Link */}
                <Link
                  href="/about"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/about" ? "text-red-500" : "text-white/90 hover:text-white"
                  }`}
                >
                  <span>Company</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
                    pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>
                
                {/* 7. Contact Link */}
                <Link
                  href="/contact"
                  className={`relative group/nav-item px-3 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 block ${
                    pathname === "/contact" ? "text-red-500" : "text-white/90 hover:text-white"
                  }`}
                >
                  <span>Contact</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-red-600 to-amber-500 origin-left transition-transform duration-300 ${
                    pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover/nav-item:scale-x-100"
                  }`} />
                </Link>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <button 
                  suppressHydrationWarning
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all focus:outline-none flex items-center justify-center group pointer-events-auto"
                  aria-label="View Shortlist"
                >
                  <Bookmark className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {mounted && items.length > 0 && (
                    <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-black">
                      {items.length}
                    </span>
                  )}
                </button>
                
                <Button variant="default" className="rounded-xl px-6 py-2.5 h-11 text-[13px] font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/35 hover:scale-[1.02] transition-all duration-300 border-0 pointer-events-auto" asChild>
                  <Link href="/enquiry">Get Custom Quote</Link>
                </Button>
              </div>

              {/* Mobile Actions Menu Trigger */}
              <div className="lg:hidden flex items-center gap-2 pointer-events-auto">
                <button 
                  suppressHydrationWarning
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-2.5 text-gray-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <Bookmark className="w-5.5 h-5.5" />
                  {mounted && items.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-black">
                      {items.length}
                    </span>
                  )}
                </button>
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-xl text-gray-300 hover:bg-white/5 focus:outline-none transition-colors"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
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
              className="lg:hidden fixed inset-0 z-[999] bg-[#050505]/96 backdrop-blur-3xl overflow-y-auto flex flex-col pointer-events-auto"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center h-[72px] px-5 border-b border-white/10 flex-shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-red-600 to-rose-600 p-2.5 rounded-xl">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-black text-xl tracking-wider text-white">
                    PACMY<span className="text-red-600">PRODUCT</span>
                  </span>
                </Link>
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl text-gray-300 hover:bg-white/5 focus:outline-none transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Collapsible Accordion Navigation Items */}
              <div className="flex-1 px-6 py-6 space-y-2">
                
                {/* 1. Promotional Products Accordion */}
                <div className="border-b border-white/10">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("products")}
                    className="flex justify-between items-center w-full py-4 text-white/90 text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Promotional Products</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedSection === "products" ? "rotate-180 text-red-500" : "group-hover:text-white"}`} />
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
                            className="col-span-2 text-xs font-extrabold text-red-500 hover:text-red-400 uppercase tracking-widest py-1 flex items-center gap-1"
                          >
                            Explore All Products <ArrowRight className="w-3 h-3" />
                          </Link>
                              {promotionalMenu.map((item) => (
                            <Link
                              key={item.name}
                              href={menuHref(item)}
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-semibold text-gray-400 hover:text-white py-1 block truncate transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Kits & Hampers Accordion */}
                <div className="border-b border-white/10">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("kits")}
                    className="flex justify-between items-center w-full py-4 text-white/90 text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Kits & Hampers</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedSection === "kits" ? "rotate-180 text-red-500" : "group-hover:text-white"}`} />
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
                            <h4 className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest mb-2">Corporate Kits</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {corporateKitMenu.map((item) => (
                                <Link
                                  key={item.name}
                                  href={kitHref(item)}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sm font-semibold text-gray-400 hover:text-white py-1 block truncate transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5">
                            <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-2">Festive Hampers</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {hamperMenu.map((item) => (
                                <Link
                                  key={item.name}
                                  href={kitHref(item)}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sm font-semibold text-gray-400 hover:text-white py-1 block truncate transition-colors"
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
                            className="block text-xs font-extrabold text-red-500 hover:text-red-400 uppercase tracking-widest pt-1 flex items-center gap-1"
                          >
                            Explore All Kits <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Budget Accordion */}
                <div className="border-b border-white/10">
                  <button 
                    suppressHydrationWarning
                    onClick={() => toggleSection("budget")}
                    className="flex justify-between items-center w-full py-4 text-white/90 text-base font-bold text-left focus:outline-none group"
                  >
                    <span>Budget</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedSection === "budget" ? "rotate-180 text-red-500" : "group-hover:text-white"}`} />
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
                              className="text-sm font-semibold text-gray-400 hover:text-white py-1 block truncate transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Direct Link: Company */}
                <div className="border-b border-white/10">
                  <Link
                    key="about-company"
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center w-full py-4 text-white/90 text-base font-bold text-left hover:text-red-500 transition-colors"
                  >
                    Company
                  </Link>
                </div>

                {/* 6. Direct Link: Contact */}
                <div className="border-b border-white/10">
                  <Link
                    key="contact-us"
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center w-full py-4 text-white/90 text-base font-bold text-left hover:text-red-500 transition-colors"
                  >
                    Contact
                  </Link>
                </div>

              </div>

              {/* Footer inside drawer */}
              <div className="px-6 py-8 border-t border-white/10 bg-[#050505]/40 backdrop-blur-xl space-y-4 flex-shrink-0">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-6 rounded-xl text-base shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 font-bold border-0"
                  asChild
                >
                  <Link href="/enquiry" onClick={() => setIsOpen(false)}>
                    Get Custom Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <div className="flex justify-center gap-8 text-xs text-gray-500 font-bold">
                  <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5" /> Call Us
                  </a>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

    {/* Shortlist Drawer (Persisted data-flow) */}
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0c] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a0a0c]">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-600 to-rose-600 p-2.5 rounded-xl shadow-lg shadow-red-600/15">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">Your Custom Selection</h2>
                  <p className="text-xs text-gray-500 font-bold">{items.length} items saved</p>
                </div>
              </div>
              <button 
                suppressHydrationWarning
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#070708]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
                    <Bookmark className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-300 mb-2">Shortlist is empty</h3>
                  <p className="text-gray-500 text-xs max-w-[240px] mx-auto leading-relaxed">
                    Add premium products and kits while browsing to request a compiled bulk quote.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6 border-white/10 hover:border-white text-gray-300 hover:bg-white/5 transition-colors" 
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl shadow-sm group hover:border-red-500/30 transition-all">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 relative">
                      <SafeImage 
                        src={item.imageUrl} 
                        alt={item.title} 
                        category={Object.values(PRODUCTS).find(p => p.title === item.title)?.category}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm mb-0.5 truncate">{item.title}</h4>
                        <p className="text-xs font-semibold text-red-500">{item.price || "Contact for price"}</p>
                      </div>
                      <button 
                        suppressHydrationWarning
                        onClick={() => removeFromShortlist(item.title)}
                        className="text-xs font-bold text-gray-500 hover:text-red-500 flex items-center gap-1.5 transition-colors mt-2"
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
              <div className="p-6 bg-[#0a0a0c] border-t border-white/10 space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-6 rounded-xl text-base shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 group font-bold transition-all border-0"
                  onClick={handleBulkQuote}
                >
                  Request Bulk Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[10px] text-gray-500 font-bold">
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
