"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";

const BUDGET_TIERS = ["All", "₹0 - ₹250", "₹250 - ₹500", "₹500 - ₹1000", "₹1000 - ₹2500", "₹2500+"];

const MOCK_PRODUCTS = [
  { tier: "₹0 - ₹250", title: "Branded Keychain", price: "₹150", imageUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop" },
  { tier: "₹250 - ₹500", title: "Copper Bottle", price: "₹450", imageUrl: "https://images.unsplash.com/photo-1606168094336-47f212265dd5?q=80&w=800&auto=format&fit=crop" },
  { tier: "₹500 - ₹1000", title: "Journal & Pen Set", price: "₹800", imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
  { tier: "₹1000 - ₹2500", title: "Tech Organizer", price: "₹1800", imageUrl: "https://images.unsplash.com/photo-1628198904257-27b2b6226cb6?q=80&w=800&auto=format&fit=crop" },
  { tier: "₹2500+", title: "Executive Trolley Bag", price: "₹4500", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { tier: "₹2500+", title: "Premium Watch Set", price: "₹6000", imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop" },
];

export default function GiftsByBudgetPage() {
  const [activeTier, setActiveTier] = useState("All");

  const filtered = activeTier === "All" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.tier === activeTier);

  return (
    <div className="pt-24 pb-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Browse by Budget" 
          subtitle="Find the perfect gifting solutions that align with your company's financial planning." 
          centered 
          className="mb-12"
        />

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {BUDGET_TIERS.map(tier => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeTier === tier 
                  ? "bg-primary border-primary text-white" 
                  : "bg-transparent border-gray-700 text-gray-400 hover:border-primary/50"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
