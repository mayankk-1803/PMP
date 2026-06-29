"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Activity, HardHat, Store, ArrowRight, Shield } from "lucide-react";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { Button } from "@/components/ui/Button";

const INDUSTRIES = [
  {
    id: "pharma",
    title: "Pharma & Healthcare",
    tagline: "Regulatory Compliance & High Utility",
    desc: "Specially curated doctor engagement kits, daily reporting MR (Medical Representative) starter packs, branded premium diagnostics utility cases, and clinical wellness gifts. Built to comply with health sector guidelines while projecting high visual quality.",
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
    icon: <Activity className="h-6 h-6 text-red-600" />,
    link: "/corporate-kits?kit=pharma-representative-kits",
    bulletPoints: [
      "Custom branded medical organizer bags",
      "Scribble pads & metal pen combinations",
      "Hygienic vacuum steel flasks",
      "Pharma compliance-friendly gift profiles"
    ]
  },
  {
    id: "realestate",
    title: "Real Estate & Engineering",
    tagline: "Rugged Durability & Executive Appeal",
    desc: "Heavy-duty contractor loyalty kits, architect design tools, and premium channel partner key handovers. Designed for long-lasting performance on construction sites, balanced with executive premium aesthetics for corporate handovers.",
    img: "https://images.unsplash.com/photo-1503387762-592dea58ef4e?q=80&w=800&auto=format&fit=crop",
    icon: <HardHat className="h-6 h-6 text-red-600" />,
    link: "/corporate-kits?kit=architect-kits",
    bulletPoints: [
      "Heavy-duty utility toolkits & cases",
      "Executive leather diaries and metal markers",
      "Custom metal keyrings with deep engravings",
      "Weatherproof site bags & merchandise"
    ]
  },
  {
    id: "retail",
    title: "Retail & Brand Activation",
    tagline: "High Visibility & Loyalty Curation",
    desc: "Custom point-of-sale promotional items, distributor incentive packaging, retail partner loyalty boxes, and branded clothing assets. Built to capture consumer attention in-store and incentivize reseller channel networks.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    icon: <Store className="h-6 h-6 text-red-600" />,
    link: "/corporate-kits?kit=channel-partner-kits",
    bulletPoints: [
      "Point-of-sale counter standees & banners",
      "Custom-printed merchant welcome kits",
      "Distributor target milestone rewards",
      "Branded uniform apparel & accessories"
    ]
  }
];

export default function IndustrySolutionsPage() {
  return (
    <div className="pt-32 pb-0 bg-[#fafafa] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-red-50/30 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Tailored Industry Fit
          </span>
          <SectionHeading 
            title={<>Industry-Specific <span className="text-red-600">Solutions</span></>}
            subtitle="Explore specialized kits and custom gifting programs designed strategically to fit the unique requirements, branding rules, and budgets of your market sector." 
            centered 
          />
        </div>

        {/* Industry Cards Layout */}
        <div className="space-y-24 mb-28">
          {INDUSTRIES.map((ind, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image panel */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                    <img 
                      src={ind.img} 
                      alt={ind.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                </div>

                {/* Content Panel */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      {ind.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-red-600 uppercase block">
                        {ind.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
                        {ind.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {ind.desc}
                  </p>

                  {/* Bullet Spec Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {ind.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-700 font-bold">
                        <Shield className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3.5 px-6 shadow-md border-0"
                      asChild
                    >
                      <Link href={ind.link}>
                        Explore Kits
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl font-bold border-gray-300 hover:bg-gray-50 py-3.5 px-6"
                      asChild
                    >
                      <Link href={`/enquiry?source=industry-${ind.id}`}>
                        Request Industry Proposal
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Industry CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Full-Service Procurement
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Don't see your specific industry vertical listed?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                No worries! We curate bespoke packages for tech startups, educational institutes, bank portals, and logistics houses. Let us build a tailored pitch from scratch.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=industry-custom">
                  Talk to a Curator
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>

      <GiftsByBudget />
    </div>
  );
}
