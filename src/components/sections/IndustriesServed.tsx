"use client";

import React from "react";
import { motion } from "framer-motion";
import { Pill, Building2, ShoppingBag, HardHat, ArrowRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">Industries We Serve</h2>
          <p className="text-lg text-[#1E3A5F]/70">Specialized curations crafted around the specific use-cases of your sector.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center cursor-pointer group hover:border-[#C9A227]/30 transition-all"
            >
              <div className="bg-[#1E3A5F]/5 w-20 h-20 rounded-full flex items-center justify-center text-[#1E3A5F] mb-6 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                {industry.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{industry.name}</h3>
              <p className="text-[#1E3A5F]/60 font-medium mb-6">{industry.desc}</p>
              
              <Link href="/industry-solutions" className="mt-auto text-[#C9A227] font-semibold text-sm flex items-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                View Solutions <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
