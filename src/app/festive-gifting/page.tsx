"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const FESTIVE_HAMPERS = [
  { title: "Grand Diwali Celebration Box", price: "₹2500", description: "Premium sweets, dry fruits, floating diyas, silver coin.", imageUrl: "https://images.pexels.com/photos/8819840/pexels-photo-8819840.jpeg" },
  // { title: "Elegant Christmas Hamper", price: "₹1800", description: "Plum cake, artisanal chocolates, scented candles.", imageUrl: "https://images.unsplash.com/photo-1543169766-384358826d95?q=80&w=800&auto=format&fit=crop" },
  { title: "Holi Colors & Sweets Pack", price: "₹900", description: "Organic colors, gujiya box, water balloon kit.", imageUrl: "https://images.pexels.com/photos/7176252/pexels-photo-7176252.jpeg" },
  { title: "New Year Desk Planner Kit", price: "₹1200", description: "Premium leather planner, desk calendar, branded pen.", imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop" },
  // { title: "Budget Dry Fruit Box", price: "₹500", description: "Assorted premium nuts in a festive mono carton.", imageUrl: "https://images.unsplash.com/photo-1599577180572-1b1f6002f23b?q=80&w=800&auto=format&fit=crop" },
  // { title: "Luxury Wellness Hamper", price: "₹4500", description: "Aroma diffusers, essential oils, premium green teas.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" },
];

export default function FestiveGiftingPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient className="top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeading 
            title="Festive Gifting" 
            subtitle="Celebrate the season of joy with our premium ready-to-ship and customizable festive hampers for your employees and clients." 
            centered 
            className="mb-8"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {["Diwali", "New Year", "Christmas", "Holi", "Anniversary"].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full border border-gray-700 bg-[#1A1A1A] text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FESTIVE_HAMPERS.map((hamper, i) => (
            <ProductCard key={i} {...hamper} />
          ))}
        </div>
      </div>
    </div>
  );
}
