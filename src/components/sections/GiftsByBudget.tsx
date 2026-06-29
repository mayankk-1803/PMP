"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, PiggyBank, Briefcase, Gem, Coins } from "lucide-react";
import { BUDGETS } from "@/data/siteConfig";
import { staggerContainerFast, staggerItemLeft, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BUDGET_ASSETS: Record<string, { desc: string; icon: React.ReactNode }> = {
  "Under ₹250": { desc: "Corporate Giveaways", icon: <Wallet className="w-4 h-4" /> },
  "₹250 - ₹500": { desc: "Standard Swag", icon: <PiggyBank className="w-4 h-4" /> },
  "₹500 - ₹1000": { desc: "Premium Accessories", icon: <Coins className="w-4 h-4" /> },
  "₹1000 - ₹2500": { desc: "Executive Hampers", icon: <Briefcase className="w-4 h-4" /> },
  "₹2500+": { desc: "Luxury & VIP Gifts", icon: <Gem className="w-4 h-4" /> }
};

export function GiftsByBudget() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <div className="w-full max-w-full overflow-hidden py-6 bg-[#F8F7F3] border-b border-[#F5C2C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-w-0">
          
          {/* Label */}
          <div className="flex-shrink-0 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350]">Quick Filters</span>
            <h3 className="text-sm font-bold text-[#2B2B2B] leading-none mt-1.5">Shop by Budget Range</h3>
          </div>

          {/* Premium Tab bar */}
          <motion.div
            variants={prefersReduced ? undefined : staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="grid grid-cols-2 gap-3 w-full max-w-full min-w-0 md:flex md:items-center md:overflow-x-auto md:no-scrollbar md:pb-1.5 md:w-auto md:px-1"
          >
            {BUDGETS.map((item, idx) => {
              const asset = BUDGET_ASSETS[item.value] || { desc: "Premium Gifts", icon: <Gem className="w-4 h-4" /> };
              
              return (
                <motion.div
                  key={idx}
                  variants={prefersReduced ? undefined : staggerItemLeft}
                >
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                    className="relative p-3 rounded-xl border border-[#F5C2C2] hover:border-[#D32F2F]/30 bg-white transition-all text-left md:flex-shrink-0 flex items-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer group min-w-0 md:min-w-[160px]"
                  >

                  {/* Sliding background tab glow */}
                  {activeIdx === idx && (
                    <motion.div
                      layoutId="budgetTabGlow"
                      className="absolute inset-0 bg-[#FAF9F6] border border-[#D32F2F]/20 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon Box */}
                  <div className="bg-[#FAF9F6] group-hover:bg-[#D32F2F] group-hover:text-white p-2.5 rounded-lg text-[#6B6B63] transition-colors">
                    {asset.icon}
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#2B2B2B] group-hover:text-[#D32F2F] transition-colors leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[9px] text-[#6B6B63] font-bold mt-0.5 leading-tight">
                      {asset.desc}
                    </div>
                  </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
