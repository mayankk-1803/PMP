"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { SafeImage } from "../ui/SafeImage";
import { localCatalogImage } from "@/lib/localCatalogImages";

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
          const promo = res.data.filter((c: any) => c.parentGroup === "Promotional Products");
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
          <div key={i} className="h-[320px] rounded-2xl bg-gray-200 animate-pulse border border-gray-300" />
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
          className="group relative flex flex-col justify-between h-[320px] rounded-2xl overflow-hidden border border-gray-150 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Card Image Container */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={localCatalogImage(cat.name) || cat.image || "/images/joiningkit.png"}
              alt={cat.name}
              category={cat.slug}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent transition-opacity duration-300" />
          </div>

          {/* Action buttons (only visible or styled on hover) */}
          <div className="absolute top-4 right-4 z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={`/enquiry?product=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-center p-2.5 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-colors"
              title="Quick Quote Request"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>
          </div>

          {/* Text Content */}
          <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
            <div className="space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-red-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed max-w-[200px] sm:max-w-none">
                {cat.description || `Custom corporate branding on premium ${cat.name.toLowerCase()} options.`}
              </p>
            </div>
            
            {/* View Collection Trigger */}
            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
              <Link 
                href={`/products?category=${cat.slug}`}
                className="text-[11px] font-extrabold uppercase tracking-widest text-amber-200 hover:text-white transition-colors inline-flex items-center gap-1"
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
