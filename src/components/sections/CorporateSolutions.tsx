"use client";

import React, { useEffect, useState } from "react";
import { DEFAULT_KIT_IMAGE } from "@/lib/kitImageMap";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { SafeImage } from "../ui/SafeImage";
import { resolveCategoryImage } from "@/lib/imageResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";
import { toDisplayName } from "@/lib/displayNames";
import { getCategoryPresentation } from "@/lib/catalogPresentation";

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentGroup?: string;
  order?: number;
}

export function CorporateSolutions() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const promo = (res.data as CategoryRecord[]).filter((category) => category.parentGroup === "Promotional Products");
          setCategories(promo);
        }
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[340px] rounded-3xl bg-[#F8F7F3] animate-pulse border border-[#F5C2C2]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((cat, idx) => {
        const meta = getCategoryPresentation(cat.slug || cat.name);
        const displayTitle = meta.displayName || toDisplayName(cat.name);
        const description = (cat.description && !cat.description.includes("managed from MongoDB CMS"))
          ? cat.description
          : meta.marketingDescription;
        const fallbackImg = meta.fallbackImage || DEFAULT_KIT_IMAGE;
        const imageSrc = resolveCategoryImage(cat, fallbackImg) || fallbackImg;

        return (
          <motion.div
            key={cat.id || cat.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.55, delay: (idx % 4) * 0.06 }}
            className="group relative flex flex-col justify-between h-[340px] rounded-3xl overflow-hidden border border-gray-200/80 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#EF4444]/40 transition-all duration-500"
          >
            {/* Card Background Image Container */}
            <div className="absolute inset-0 z-0">
              <SafeImage
                src={imageSrc}
                alt={displayTitle}
                category={cat.slug}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Premium Multi-Layered Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20 group-hover:via-slate-900/70 transition-all duration-300" />
            </div>

            {/* Top Badge & Action Button */}
            <div className="relative z-10 p-5 flex items-center justify-between w-full">
              {meta.badge ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/90 text-white shadow-md backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-amber-300" /> {meta.badge}
                </span>
              ) : <div />}

              <Link
                href={buildEnquiryUrl({ category: cat.slug })}
                className="flex items-center justify-center p-2.5 bg-white/10 hover:bg-[#DC2626] text-white rounded-2xl backdrop-blur-md shadow-md border border-white/20 hover:border-transparent transition-all duration-300 transform group-hover:scale-105"
                title="Quick Quote Request"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>
            </div>

            {/* Text Content */}
            <div className="relative z-10 p-6 flex flex-col justify-end text-white">
              <div className="space-y-2 transform group-hover:-translate-y-1.5 transition-transform duration-300">
                <h3 className="text-xl font-black tracking-tight text-white leading-tight group-hover:text-red-400 transition-colors">
                  {displayTitle}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 font-medium">
                  {description}
                </p>
              </div>
              
              {/* View Catalog Trigger */}
              <div className="pt-4 border-t border-white/15 mt-4 flex items-center justify-between">
                <Link 
                  href={`/products?category=${cat.slug}`}
                  className="text-[11px] font-black uppercase tracking-widest text-red-400 group-hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  {meta.ctaText || "VIEW CATALOG"} <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
