"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

const BUDGET_TIERS = ["₹0–₹250", "₹250–₹500", "₹500–₹1000", "₹1000–₹2500", "₹2500+"];

const BUDGET_PRODUCTS = [
  { id: 1, tier: "₹0–₹250", name: "Custom Ceramic Mug", price: "₹199", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80" },
  { id: 2, tier: "₹0–₹250", name: "Metal Pen with Case", price: "₹249", img: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=400&q=80" },
  
  { id: 3, tier: "₹500–₹1000", name: "Premium Sipper & Diary", price: "₹850", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80" },
  { id: 4, tier: "₹500–₹1000", name: "Desk Organizer Clock", price: "₹750", img: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=400&q=80" },
  
  { id: 5, tier: "₹1000–₹2500", name: "Executive Welcome Kit", price: "₹1,800", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80" },
  { id: 6, tier: "₹1000–₹2500", name: "Bluetooth Speaker Box", price: "₹2,100", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80" },
  
  { id: 7, tier: "₹2500+", name: "Luxury Leadership Hamper", price: "₹4,500", img: "https://images.pexels.com/photos/34929075/pexels-photo-34929075.jpeg" },
];

export function GiftsByBudget() {
  const [activeTier, setActiveTier] = useState("₹1000–₹2500");

  const filteredProducts = BUDGET_PRODUCTS.filter(p => p.tier === activeTier);

  return (
    <section className="py-24 bg-white border-y border-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">Gifts by Budget</h2>
          <p className="text-lg text-[#1E3A5F]/70 mb-10">Find the perfect corporate gift combinations that align with your requirements.</p>
          
          {/* Filter UI */}
          <div className="inline-flex flex-wrap justify-center bg-[#F9FAFB] p-1.5 rounded-2xl border border-gray-100 shadow-sm gap-1">
            {BUDGET_TIERS.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-5 py-3 text-sm md:text-base font-semibold rounded-xl transition-all ${
                  activeTier === tier 
                    ? "bg-[#1E3A5F] text-white shadow-md transform scale-105" 
                    : "text-[#1E3A5F]/70 hover:text-[#1E3A5F] hover:bg-[#F1F5F9]"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center max-w-4xl mx-auto min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group bg-[#F9FAFB] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1E3A5F]/20 hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-white">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.img})` }}
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{product.name}</h3>
                  <p className="text-[#C9A227] font-semibold text-lg">{product.price}</p>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full flex items-center justify-center text-gray-400 font-medium py-12">
                Products updating for this tier soon...
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">View All Products</Button>
        </div>
      </div>
    </section>
  );
}
