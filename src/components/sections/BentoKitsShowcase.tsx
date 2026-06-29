"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Briefcase, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { SafeImage } from "../ui/SafeImage";
import { staggerContainer, cardReveal, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { corporateKitImageOrFallback } from "@/lib/kitImageMap";
import { getCanonicalKitSlug } from "@/lib/slugResolver";

interface KitSubcategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

type BentoKit = (typeof BENTO_MAPPING)[number] & {
  title: string;
  desc: string;
  href: string;
};

const BENTO_MAPPING = [
  {
    slug: "joining",
    badge: "Most Popular",
    size: "large",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-[#D32F2F] to-[#C62828]",
    image: corporateKitImageOrFallback("Joining Kits")
  },
  {
    slug: "doctor",
    badge: "Industry Favorite",
    size: "medium",
    icon: <Award className="w-5 h-5" />,
    color: "from-amber-600 to-yellow-500",
    image: corporateKitImageOrFallback("Doctor Kits")
  },
  {
    slug: "dealer",
    badge: "B2B Channels",
    size: "medium",
    icon: <Shield className="w-5 h-5" />,
    color: "from-blue-600 to-indigo-500",
    image: corporateKitImageOrFallback("Dealer Kits")
  },
  {
    slug: "sales",
    badge: "Field Ops",
    size: "large",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-neutral-900 to-neutral-700",
    image: corporateKitImageOrFallback("Sales Team Kit")
  }
];

export function BentoKitsShowcase() {
  const [bentoKits, setBentoKits] = useState<BentoKit[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetch("/api/catalog/subcategories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const subcats = res.data as KitSubcategory[];
          const mapped = BENTO_MAPPING.map(config => {
            const dbSlug = getCanonicalKitSlug(config.slug) || "";
            const item = subcats.find((subcategory) => subcategory.slug === dbSlug);
            return {
              ...config,
              title: item?.name || (config.slug.charAt(0).toUpperCase() + config.slug.slice(1) + " Kit"),
              desc: item?.description || "Curated premium corporate onboarding and channel gifting kits.",
              image: item?.image || config.image,
              href: `/corporate-kits?kit=${dbSlug}`
            };
          });
          setBentoKits(mapped);
        }
        setLoading(false);
      })
      .catch(() => {
        setBentoKits([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#FAF9F6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative h-[380px] rounded-2xl bg-[#F8F7F3] border border-[#F5C2C2] overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl text-left">
            <span className="text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">Tailored Merchandise Packages</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#2B2B2B] mb-4">
              Corporate Kits for <span className="text-[#D32F2F]">Every Field</span>
            </h2>
            <p className="text-base text-[#6B6B63] font-medium">
              Select from curated, pre-designed kits tailored for internal employee success and external partner networks.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-xl font-bold" asChild>
            <Link href="/corporate-kits">View All Kits</Link>
          </Button>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bentoKits.map((kit, index) => {
            const isLarge = kit.size === "large";
            return (
              <motion.div
                key={index}
                variants={prefersReduced ? undefined : cardReveal}
                whileHover={prefersReduced ? undefined : { scale: 1.01, y: -4 }}
                transition={{ duration: 0.3 }}
                className={`${
                  isLarge ? "md:col-span-2" : "col-span-1"
                } relative group rounded-2xl overflow-hidden border border-[#F5C2C2]/60 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-[380px]`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  <SafeImage
                    src={kit.image}
                    alt={kit.title}
                    category={kit.slug}
                    useNextImage={true}
                    nextImageProps={{
                      fill: true,
                      unoptimized: true
                    }}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/95 via-[#2B2B2B]/60 to-[#2B2B2B]/15 transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                  {/* Badge & Icon Row */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 bg-[#D32F2F] rounded-lg shadow-md">
                      {kit.badge}
                    </span>
                    <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      {kit.icon}
                    </div>
                  </div>

                  {/* Text Details & Actions */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white drop-shadow-md">
                        {kit.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm max-w-xl leading-relaxed font-medium drop-shadow-sm">
                        {kit.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-xl px-4 py-2.5 text-xs font-bold bg-white text-[#2B2B2B] hover:bg-[#FAF9F6] shadow-sm border-0"
                        asChild
                      >
                        <Link href={kit.href}>Get Quote</Link>
                      </Button>
                      <Link
                        href={kit.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#EF5350] transition-colors uppercase tracking-widest group"
                      >
                        Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile View All CTA */}
        <div className="mt-8 md:hidden text-center">
          <Button variant="outline" className="w-full rounded-xl font-bold py-4" asChild>
            <Link href="/corporate-kits">View All Kits</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
