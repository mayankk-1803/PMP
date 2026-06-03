"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Headphones, Luggage, PenLine, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { BRANDS } from "@/data/siteConfig";
import { Button } from "../ui/Button";

const SHOWCASE_SECTIONS = [
  {
    title: "Featured Brand Partners",
    description: "High-recognition brands for anchor kits, leadership gifting, and campaign centerpiece products.",
    icon: <ShieldCheck className="w-4 h-4" />,
    brands: ["JBL", "boAt", "Mokobara", "Parker"]
  },
  {
    title: "Corporate Merchandise Brands",
    description: "Apparel, wearables, and everyday merchandise that teams can use beyond the event day.",
    icon: <BriefcaseBusiness className="w-4 h-4" />,
    brands: ["Adidas", "Noise", "Wildcraft"]
  },
  {
    title: "Travel & Lifestyle Brands",
    description: "Travelware and lifestyle pieces suited to sales teams, channel partners, and milestone rewards.",
    icon: <Luggage className="w-4 h-4" />,
    brands: ["Mokobara", "American Tourister", "Wildcraft"]
  },
  {
    title: "Drinkware & Utility Brands",
    description: "Reliable drinkware and daily utility products for onboarding kits and desk-ready gift sets.",
    icon: <Trophy className="w-4 h-4" />,
    brands: ["Milton", "Portronics", "boAt"]
  },
  {
    title: "Executive Gift Brands",
    description: "Premium writing, desk, tech, and lifestyle products for leadership and client appreciation programs.",
    icon: <PenLine className="w-4 h-4" />,
    brands: ["Parker", "JBL", "Portronics", "Noise"]
  }
];

interface BrandShowcaseProps {
  compact?: boolean;
}

export function BrandShowcase({ compact = false }: BrandShowcaseProps) {
  const brandByName = new Map(BRANDS.map((brand) => [brand.name, brand]));

  return (
    <section className={compact ? "bg-[#faf9f6] py-20 overflow-hidden" : "bg-[#f8f4ef] py-24 overflow-hidden"}>
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.03 }}
              className="h-full rounded-xl bg-white border border-black/5 shadow-sm p-4 hover:-translate-y-1 hover:shadow-lg transition-all text-left"
            >
              <div className="relative h-12 w-full mb-4">
                <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left" unoptimized />
              </div>
              <h3 className="text-sm font-black text-gray-950">{brand.name}</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 mt-1">{brand.category}</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mt-3">{brand.branding}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          {SHOWCASE_SECTIONS.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: sectionIndex * 0.04 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 text-left">
                  <div className="inline-flex items-center gap-2 text-red-600 text-[10px] font-extrabold uppercase tracking-widest mb-3">
                    {section.icon} Partner Segment
                  </div>
                  <h3 className="text-2xl font-black text-gray-950">{section.title}</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mt-3">{section.description}</p>
                </div>
                <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {section.brands.map((brandName) => {
                    const brand = brandByName.get(brandName);
                    if (!brand) return null;

                    return (
                      <div key={`${section.title}-${brand.name}`} className="rounded-xl bg-white border border-black/5 p-5 shadow-sm text-left">
                        <div className="relative h-10 w-full mb-4">
                          <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left" unoptimized />
                        </div>
                        <h4 className="text-sm font-black text-gray-950">{brand.name}</h4>
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mt-1">{brand.category}</p>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed mt-3">{brand.branding}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <div className="mt-14 rounded-2xl bg-gradient-to-br from-gray-950 via-neutral-900 to-red-950 p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
