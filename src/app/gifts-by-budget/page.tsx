"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";

const BUDGET_PRODUCTS = [
  { title: "Custom Ceramic Mug", price: "Under ₹250", description: "Durable and premium branding ceramic mugs for employee gifting.", imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80" },
  { title: "Executive Diary", price: "₹250 - ₹500", description: "Leatherette hardbound diaries with custom logo embossing.", imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80" },
  { title: "Tech Organizer Case", price: "₹500 - ₹1000", description: "High-quality travel tech organizer for cables, chargers, and powerbanks.", imageUrl: "https://tse4.mm.bing.net/th/id/OIP.k_Pte09bpvs0sjamLxcKiwHaEo?pid=Api&h=220&P=0" },
  { title: "Premium Welcome Kit", price: "₹1000 - ₹2500", description: "A curated kit for new hires including a bottle, diary, pen, and keychains.", imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80" },
  { title: "Luxury Wellness Hamper", price: "₹2500+", description: "An exclusive collection of gourmet treats, essential oils, and luxury candles.", imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80" },
];

function GiftsByBudgetContent() {
  const searchParams = useSearchParams();
  const selectedRange = searchParams.get("range");

  const filteredProducts = selectedRange 
    ? BUDGET_PRODUCTS.filter(p => p.price === selectedRange)
    : BUDGET_PRODUCTS;

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeading 
            title={<>Gifts by <span className="text-red-600">Budget</span></>}
            subtitle={selectedRange ? `Curated gifts in the ${selectedRange} range.` : "Explore our curated collections designed to fit every budget."} 
            centered 
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
            >
              <ProductCard {...product} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GiftsByBudgetPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center font-bold text-gray-400">Loading...</div>}>
      <GiftsByBudgetContent />
    </Suspense>
  );
}
