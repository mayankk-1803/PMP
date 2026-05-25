"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRANDS } from "@/data/siteConfig";
import { Sparkles, ArrowUpRight, Award, Headphones, Shield } from "lucide-react";

interface BrandStory {
  title: string;
  brand: string;
  logo: string;
  icon: React.ReactNode;
  desc: string;
  tag: string;
}

const FEATURED_PARTNERS: BrandStory[] = [
  {
    brand: "Mokobara",
    title: "Executive Travelware Curation",
    logo: "/logos/mokobara.png",
    icon: <Shield className="w-5 h-5 text-red-500" />,
    desc: "Premium luggage and bags customized with precision laser-engraved metal brand tags. Elevates standard client handouts into luxury corporate travel companions.",
    tag: "Luxury Travel & Bags"
  },
  {
    brand: "JBL & boAt",
    title: "Premium Audio Engraving",
    logo: "/logos/jbl.png",
    icon: <Headphones className="w-5 h-5 text-amber-500" />,
    desc: "Studio-grade wireless headphones and portable speaker setups finished with high-durability color-matched prints. Perfect for high-impact employee onboarding kits.",
    tag: "High-End Acoustics"
  },
  {
    brand: "Parker Pens",
    title: "Heritage Executive Writing",
    logo: "/logos/parker.png",
    icon: <Award className="w-5 h-5 text-emerald-500" />,
    desc: "Classic metal rollerballs personalized with individual name engravings and gold-leaf logo plates. The ultimate asset for corporate agreements and milestone sign-offs.",
    tag: "Executive Signature"
  }
];

export function PremiumBrands() {
  // Duplicate for seamless infinite marquee loop
  const marqueeBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="bg-[#0c0c0e] py-24 border-y border-white/5 relative overflow-hidden select-none text-white">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-950/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold tracking-widest uppercase mb-4 inline-block text-red-500">
            Branded Corporate Partnerships
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Co-Brand with the World&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-300">Leading Names</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Boost company trust by co-branding employee packages and customer gifts with premium retail products. We handle all licensing, sourcing, and customization.
          </p>
        </div>

        {/* Brand Storytelling Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {FEATURED_PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5, borderColor: "rgba(220, 38, 38, 0.25)" }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 text-left group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md">
                    {partner.tag}
                  </span>
                  <div className="bg-white/10 w-9 h-9 rounded-lg flex items-center justify-center border border-white/5">
                    {partner.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-red-500 uppercase tracking-widest">{partner.brand} Partnership</h4>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                    {partner.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                    {partner.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                <span>Authorized Co-Branding SLA</span>
                <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Horizontal Marquee Container */}
        <div className="relative w-full flex items-center justify-start overflow-hidden bg-white/5 py-10 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex items-center gap-16 md:gap-24">
            {marqueeBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center justify-center h-12 w-28 md:w-32 relative filter grayscale invert hover:grayscale-0 hover:invert-0 hover:scale-105 transition-all duration-300 cursor-pointer"
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

        {/* Footer CTAs */}
        <div className="text-center pt-12">
          <p className="text-xs sm:text-sm text-gray-400 mb-4 font-semibold px-4">
            Custom branding available on Adidas apparel, JBL speakers, Mokobara backpacks, Borosil glassware, and more.
          </p>
          <Link 
            href="/enquiry?source=cobranding"
            className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest hover:underline transition-colors flex items-center justify-center gap-1.5"
          >
            Enquire About Premium Co-Branding SLA <Sparkles className="w-3.5 h-3.5 fill-red-500 text-red-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}