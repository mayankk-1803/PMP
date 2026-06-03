"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, Search, SlidersHorizontal, ChevronRight, 
  Home, RefreshCw, X, ShoppingBag, Info, MapPin 
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { 
  CORPORATE_GIFTS, 
  PREMIUM_GIVEAWAYS,
  BUDGETS, 
  PRODUCTS 
} from "@/data/siteConfig";

// Re-map categories and budget tiers dynamically
const CATEGORIES_LIST = [
  { name: "All Categories", slug: "all" },
  ...CORPORATE_GIFTS.map(c => ({ name: c.name, slug: c.slug })),
  ...PREMIUM_GIVEAWAYS.filter((item) => !CORPORATE_GIFTS.some((gift) => gift.slug === item.slug)).map(c => ({ name: c.name, slug: c.slug }))
];

const BUDGET_TIERS = [
  { name: "All Budgets", value: "all" },
  ...Array.from(new Set(BUDGETS.map(b => b.value))).map(val => ({ name: val, value: val }))
];

// Map dynamic PRODUCTS record into array for list queries
const PRODUCTS_ARRAY = Object.values(PRODUCTS).map(p => ({
  title: p.title,
  price: "Custom Quote",
  imageUrl: p.images[0],
  category: p.category,
  budget: p.budget,
  description: p.description,
  moq: p.moq,
  brandingOptions: p.customizations.slice(0, 2)
}));

const ITEMS_PER_PAGE = 8;

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCategory = searchParams.get("category") || "all";
  const initialBudget = searchParams.get("range") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setSelectedCategory(cat);
    const bud = searchParams.get("range") || "all";
    setSelectedBudget(bud);
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("range");
    } else {
      params.set("range", value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedBudget("all");
    setSearchQuery("");
    setCurrentPage(1);
    router.push("/products");
  };

  // Filter logic
  const filteredProducts = PRODUCTS_ARRAY.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesBudget = selectedBudget === "all" || product.budget === selectedBudget;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesBudget && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="pt-28 pb-24 bg-[#faf9f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-red-500 flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-900">Products Catalog</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Promotional Products <span className="text-red-600">Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl leading-relaxed font-semibold">
            High-quality corporate giveaways, employee welcome swag, and luxury promotional items customizable with your company logo.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search product title or specifications..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-250 focus:outline-none focus:border-red-650 focus:ring-1 focus:ring-red-500/20 text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-150"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">
              Showing {filteredProducts.length} results
            </div>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-250 text-xs font-bold transition-all"
            >
              <Filter className="w-3.5 h-3.5 text-red-500" /> Filters
            </button>
          </div>
        </div>

        {/* Main Catalog Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            
            {/* Category Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-red-500" /> Categories
                </h3>
                {(selectedCategory !== "all" || selectedBudget !== "all" || searchQuery !== "") && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-[9px] font-extrabold text-red-500 hover:underline uppercase tracking-wider flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-905"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.slug && <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filters */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left">
              <h3 className="text-[11px] font-extrabold text-gray-900 uppercase tracking-widest pb-4 border-b border-gray-100 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-red-500" /> Price Tier
              </h3>
              <div className="space-y-1">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => handleBudgetChange(tier.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedBudget === tier.value
                        ? "bg-red-50 text-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-905"
                    }`}
                  >
                    <span>{tier.name}</span>
                    {selectedBudget === tier.value && <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Nationwide Logistics Trust Widget */}
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-neutral-900 border border-white/10 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
              <MapPin className="w-6 h-6 text-red-500 mb-3" />
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 mb-1">Logistics Trust</h4>
              <h5 className="font-black text-sm mb-1.5 text-white">Insured B2B Shipping & Setup</h5>
              <p className="text-[11px] leading-relaxed text-gray-300 font-semibold mb-4">
                We manage bulk transport and split-shipment dispatch to guarantee safe delivery directly to your offices or employee doors nationwide.
              </p>
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 text-[10px] text-gray-400 font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>Metro Hubs: Express dispatch SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <span>Pan-India: Fully insured B2B shipping</span>
                </div>
              </div>
            </div>

          </aside>

          {/* Right Area: Grid & Pagination */}
          <main className="lg:col-span-9 space-y-10 text-left">
            
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-gray-200 p-12 rounded-3xl text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No matching products found</h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed font-semibold">
                  Try adjusting your search criteria, switching categories, or resetting the filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl border border-gray-250 hover:bg-gray-50 text-xs font-bold transition-all text-gray-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product, idx) => (
                      <motion.div
                        key={product.title}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard
                          title={product.title}
                          price={product.price}
                          imageUrl={product.imageUrl}
                          description={product.description}
                          moq={product.moq}
                          brandingOptions={product.brandingOptions}
                          index={idx}
                          category={product.category}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-250 rounded-xl text-xs font-bold hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          currentPage === i + 1
                            ? "bg-red-650 text-white shadow-md shadow-red-650/15"
                            : "border border-gray-250 hover:bg-white text-gray-655"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-250 rounded-xl text-xs font-bold hover:bg-white transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="lg:hidden fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-6">
                <h3 className="font-extrabold text-gray-900 text-base">Catalog Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-1">
                {/* Mobile Categories */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES_LIST.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => { handleCategoryChange(cat.slug); setShowMobileFilters(false); }}
                        className={`text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all truncate border ${
                          selectedCategory === cat.slug
                            ? "bg-red-50 text-red-650 border-red-200"
                            : "text-gray-600 border-gray-250 hover:bg-gray-50"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Budgets */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">Budget Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier.value}
                        onClick={() => { handleBudgetChange(tier.value); setShowMobileFilters(false); }}
                        className={`text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                          selectedBudget === tier.value
                            ? "bg-red-50 text-red-650 border-red-200"
                            : "text-gray-600 border-gray-250 hover:bg-gray-50"
                        }`}
                      >
                        {tier.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-150 mt-6 space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 border-0 text-white py-3.5 rounded-xl text-xs font-bold shadow-md"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-gray-250 py-3.5 rounded-xl text-xs font-bold"
                  onClick={() => { handleResetFilters(); setShowMobileFilters(false); }}
                >
                  Reset All
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 text-center text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
        Loading product catalog...
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
