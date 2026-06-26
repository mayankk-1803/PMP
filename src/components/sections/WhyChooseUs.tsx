"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Box, Zap, Truck } from "lucide-react";
import { staggerContainerSlow, cardReveal, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
    title: "Pan-India Shipping",
    desc: "Robust logistics supporting nationwide direct-to-employee desktop & doorstep deliveries."
  }
];

export function WhyChooseUs() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="py-24 bg-[#EFE7DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#2B2B2B]">Why Partner With Us?</h2>
          <p className="text-[#6B6B63] text-lg">We handle the complexity of corporate gifting so you can focus on building relationships.</p>
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {USPs.map((usp, idx) => (
            <motion.div
              key={idx}
              variants={prefersReduced ? undefined : cardReveal}
              whileHover={prefersReduced ? undefined : { y: -8, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-[#DDD5C8] shadow-sm hover:shadow-xl hover:shadow-[#DDD5C8]/50 hover:border-[#6E7757]/30 transition-all group"
            >
              <motion.div
                className="bg-[#F8F5EF] w-16 h-16 rounded-xl flex items-center justify-center text-[#6E7757] mb-6 group-hover:bg-[#6E7757] group-hover:text-white transition-colors"
                whileHover={prefersReduced ? undefined : { rotate: 360 }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              >
                {usp.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-[#6E7757] transition-colors">{usp.title}</h3>
              <p className="text-[#6B6B63] leading-relaxed font-medium">{usp.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
