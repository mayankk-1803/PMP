"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, PiggyBank, Briefcase, Gem, Sparkles } from "lucide-react";

const BUDGETS = [
  {
    range: "Under ₹250",
    label: "Pocket Friendly",
    icon: <Wallet className="w-6 h-6" />,
    color: "bg-gray-50",
    textColor: "text-gray-900"
  },
  {
    range: "₹250 - ₹500",
    label: "Value Gifting",
    icon: <PiggyBank className="w-6 h-6" />,
    color: "bg-gray-50",
    textColor: "text-gray-900"
  },
  {
    range: "₹500 - ₹1000",
    label: "Mid-Range",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-gray-50",
    textColor: "text-gray-900"
  },
  {
    range: "₹1000 - ₹2500",
    label: "Executive Gifts",
    icon: <Gem className="w-6 h-6" />,
    color: "bg-gray-50",
    textColor: "text-gray-900"
  },
  {
    range: "₹2500+",
    label: "Premium Luxury",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-gray-50",
    textColor: "text-gray-900"
  }
];

export function GiftsByBudget() {
  return (
    <section className="py-24 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Gifts by Budget</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated collections designed to fit every corporate gifting requirement and budget.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BUDGETS.map((budget, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={`/gifts-by-budget?range=${encodeURIComponent(budget.range)}`}
                className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all h-full"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {budget.icon}
                </div>
                <h3 className="font-bold text-red-600 mb-2">{budget.range}</h3>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{budget.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
