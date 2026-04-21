"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const CATEGORIES = [
  {
    id: "promotional-gifts",
    title: "Promotional Gifts",
    items: [
      { title: "Premium Branding Pens", price: "Custom Quote", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop" },
      { title: "Corporate T-Shirts", price: "Custom Quote", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
      { title: "Custom Keychains", price: "Custom Quote", image: "https://images.unsplash.com/photo-1575880911432-843818617882?q=80&w=800&auto=format&fit=crop" },
      { title: "Diaries & Notebooks", price: "Custom Quote", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
      { title: "Branded Caps", price: "Custom Quote", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" },
      { title: "Executive Paper Weights", price: "Custom Quote", image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop" },
      { title: "Mouse Pads & Table Mats", price: "Custom Quote", image: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800&auto=format&fit=crop" },
      { title: "Table Top Items", price: "Custom Quote", image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=800&auto=format&fit=crop" },
      { title: "Backpacks & Bags", price: "Custom Quote", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
    ]
  },
  {
    id: "corporate-kits",
    title: "Corporate Kits",
    items: [
      { title: "Employee Joining Kit", price: "₹1,800", image: "https://printingstudio.in/cdn/shop/files/business-objects-desk-top-view.jpg?v=1709971155&width=1445" },
      { title: "Dealer Premium Kit", price: "₹3,500", image: "https://5.imimg.com/data5/SELLER/Default/2023/4/297186863/QF/QA/EU/27887478/employee-welcome-kit-500x500.jpg" },
      { title: "Leadership Box", price: "₹5,000", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
    ]
  },
  {
    id: "occasion-hampers",
    title: "Occasion Hampers",
    items: [
      { title: "Diwali Celebration Box", price: "₹1,200", image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop" },
      { title: "Holi Colors Hamper", price: "₹850", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop" },
      { title: "New Year Executive Gift", price: "₹2,500", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop" },
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-16">
          <SectionHeading 
            title="Our Collections" 
            subtitle="Discover our wide range of corporate gifts, kits, and occasion-based hampers." 
            centered 
          />
        </div>

        <div className="space-y-24">
          {CATEGORIES.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xl font-bold text-red-600">
                  {category.title}
                </h3>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIdx) => (
                  <ProductCard 
                    key={itemIdx}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.image}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
