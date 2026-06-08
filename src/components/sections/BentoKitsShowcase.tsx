"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Briefcase, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE_KITS } from "@/data/siteConfig";
import { SafeImage } from "../ui/SafeImage";

// Select specifically relevant kits for the home page Bento Grid
const BENTO_MAPPING = [
  {
    slug: "joining",
    badge: "Most Popular",
    size: "large",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-red-600 to-rose-500",
    image: "/images/joiningkit.png"
  },
  {
    slug: "doctor",
    badge: "Industry Favorite",
    size: "medium",
    icon: <Award className="w-5 h-5" />,
    color: "from-amber-600 to-yellow-500",
    image: "/images/doctorkit.png"
  },
  {
    slug: "dealer",
    badge: "B2B Channels",
    size: "medium",
    icon: <Shield className="w-5 h-5" />,
    color: "from-blue-600 to-indigo-500",
    image: "/images/dealerkit.png"
  },
  {
    slug: "sales",
    badge: "Field Ops",
    size: "large",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-neutral-900 to-neutral-700",
    image: "/images/salesteamkit.png"
  }
];

export function BentoKitsShowcase() {
  // Map our visual configurations with the detailed data from SITE_KITS
  const bentoKits = BENTO_MAPPING.map(config => {
    const data = SITE_KITS.find(k => k.slug === config.slug) || SITE_KITS[0];
    return {
      ...config,
      title: data.title,
      desc: data.description,
      image: config.image,
      href: `/corporate-kits?kit=${config.slug}`
    };
  });

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3 block flex items-center gap-1.5">Tailored Merchandise Packages</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Corporate Kits for <span className="text-red-500">Every Field</span>
            </h2>
            <p className="text-base text-gray-500 font-medium">
              Select from curated, pre-designed kits tailored for internal employee success and external partner networks.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-xl border-gray-250 font-bold" asChild>
            <Link href="/corporate-kits">View All Kits</Link>
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bentoKits.map((kit, index) => {
            const isLarge = kit.size === "large";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${
                  isLarge ? "md:col-span-2" : "col-span-1"
                } relative group rounded-2xl overflow-hidden glass-card border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-[380px]`}
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
                  {/* Subtle luxury dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-black/15" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                  {/* Badge & Icon Row */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 bg-red-600 rounded-lg shadow-md shadow-red-600/35">
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
                        className="rounded-xl px-4 py-2.5 text-xs font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-sm border-0"
                        asChild
                      >
                        <Link href={kit.href}>Get Quote</Link>
                      </Button>
                      <Link
                        href={kit.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-red-400 transition-colors uppercase tracking-widest group"
                      >
                        Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 md:hidden text-center">
          <Button variant="outline" className="w-full rounded-xl border-gray-250 font-bold py-4" asChild>
            <Link href="/corporate-kits">View All Kits</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
