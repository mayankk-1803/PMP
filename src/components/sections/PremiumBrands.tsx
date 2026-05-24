"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/data/siteConfig";

export function PremiumBrands() {
  // Duplicate for seamless infinite marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="bg-white py-16 border-b border-gray-100 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">Co-Branding Partners</span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-1">
          Co-Brand with the World&apos;s <span className="text-red-500">Leading Names</span>
        </h2>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full flex items-center justify-start overflow-hidden bg-gray-50/50 py-8 border-y border-gray-100">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-16 md:gap-24">
          {marqueeBrands.map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-12 w-28 md:w-32 relative filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={130}
                height={55}
                className="object-contain max-h-full max-w-full"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-10">
        <p className="text-xs sm:text-sm text-gray-500 mb-4 font-semibold px-4">
          Want custom logo placement on premium brands? We do laser engraving, foil print, and embroidery.
        </p>
        <Link 
          href="/enquiry?source=cobranding"
          className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest hover:underline transition-colors"
        >
          Enquire About Co-Branding SLA
        </Link>
      </div>
    </section>
  );
}