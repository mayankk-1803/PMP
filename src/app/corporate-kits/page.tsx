"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { SITE_KITS, SITE_HAMPERS } from "@/data/siteConfig";
import { Briefcase, HardHat, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CorporateKitsPage() {
  const [activeTab, setActiveTab] = useState<"corporate" | "industry" | "festive">("corporate");

  const corporateKits = SITE_KITS.filter((kit) => kit.category === "corporate");
  const industryKits = SITE_KITS.filter((kit) => kit.category === "industry");
  const festiveHampers = SITE_HAMPERS.map((h) => ({
    title: h.title,
    description: h.desc || h.description,
    imageUrl: h.imageUrl || h.image,
    price: h.price,
  }));

  const tabItems = [
    { id: "corporate", label: "Employee & Joining Kits", icon: <Briefcase className="w-4 h-4" /> },
    { id: "industry", label: "Field & Industry Kits", icon: <HardHat className="w-4 h-4" /> },
    { id: "festive", label: "Festive & Occasion Hampers", icon: <Gift className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#faf9f6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-50/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Curated Gift Sets
          </span>
          <SectionHeading 
            title={<>Corporate <span className="text-red-600">Kits & Hampers</span></>}
            subtitle="Explore our catalog of premium, custom-branded onboarding kits, specialized field employee kits, and luxury festive hampers curated to elevate your brand perception."
            centered
          />
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex justify-center mb-16 px-4">
          <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-4xl w-full md:w-auto relative z-10">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full md:w-auto ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kits Display Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {activeTab === "corporate" &&
                corporateKits.map((kit, idx) => (
                  <ProductCard
                    key={kit.slug}
                    title={kit.title}
                    description={kit.description}
                    imageUrl={kit.imageUrl}
                    price={kit.price}
                    index={idx}
                    className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                  />
                ))}

              {activeTab === "industry" &&
                industryKits.map((kit, idx) => (
                  <ProductCard
                    key={kit.slug}
                    title={kit.title}
                    description={kit.description}
                    imageUrl={kit.imageUrl}
                    price={kit.price}
                    index={idx}
                    className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                  />
                ))}

              {activeTab === "festive" &&
                festiveHampers.map((hamper, idx) => (
                  <ProductCard
                    key={hamper.title}
                    title={hamper.title}
                    description={hamper.description}
                    imageUrl={hamper.imageUrl}
                    price={hamper.price}
                    index={idx}
                    className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                  />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Premium Call to Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          {/* Ambient Glows inside the CTA banner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Bespoke Packaging & Gifting
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Want to curate a <span className="text-red-500">completely custom</span> kit?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Tell us your budget, quantity, and product preferences. Our team will draft custom dielines, mockups, and organize pan-India door-to-door delivery.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=custom-kit">
                  Request Custom Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}