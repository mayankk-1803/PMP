"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase, Gift, ShieldAlert, Truck } from "lucide-react";

const CATEGORIES = [
  {
    title: "Corporate Kits",
    desc: "Premium onboarding and welcome kits for executives.",
    icon: <Briefcase className="w-8 h-8" />,
    href: "/corporate-kits"
  },
  {
    title: "Festive Hampers",
    desc: "Curated assortments for Diwali, New Year, and milestones.",
    icon: <Gift className="w-8 h-8" />,
    href: "/festive-gifting"
  },
  {
    title: "Merchandise",
    desc: "High-quality apparel and tech accessories with custom branding.",
    icon: <ShieldAlert className="w-8 h-8" />,
    href: "/promotional-merchandise"
  },
  {
    title: "Industry Kits",
    desc: "Tailored solutions for specific corporate sector needs.",
    icon: <Truck className="w-8 h-8" />,
    href: "/industry-solutions"
  }
];

export function CorporateSolutions() {
  return (
    <section className="py-24 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">Gifting Solutions by Category</h2>
          <p className="text-lg text-[#1E3A5F]/70">Explore our comprehensive range of corporate gifting collections designed for modern businesses.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={cat.href} className="flex flex-col h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-[#F1F5F9] transition-all duration-300 group hover:-translate-y-1">
                <div className="bg-[#F1F5F9] w-16 h-16 rounded-2xl flex items-center justify-center text-[#1E3A5F] mb-6 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{cat.title}</h3>
                <p className="text-[#1E3A5F]/60 mb-8 flex-1">{cat.desc}</p>
                <div className="flex items-center text-[#1E3A5F] font-semibold group-hover:text-[#C9A227] transition-colors">
                  View Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
