"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { CORPORATE_GIFTS, PRODUCTS } from "@/data/siteConfig";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PromoMerchPage() {
  // Dynamically resolve category cards by matching them to products in siteConfig
  const categories = CORPORATE_GIFTS.map((gift) => {
    const matchedProduct = Object.values(PRODUCTS).find(
      (p) => p.category.toLowerCase() === gift.slug.toLowerCase()
    );
    return {
      title: gift.name,
      slug: gift.slug,
      href: gift.href,
      description: matchedProduct
        ? matchedProduct.description
        : `Custom corporate branding and bespoke finishes on premium ${gift.name.toLowerCase()} giveaways.`,
      imageUrl: matchedProduct
        ? matchedProduct.images[0]
        : "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    };
  });

  return (
    <div className="pt-32 pb-0 bg-[#fafafa] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Soft overlay */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-red-50/30 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Promotional Giveaways
          </span>
          <SectionHeading 
            title={<>Custom <span className="text-red-600">Promotional Merchandise</span></>}
            subtitle="Explore our comprehensive range of office utility, technology gadgets, apparel, and lifestyle items. Fully customized with your company logo using precision methods."
            centered 
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: (i % 4) * 0.05, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all cursor-pointer relative"
            >
              <Link href={cat.href} className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative w-full h-[180px] overflow-hidden bg-gray-50 flex-shrink-0">
                  <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-500" />
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16, 1, 0.3, 1] group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 z-20">
                    <span className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm border border-gray-100 inline-block transition-transform duration-300 group-hover:rotate-45 group-hover:bg-red-600 group-hover:text-white">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
                    {cat.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-red-600">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Bulk Branding Capabilities
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Curating merchandise for a <span className="text-red-500">large corporate event</span>?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Connect with our account managers. We provide volume wholesale discounts, print sample runs, and offer warehouse consolidation with doorstep distribution.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=promo-merchandise-bulk">
                  Get Wholesale Rates
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>

      <GiftsByBudget />
    </div>
  );
}
