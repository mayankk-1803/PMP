"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { staggerContainer, cardReveal, fadeLeft, fadeUp, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BrandShowcaseProps {
  compact?: boolean;
}

interface BrandRecord {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  industry?: string;
  category?: string;
  description?: string;
}

export function BrandShowcase({ compact = false }: BrandShowcaseProps) {
  const [brands, setBrands] = useState<BrandRecord[]>([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetch("/api/catalog/brands")
      .then((response) => response.json())
      .then((payload) => setBrands(payload.data ?? []))
      .catch(() => setBrands([]));
  }, []);

  return (
    <section className={compact ? "bg-[#F8F5EF] py-16 overflow-hidden" : "bg-[#EFE7DB] py-16 md:py-20 overflow-hidden"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
        >
          <div className="max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F5EF] border border-[#DDD5C8] text-[10px] font-extrabold uppercase tracking-widest text-[#6E7757] mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Brand Partner Network
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#2B2B2B] mb-4">
              Premium brand partners, organized for <span className="text-[#6E7757]">corporate gifting</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B63] max-w-2xl font-medium">
              Source curated brand-led kits across audio, travel, drinkware, apparel, utility, and executive gifting with tasteful logo placement and corporate-ready packaging.
            </p>
          </div>
          {!compact && (
            <Button className="rounded-xl font-bold w-full sm:w-auto" asChild>
              <Link href="/enquiry?source=brands">
                Plan a Brand Kit <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-14"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={prefersReduced ? undefined : cardReveal}
              whileHover={prefersReduced ? undefined : { y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="h-full min-h-[220px] rounded-xl bg-white border border-[#DDD5C8] shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg transition-all text-left flex flex-col justify-between"
            >
              <BrandLogo brand={brand} className="mb-4 h-16 md:h-20" />
              <div>
                <h3 className="text-sm md:text-base font-black text-[#2B2B2B]">{brand.name}</h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#6E7757]">{brand.industry || brand.slug}</span>
                  <span className="text-[9px] text-[#DDD5C8]">&bull;</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B63]">{brand.category}</span>
                </div>
                {brand.description && (
                  <p className="text-[11px] text-[#6B6B63] mt-2 line-clamp-2 leading-relaxed">{brand.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!compact && (
          <div className="mt-8 rounded-2xl bg-[#2B2B2B] p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#C8A36A] text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <Headphones className="w-4 h-4" /> Partner Showcase
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Build a co-branded kit around your audience.</h3>
              <p className="text-sm text-gray-300 max-w-2xl">
                Mix apparel, drinkware, audio, travelware, stationery, and useful desk tech into one premium gifting experience.
              </p>
            </div>
            <Link href="/enquiry?source=partner-showcase" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#2B2B2B] px-6 py-3 text-sm font-bold hover:bg-[#F8F5EF] transition-colors">
              Start Curating <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function BrandLogo({ brand, className }: { brand: BrandRecord; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (brand.logo && !failed) {
    return (
      <div className={`relative w-full ${className || ""}`}>
        <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left" sizes="(max-width: 768px) 40vw, 220px" unoptimized onError={() => setFailed(true)} />
      </div>
    );
  }

  return (
    <div className={`flex w-full items-center ${className || ""}`}>
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#DDD5C8] bg-[#EFE7DB] px-3 text-sm font-black tracking-widest text-[#6E7757]">
        {brand.name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
