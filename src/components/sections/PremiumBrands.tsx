"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = [
  "JBL", "Adidas", "Borosil", "VIP", "Boat", "Milton", "Puma", "Nike", "Philips", "Sennheiser"
];

export function PremiumBrands() {
  return (
    <section className="bg-white py-12 border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">Trusted by 500+ Leading Corporations</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
          {BRANDS.map((brand, idx) => (
            <motion.div 
              key={brand} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group cursor-default"
            >
              <span className="text-lg md:text-xl font-extrabold text-[#1f2937]/30 group-hover:text-[#dc2626] transition-all duration-300 tracking-tighter uppercase italic">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
