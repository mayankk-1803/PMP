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
import { PROMO_SUBCATEGORY_SLUGS, PRODUCT_HIERARCHY } from "@/data/siteConfig";

interface CatalogProduct {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory: string;
  brand?: string;
  tags?: string[];
  images: string[];
  moq: number;
  features: string[];
}

interface CatalogNode {
  name: string;
  slug: string;
}

const BUDGET_TIERS = [{ name: "All Budgets", value: "all" }];

const ITEMS_PER_PAGE = 9;

// Frontend-only: subcategory slugs to hide everywhere on the public site
const HIDDEN_PRODUCT_SLUGS = new Set([
  "travel-bags",
  "travel-backpacks",
  "travel-mugs",
]);

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const mapLegacyCategory = (slug: string): string => {
    if (["premium-pens", "eco-pens", "gift-box-pens", "engraved-pens"].includes(slug)) return "pens";
    if (["promotional-caps", "sports-caps", "cotton-caps", "baseball-caps", "event-caps", "snapback-caps"].includes(slug)) return "caps";
    if (["mouse-pad", "desk-organiser", "table-mats", "mousepad", "deskorganiser", "tablemat", "tabletop"].includes(slug)) return "table-top";
    if (["executive-diaries", "premium-diaries", "eco-notebooks", "standard-notebooks", "diaries", "diariesnotebooks"].includes(slug)) return "diaries-notebooks";
    return slug;
  };

  const initialCategory = mapLegacyCategory(searchParams?.get("category") || searchParams?.get("subcategory") || "all");
  const initialBudget = searchParams?.get("range") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [categories, setCategories] = useState<CatalogNode[]>([{ name: "All Categories", slug: "all" }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cat = searchParams?.get("category") || searchParams?.get("subcategory") || "all";
    setSelectedCategory(mapLegacyCategory(cat));
    const bud = searchParams?.get("range") || "all";
    setSelectedBudget(bud);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    async function loadCatalog() {
      setIsLoading(true);
      const [productsResponse, subcategoriesResponse] = await Promise.all([
        fetch("/api/catalog/products"),
        fetch("/api/catalog/subcategories"),
      ]);
      const [productsResult, subcategoriesResult] = await Promise.all([
        productsResponse.json(),
        subcategoriesResponse.json(),
      ]);

      if (!active) return;

      const allProducts: CatalogProduct[] = productsResult.data ?? [];
      setProducts(allProducts);

      // Build set of subcategory slugs that actually have products
      const slugsWithProducts = new Set(allProducts.map((p) => p.subcategory));

      // Build ordered sidebar from PRODUCT_HIERARCHY (single source of truth)
      // Only include subcategories that:
      //  1. Are in the Promotional Products hierarchy
      //  2. Have at least one product in the database
      const orderedPromoCategories: CatalogNode[] = [];
      for (const cat of PRODUCT_HIERARCHY[0].categories) {
        if (cat.subcategories.length === 0) {
          const legacySlugs = new Set(
            cat.slug === "pens" ? ["pens", "premium-pens", "eco-pens", "gift-box-pens", "engraved-pens"] :
            cat.slug === "caps" ? ["caps", "promotional-caps", "sports-caps", "cotton-caps", "baseball-caps", "event-caps", "snapback-caps"] :
            cat.slug === "table-top" ? ["table-top", "tabletop", "mouse-pad", "desk-organiser", "table-mats", "mousepad", "deskorganiser", "tablemat"] :
            cat.slug === "diaries-notebooks" ? ["diaries-notebooks", "diaries", "executive-diaries", "premium-diaries", "eco-notebooks", "standard-notebooks"] :
            [cat.slug]
          );

          const hasProducts = allProducts.some(
            (p) => p.category === cat.slug || legacySlugs.has(p.subcategory)
          );

          if (hasProducts) {
            orderedPromoCategories.push({ name: cat.name, slug: cat.slug });
          }
        } else {
          for (const sub of cat.subcategories) {
            if (HIDDEN_PRODUCT_SLUGS.has(sub.slug)) continue;

            const isNewCategory = sub.slug === "badges-sub" || sub.slug === "neck-rest-back-rest-sub";
            const hasProducts = isNewCategory || slugsWithProducts.has(sub.slug) || 
              (sub.slug === "laptop-bags" && slugsWithProducts.has("laptop-backpacks")) ||
              (sub.slug === "travel-bags" && slugsWithProducts.has("travel-backpacks"));

            if (PROMO_SUBCATEGORY_SLUGS.has(sub.slug) && hasProducts) {
              orderedPromoCategories.push({ name: sub.name, slug: sub.slug });
            }
          }
        }
      }

      const apiSubcats: CatalogNode[] = (subcategoriesResult.data ?? []).filter(
        (item: CatalogNode) =>
          !HIDDEN_PRODUCT_SLUGS.has(item.slug) &&
          (PROMO_SUBCATEGORY_SLUGS.has(item.slug) || 
           item.slug === "laptop-backpacks") &&
          slugsWithProducts.has(item.slug) &&
          !orderedPromoCategories.some((c) => c.slug === item.slug || 
            (c.slug === "laptop-bags" && item.slug === "laptop-backpacks"))
      );

      setCategories([
        { name: "All Categories", slug: "all" },
        ...orderedPromoCategories,
        ...apiSubcats,
      ]);
      setIsLoading(false);
    }

    loadCatalog().catch(() => {
      if (active) setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams?.toString());
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
    const params = new URLSearchParams(searchParams?.toString());
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
  const filteredProducts = products.filter((product) => {
    // Frontend-only: exclude hidden subcategories
    if (HIDDEN_PRODUCT_SLUGS.has(product.subcategory)) return false;

    // Exclude Kits and Hampers and Packaging on promotional page if selectedCategory is "all"
    const isPens = product.category === "pens" || ["premium-pens", "eco-pens", "gift-box-pens", "engraved-pens"].includes(product.subcategory);
    const isCaps = product.category === "caps" || ["promotional-caps", "sports-caps", "cotton-caps", "baseball-caps", "event-caps", "snapback-caps"].includes(product.subcategory);
    const isTableTop = product.category === "table-top" || ["mouse-pad", "desk-organiser", "table-mats", "mousepad", "deskorganiser", "tablemat", "tabletop"].includes(product.subcategory);
    const isDiaries = product.category === "diaries-notebooks" || ["executive-diaries", "premium-diaries", "eco-notebooks", "standard-notebooks", "diaries", "diariesnotebooks"].includes(product.subcategory);

    const isPromo = 
      PROMO_SUBCATEGORY_SLUGS.has(product.subcategory) ||
      product.subcategory === "laptop-backpacks" ||
      isPens ||
      isCaps ||
      isTableTop ||
      isDiaries ||
      product.category === "corporate-gifts" ||
      product.category === "t-shirts" ||
      product.category === "drinkware" ||
      product.category === "backpacks-bags" ||
      product.category === "executive-gifts";

    if (!isPromo) return false;

    const matchSubcategory = (selected: string, productSub: string): boolean => {
      if (selected === productSub) return true;
      if (selected === "laptop-bags" && (productSub === "laptop-backpacks" || productSub === "laptop-bags")) return true;
      return false;
    };

    const matchesCategory = 
      selectedCategory === "all" || 
      product.category === selectedCategory || 
      matchSubcategory(selectedCategory, product.subcategory) ||
      (selectedCategory === "pens" && isPens) ||
      (selectedCategory === "caps" && isCaps) ||
      (selectedCategory === "table-top" && isTableTop) ||
      (selectedCategory === "diaries-notebooks" && isDiaries);

    const matchesBudget = selectedBudget === "all";
    const matchesSearch = 
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBudget && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-[#D32F2F] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-900">Products Catalog</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Promotional Products <span className="text-[#D32F2F]">Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B63] mt-2 max-w-xl leading-relaxed font-semibold">
            High-quality corporate giveaways, employee welcome swag, and luxury promotional items customizable with your company logo.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#F5C2C2] p-4 rounded-2xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search product title or specifications..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#F5C2C2] focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]/20 text-sm font-medium"
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
              {isLoading ? "Loading catalog" : `Showing ${filteredProducts.length} results`}
            </div>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#F8F7F3] text-[#6B6B63] rounded-xl border border-[#F5C2C2] text-xs font-bold transition-all"
            >
              <Filter className="w-3.5 h-3.5 text-[#D32F2F]" /> Filters
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
                <h3 className="text-[11px] font-extrabold text-[#2B2B2B] uppercase tracking-widest flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D32F2F]" /> Categories
                </h3>
                {(selectedCategory !== "all" || selectedBudget !== "all" || searchQuery !== "") && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-[9px] font-extrabold text-[#D32F2F] hover:underline uppercase tracking-wider flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-[#F8F7F3] text-[#D32F2F]"
                        : "text-[#6B6B63] hover:bg-[#FAF9F6] hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.slug && <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filters */}
            <div className="bg-white border border-[#F5C2C2] rounded-2xl p-6 shadow-sm text-left">
              <h3 className="text-[11px] font-extrabold text-[#2B2B2B] uppercase tracking-widest pb-4 border-b border-[#F5C2C2] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D32F2F]" /> Price Tier
              </h3>
              <div className="space-y-1">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => handleBudgetChange(tier.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedBudget === tier.value
                        ? "bg-[#F8F7F3] text-[#D32F2F]"
                        : "text-[#6B6B63] hover:bg-[#FAF9F6] hover:text-[#2B2B2B]"
                    }`}
                  >
                    <span>{tier.name}</span>
                    {selectedBudget === tier.value && <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Nationwide Logistics Trust Widget */}
            <div className="bg-[#2B2B2B] border border-white/10 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D32F2F]/10 rounded-full blur-xl pointer-events-none" />
              <MapPin className="w-6 h-6 text-[#EF5350] mb-3" />
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 mb-1">Logistics Trust</h4>
              <h5 className="font-black text-sm mb-1.5 text-white">Insured B2B Shipping & Setup</h5>
              <p className="text-[11px] leading-relaxed text-gray-300 font-semibold mb-4">
                We manage bulk transport and split-shipment dispatch to guarantee safe delivery directly to your offices or employee doors nationwide.
              </p>
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 text-[10px] text-gray-400 font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EF5350] rounded-full animate-pulse" />
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
            
            {isLoading ? (
              <div className="bg-white border border-gray-200 p-12 rounded-3xl text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Loading catalog from database</h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto leading-relaxed font-semibold">
                  Fetching products, categories, images, and subcategories from the catalog API.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
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
                        key={product.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard
                          title={product.title}
                          slug={product.slug}
                          price="Custom Quote"
                          imageUrl={product.images[0]}
                          description={product.shortDescription || product.description}
                          moq={product.moq}
                          brandingOptions={product.features.slice(0, 2)}
                          index={idx}
                          category={product.category}
                          subcategory={product.subcategory}
                          brand={product.brand}
                          isProduct={true}
                          images={product.images}
                          features={product.features}
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
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 ${
                          currentPage === i + 1
                            ? "bg-[#D32F2F] text-white shadow-md shadow-[#D32F2F]/25 scale-105"
                            : "bg-white border border-gray-200 text-gray-700 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300"
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
                    {categories.map((cat) => (
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
