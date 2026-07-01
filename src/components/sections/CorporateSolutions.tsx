"use client";

import React, { useEffect, useState } from "react";
import { DEFAULT_KIT_IMAGE } from "@/lib/kitImageMap";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { SafeImage } from "../ui/SafeImage";
import { resolveCategoryImage } from "@/lib/imageResolver";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";

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
          <div key={i} className="h-[320px] rounded-2xl bg-[#F8F7F3] animate-pulse border border-[#F5C2C2]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.id || cat.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
          className="group relative flex flex-col justify-between h-[320px] rounded-2xl overflow-hidden border border-[#F5C2C2]/60 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Card Image Container */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={resolveCategoryImage(cat, DEFAULT_KIT_IMAGE)}
              alt={cat.name}
              category={cat.slug}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/90 via-[#2B2B2B]/40 to-transparent transition-opacity duration-300" />
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={buildEnquiryUrl({ category: cat.slug })}
              className="flex items-center justify-center p-2.5 bg-[#D32F2F] text-white rounded-xl shadow-md hover:bg-[#C62828] transition-colors"
              title="Quick Quote Request"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>
          </div>

          {/* Text Content */}
          <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
            <div className="space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-bold tracking-tight text-white leading-tight group-hover:text-[#EF5350] transition-colors">
                {cat.name === "Drinkware" ? "Drink Ware" : cat.name}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed max-w-[200px] sm:max-w-none line-clamp-2">
                {cat.description || `Custom corporate branding on premium ${(cat.name === "Drinkware" ? "drink ware" : cat.name).toLowerCase()} options.`}
              </p>
            </div>
            
            {/* View Collection Trigger */}
            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
              <Link 
                href={`/products?category=${cat.slug}`}
                className="text-[11px] font-extrabold uppercase tracking-widest text-[#EF5350] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                View Catalog <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
