"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = ["JBL", "Adidas", "Borosil", "VIP", "Boat"];

export function PremiumBrands() {
  return (
    <section className="bg-white py-14 border-b border-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#1E3A5F]">
        <p className="text-sm font-bold tracking-widest uppercase mb-8 text-[#1E3A5F]/60">Authentic products with corporate pricing</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {BRANDS.map((brand, idx) => (
            <motion.span 
              key={brand} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F]/30 hover:text-[#1E3A5F]/80 transition-colors cursor-pointer"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
