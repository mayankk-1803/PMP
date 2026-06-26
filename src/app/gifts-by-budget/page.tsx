"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { PRODUCTS, BUDGETS } from "@/data/siteConfig";
import { Wallet, PiggyBank, Coins, Briefcase, Gem, Crown } from "lucide-react";

// Helper to assign icons to budget ranges
const getBudgetIcon = (index: number) => {
  const icons = [
    <Wallet key="1" className="w-4 h-4" />,
    <PiggyBank key="2" className="w-4 h-4" />,
    <Coins key="3" className="w-4 h-4" />,
    <Briefcase key="4" className="w-4 h-4" />,
    <Gem key="5" className="w-4 h-4" />,
    <Crown key="6" className="w-4 h-4" />,
  ];
  return icons[index] || <Coins key="default" className="w-4 h-4" />;
};

function GiftsByBudgetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedRange = searchParams?.get("range") || "";

  // Convert products object to array and transform images/price fields
  const allProducts = Object.values(PRODUCTS).map((p) => ({
    title: p.title,
    description: p.description,
    imageUrl: p.images[0] || "",
    price: `Starts from ₹${p.basePrice}`,
    budgetRange: p.budget,
    category: p.category,
  }));

  // Unique list of budget tiers based on BUDGETS config, preventing duplicate "₹2500+" values
  const uniqueBudgetTiers = BUDGETS.filter(
    (item, index, self) => self.findIndex((t) => t.value === item.value) === index
  );

  const filteredProducts = selectedRange
    ? allProducts.filter(
        (p) => p.budgetRange.toLowerCase() === selectedRange.toLowerCase()
      )
    : allProducts;

  const handleSelectRange = (rangeValue: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (rangeValue) {
      params.set("range", rangeValue);
    } else {
      params.delete("range");
    }
    router.push(`/gifts-by-budget?${params.toString()}`);
  };

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#F8F5EF] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#EFE7DB]/40 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#EFE7DB] text-[#C8A36A] text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-[#DDD5C8]">
            Smart Budgets
          </span>
          <SectionHeading 
            title={<>Corporate Gifts <span className="text-[#6E7757]">by Budget</span></>}
            subtitle="Explore our curated catalog segments structured dynamically to match your cost constraints without compromising on visual elegance." 
            centered 
          />
        </div>

        {/* Dynamic Budget Range Selection Tabs */}
        <div className="flex justify-center mb-16 px-4">
          <div className="inline-flex flex-wrap p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-5xl w-full justify-center gap-2">
            {/* "All Budgets" Pill */}
            <button
              onClick={() => handleSelectRange("")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full sm:w-auto ${
                selectedRange === ""
                  ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Coins className="w-4 h-4" />
              All Budgets
            </button>

            {uniqueBudgetTiers.map((tier, idx) => {
              const isActive = selectedRange.toLowerCase() === tier.value.toLowerCase();
              return (
                <button
                  key={tier.name}
                  onClick={() => handleSelectRange(tier.value)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full sm:w-auto ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {getBudgetIcon(idx)}
                  {tier.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative min-h-[300px]">
          {filteredProducts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRange}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.title}
                    title={product.title}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    index={idx}
                    category={product.category}
                    className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
              <Coins className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">No products found</h4>
              <p className="text-gray-500 text-sm">
                We don't currently have products categorized directly in this segment. Let us customize a custom gift proposal for you!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function GiftsByBudgetPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-bold text-gray-400">Loading budget catalog...</div>}>
      <GiftsByBudgetContent />
    </Suspense>
  );
}
