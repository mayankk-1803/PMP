"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Headphones, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

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
}

export function BrandShowcase({ compact = false }: BrandShowcaseProps) {
  const [brands, setBrands] = useState<BrandRecord[]>([]);

  useEffect(() => {
    fetch("/api/catalog/brands")
      .then((response) => response.json())
      .then((payload) => setBrands(payload.data ?? []))
      .catch(() => setBrands([]));
  }, []);

  return (
    <section className={compact ? "bg-[#faf9f6] py-16 overflow-hidden" : "bg-[#f8f4ef] py-16 md:py-20 overflow-hidden"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[10px] font-extrabold uppercase tracking-widest text-red-600 mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Brand Partner Network
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-950 mb-4">
              Premium brand partners, organized for <span className="text-red-600">corporate gifting</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-medium">
              Source curated brand-led kits across audio, travel, drinkware, apparel, utility, and executive gifting with tasteful logo placement and corporate-ready packaging.
            </p>
          </div>
          {!compact && (
            <Button className="rounded-xl bg-gray-950 text-white hover:bg-gray-800 border-0 font-bold w-full sm:w-auto" asChild>
              <Link href="/enquiry?source=brands">
                Plan a Brand Kit <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-14">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.03 }}
              className="h-full min-h-[190px] rounded-xl bg-white border border-black/5 shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg transition-all text-left flex flex-col justify-between"
            >
              <BrandLogo brand={brand} className="mb-5 h-20 md:h-24" />
              <div>
                <h3 className="text-sm md:text-base font-black text-gray-950">{brand.name}</h3>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 mt-1">{brand.industry || brand.slug}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{brand.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-gray-950 via-neutral-900 to-red-950 p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <Headphones className="w-4 h-4" /> Partner Showcase
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Build a co-branded kit around your audience.</h3>
              <p className="text-sm text-gray-300 max-w-2xl">
                Mix apparel, drinkware, audio, travelware, stationery, and useful desk tech into one premium gifting experience.
              </p>
            </div>
            <Link href="/enquiry?source=partner-showcase" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-gray-950 px-6 py-3 text-sm font-bold hover:bg-amber-50 transition-colors">
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
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-black tracking-widest text-red-600">
        {brand.name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
