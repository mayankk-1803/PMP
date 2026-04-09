"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

const CATEGORIES = ["All", "Welcome Kits", "Tech", "Drinkware"];

const PRODUCTS = [
  {
    id: 1,
    category: "Welcome Kits",
    title: "The Executive Box",
    price: "₹1,850",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Tech",
    title: "Premium Tech Kit",
    price: "₹3,200",
    image: "https://images.pexels.com/photos/34929075/pexels-photo-34929075.jpeg"
  },
  {
    id: 3,
    category: "Drinkware",
    title: "Matte Vacuum Flask",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Welcome Kits",
    title: "Eco-Friendly Kit",
    price: "₹1,400",
    image: "https://images.unsplash.com/photo-1511269524056-bb9bc54b9d03?q=80&w=800&auto=format&fit=crop"
  }
];

export function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = PRODUCTS.filter(
    (product) => activeFilter === "All" || product.category === activeFilter
  );

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-[#0B1D26] mb-4">Curated Gifts</h2>
            <p className="text-lg text-gray-500">Explore our premium catalog of best-selling corporate kits.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === cat
                    ? "bg-[#0B1D26] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="gold" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Request Quote
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-[#0B1D26] mb-1">{product.title}</h3>
                  <p className="text-[#D4AF37] font-semibold">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
