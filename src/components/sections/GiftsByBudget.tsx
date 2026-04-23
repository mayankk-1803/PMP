"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, PiggyBank, Briefcase, Gem, Sparkles } from "lucide-react";

const BUDGETS = [
  "₹0–250",
  "₹250–500",
  "₹500–1000",
  "₹1000–2500",
  "₹2500–5000",
  "₹5000+ Premium"
];

export function GiftsByBudget() {
  return (
    <div className="w-full py-4">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:justify-center px-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap mr-2">Shop by Budget:</span>
        {BUDGETS.map((range, idx) => (
          <Link 
            key={idx}
            href={`/gifts-by-budget?range=${encodeURIComponent(range)}`}
            className="px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-red-600 hover:text-red-600 transition-all whitespace-nowrap shadow-sm"
          >
            {range}
          </Link>
        ))}
      </div>
    </div>
  );
}
