"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Box, Zap, Truck } from "lucide-react";

const USPs = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Premium Quality",
    desc: "Rigorous quality checks ensure unboxing experiences that truly impress."
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "Custom Branding",
    desc: "State-of-the-art screen printing, UV, and laser engraving for your logos."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Bulk Pricing",
    desc: "Exclusive B2B rates that offer immense value as your order volume scales."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Delhi NCR Delivery",
    desc: "Logistics infrastructure supporting direct-to-employee doorstep deliveries."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#1E3A5F]">Why Partner With Us?</h2>
          <p className="text-[#1E3A5F]/70 text-lg">We handle the complexity of corporate gifting so you can focus on building relationships.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {USPs.map((usp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#1E3A5F]/10 transition-all group"
            >
              <div className="bg-[#F1F5F9] w-16 h-16 rounded-xl flex items-center justify-center text-[#1E3A5F] mb-6 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1E3A5F]">{usp.title}</h3>
              <p className="text-[#1E3A5F]/60 leading-relaxed font-medium">
                {usp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
