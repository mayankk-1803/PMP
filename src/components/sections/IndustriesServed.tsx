"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pill, Building2, ShoppingBag, HardHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import { staggerContainer, cardReveal, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INDUSTRIES = [
  {
    icon: <Pill className="w-8 h-8" />,
    name: "Pharma",
    desc: "MR Kits, Doctor Gifting, Seminars"
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    name: "Corporate IT",
    desc: "Onboarding Kits, Employee Rewards"
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    name: "Retail Brands",
    desc: "Festive Gifting, Loyalty Hampers"
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    name: "Contractors",
    desc: "Channel Partner Rewards, Utility Gifts"
  }
];

export function IndustriesServed() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="py-24 bg-[#F8F5EF] border-y border-[#DDD5C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Industries We Serve</h2>
          <p className="text-lg text-[#6B6B63]">Specialized curations crafted around the specific use-cases of your sector.</p>
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={idx}
              variants={prefersReduced ? undefined : cardReveal}
              whileHover={prefersReduced ? undefined : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              className="bg-white p-8 rounded-2xl border border-[#DDD5C8] shadow-sm flex flex-col items-center text-center cursor-pointer group hover:border-[#6E7757]/30 hover:shadow-lg transition-all"
            >
              <motion.div
                className="bg-[#EFE7DB] w-20 h-20 rounded-full flex items-center justify-center text-[#6E7757] mb-6 group-hover:bg-[#6E7757] group-hover:text-white transition-colors"
                whileHover={prefersReduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              >
                {industry.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#6E7757] mb-2">{industry.name}</h3>
              <p className="text-[#6B6B63] font-medium mb-6">{industry.desc}</p>
              
              <Link href="/industry-solutions" className="mt-auto text-[#2B2B2B] font-semibold text-sm flex items-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                View Solutions <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
