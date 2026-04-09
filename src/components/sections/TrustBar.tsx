"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Users, Truck, Headset } from "lucide-react";

const METRICS = [
  { icon: <Package />, value: "5000+", label: "Orders Delivered" },
  { icon: <Users />, value: "100+", label: "Corporate Clients" },
  { icon: <Truck />, value: "Delhi NCR", label: "Delivery Network" },
  { icon: <Headset />, value: "24/7", label: "Dedicated Support" },
];

const BRANDS = ["Google", "Microsoft", "Amazon", "Deloitte", "Atlassian"];

export function TrustBar() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {METRICS.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="text-[#D4AF37] [&>svg]:w-8 [&>svg]:h-8">
                {metric.icon}
              </div>
              <h3 className="text-3xl font-bold text-[#0B1D26]">{metric.value}</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-12 text-center text-gray-400">
          <p className="text-sm font-semibold tracking-widest uppercase mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale">
            {BRANDS.map((brand) => (
              <span key={brand} className="text-2xl md:text-3xl font-bold">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
