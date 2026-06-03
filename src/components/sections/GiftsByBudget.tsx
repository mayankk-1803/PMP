"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, PiggyBank, Briefcase, Gem, Coins } from "lucide-react";
import { BUDGETS } from "@/data/siteConfig";

// Icons and Descriptions mapping for visual consistency
const BUDGET_ASSETS: Record<string, { desc: string; icon: React.ReactNode }> = {
  "Under ₹250": { desc: "Corporate Giveaways", icon: <Wallet className="w-4 h-4" /> },
  "₹250 - ₹500": { desc: "Standard Swag", icon: <PiggyBank className="w-4 h-4" /> },
  "₹500 - ₹1000": { desc: "Premium Accessories", icon: <Coins className="w-4 h-4" /> },
  "₹1000 - ₹2500": { desc: "Executive Hampers", icon: <Briefcase className="w-4 h-4" /> },
  "₹2500+": { desc: "Luxury & VIP Gifts", icon: <Gem className="w-4 h-4" /> }
};

export function GiftsByBudget() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-full overflow-hidden py-6 bg-[#faf9f6] border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-w-0">
          
          {/* Label */}
          <div className="flex-shrink-0 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">Quick Filters</span>
            <h3 className="text-sm font-bold text-gray-900 leading-none mt-1.5">Shop by Budget Range</h3>
          </div>

          {/* Premium Tab bar */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-full min-w-0 md:flex md:items-center md:overflow-x-auto md:no-scrollbar md:pb-1.5 md:w-auto md:px-1">
            {BUDGETS.map((item, idx) => {
              const asset = BUDGET_ASSETS[item.value] || { desc: "Premium Gifts", icon: <Gem className="w-4 h-4" /> };
              
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                  className="relative p-3 rounded-xl border border-gray-200/80 hover:border-red-500/20 bg-white transition-all text-left md:flex-shrink-0 flex items-center gap-3 shadow-xs hover:shadow-md cursor-pointer group min-w-0 md:min-w-[160px]"
                >
                  {/* Sliding background tab glow */}
                  {activeIdx === idx && (
                    <motion.div
                      layoutId="budgetTabGlow"
                      className="absolute inset-0 bg-red-50/50 border border-red-500/20 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon Box */}
                  <div className="bg-gray-50 group-hover:bg-red-500 group-hover:text-white p-2.5 rounded-lg text-gray-700 transition-colors">
                    {asset.icon}
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-red-500 transition-colors leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[9px] text-gray-400 font-bold mt-0.5 leading-tight">
                      {asset.desc}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
