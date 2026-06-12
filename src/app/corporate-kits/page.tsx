"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Briefcase, HardHat, Gift, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type ActiveTab = "corporate" | "industry" | "festive";

const INDUSTRY_SLUGS = new Set([
  "doctor-kits",
  "architect-kits",
  "contractor-kits",
  "mason-kits",
  "electrician-kits",
  "interior-designer-kits",
  "pharma-representative-kits",
  "hospital-staff-kits",
  "plumber-kits",
  "real-estate-builder-kit"
]);

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentGroup?: string;
  order?: number;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category: string;
  parentGroup: string;
  description?: string;
  image?: string;
  order?: number;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  subcategory: string;
  featuredImage?: string;
  images: string[];
  price?: number;
}

function CorporateKitsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedKit = searchParams?.get("kit") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/catalog/categories").then((res) => res.json()),
      fetch("/api/catalog/subcategories").then((res) => res.json()),
      fetch("/api/catalog/products").then((res) => res.json())
    ])
      .then(([catRes, subRes, prodRes]) => {
        if (catRes.success && catRes.data) setCategories(catRes.data);
        if (subRes.success && subRes.data) setSubcategories(subRes.data);
        if (prodRes.success && prodRes.data) setProducts(prodRes.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const corporateOptions = useMemo(() => {
    return subcategories.filter(
      (sub) => sub.category === "corporate-kits" || sub.parentGroup === "Corporate Kits"
    );
  }, [subcategories]);

  const festiveOptions = useMemo(() => {
    return subcategories.filter(
      (sub) => sub.category === "festive-hampers" || sub.parentGroup === "Festive Hampers"
    );
  }, [subcategories]);

  const selectedSubcategory = useMemo(() => {
    return subcategories.find((sub) => sub.slug === selectedKit || sub.slug.replace(/-kits$|-hampers$|-gifts$/g, "") === selectedKit);
  }, [subcategories, selectedKit]);

  const activeTab: ActiveTab = useMemo(() => {
    if (selectedSubcategory) {
      if (selectedSubcategory.category === "festive-hampers") return "festive";
      if (INDUSTRY_SLUGS.has(selectedSubcategory.slug)) return "industry";
      return "corporate";
    }
    return "corporate";
  }, [selectedSubcategory]);

  const visibleItems = useMemo(() => {
    let filtered = products;
    if (selectedSubcategory) {
      filtered = products.filter((p) => p.subcategory === selectedSubcategory.slug);
    } else {
      const activeOptions = 
        activeTab === "festive"
          ? festiveOptions
          : activeTab === "industry"
            ? corporateOptions.filter((s) => INDUSTRY_SLUGS.has(s.slug))
            : corporateOptions.filter((s) => !INDUSTRY_SLUGS.has(s.slug));
      const activeSlugs = new Set(activeOptions.map((s) => s.slug));
      filtered = products.filter((p) => activeSlugs.has(p.subcategory));
    }

    return filtered.map((p) => ({
      title: p.title,
      description: p.description,
      imageUrl: p.featuredImage || p.images[0] || "/images/joiningkit.png",
      price: p.price ? `₹${p.price}` : "Custom Quote",
      slug: p.slug,
      category: p.category
    }));
  }, [activeTab, corporateOptions, festiveOptions, products, selectedSubcategory]);

  const selectedLabel = selectedSubcategory?.name || "Corporate Kits";
  const selectedDescription = selectedSubcategory?.description || 
    "Explore premium, custom-branded onboarding kits, specialized field employee kits, and luxury festive hampers curated to elevate your brand perception.";

  const tabItems = [
    { id: "corporate", label: "Employee & Joining Kits", icon: <Briefcase className="w-4 h-4" />, href: "/corporate-kits" },
    { id: "industry", label: "Field & Industry Kits", icon: <HardHat className="w-4 h-4" />, href: "/corporate-kits?kit=doctor-kits" },
    { id: "festive", label: "Festive & Occasion Hampers", icon: <Gift className="w-4 h-4" />, href: "/corporate-kits?kit=diwali-hampers" },
  ] as const;

  const currentOptions = activeTab === "festive"
    ? festiveOptions
    : activeTab === "industry"
      ? corporateOptions.filter((s) => INDUSTRY_SLUGS.has(s.slug))
      : corporateOptions.filter((s) => !INDUSTRY_SLUGS.has(s.slug));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#faf9f6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-50/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Curated Gift Sets
          </span>
          <SectionHeading
            title={<>{selectedSubcategory ? selectedLabel : "Corporate"} <span className="text-red-600">{selectedSubcategory ? "" : "Kits & Hampers"}</span></>}
            subtitle={selectedDescription}
            centered
          />
        </div>

        <div className="flex justify-center mb-8 px-4">
          <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-4xl w-full md:w-auto relative z-10">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.href)}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full md:w-auto ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic DB-driven Pills Selection */}
        <div className="mb-14 rounded-2xl bg-white border border-gray-200/80 p-5 shadow-sm text-left">
          <div className="text-[10px] font-extrabold uppercase tracking-widest mb-4 text-red-600">
            {activeTab === "festive" ? "Festive Hamper Collections" : "Corporate Kit Options"}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentOptions.map((item) => {
              const isSelected = selectedSubcategory?.slug === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/corporate-kits?kit=${item.slug}`}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "border-red-600 bg-red-50 text-red-600 shadow-sm"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-950"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 text-left">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
              {selectedSubcategory ? "Selected Collection" : "Featured Collection"}
            </span>
            <h2 className="mt-1 text-2xl md:text-3xl font-black text-gray-950">
              {selectedLabel}
            </h2>
          </div>
          <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
            {visibleItems.length} Options
          </span>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedKit || "all"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {visibleItems.map((item, idx) => (
                <ProductCard
                  key={`${item.slug}-${item.title}`}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  index={idx}
                  category={item.category}
                  className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Bespoke Packaging & Gifting
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Want to curate a <span className="text-red-500">completely custom</span> kit?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Tell us your budget, quantity, and product preferences. Our team will draft custom dielines, mockups, and organize pan-India door-to-door delivery.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=custom-kit">
                  Request Custom Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CorporateKitsPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 text-center text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading kits...</div>}>
      <CorporateKitsContent />
    </Suspense>
  );
}
