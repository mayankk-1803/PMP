"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const PRODUCTS = [
  { title: "Pens", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop" },
  { title: "T-Shirts", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
  { title: "Keychains", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1575880911432-843818617882?q=80&w=800&auto=format&fit=crop" },
  { title: "Diaries / Notebooks", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
  { title: "Caps", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" },
  { title: "Paper Weights", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop" },
  { title: "Mouse Pads / Table Mats", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800&auto=format&fit=crop" },
  { title: "Table Top Items", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=800&auto=format&fit=crop" },
  { title: "Backpacks / Bags", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { title: "Coasters", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop" },
  { title: "Umbrellas", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop" },
  { title: "Standees", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop" },
  { title: "Raincoats", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1542156822-6924d1a71aba?q=80&w=800&auto=format&fit=crop" },
  { title: "Tissue Boxes", price: "Custom Quote", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-16">
          <SectionHeading 
            title={<>Our <span className="text-red-600">Products</span></>}
            subtitle="Explore our extensive range of premium corporate gifting solutions." 
            centered 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product, idx) => (
            <ProductCard 
              key={idx}
              index={idx}
              {...product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
