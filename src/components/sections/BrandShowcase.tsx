"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Headphones, PenLine, Shirt, Sparkles, Trophy } from "lucide-react";
import { BRANDS } from "@/data/siteConfig";
import { Button } from "../ui/Button";

const PARTNER_STORIES = [
  {
    name: "Adidas & Reebok",
    title: "Performance apparel for teams",
    description: "Co-branded polos, jackets, caps, and event merchandise for employee programs and sales teams.",
    logos: ["/logos/adidas.jpg", "/logos/reebok.png"],
    icon: <Shirt className="w-5 h-5" />,
    tone: "from-red-600 to-rose-500"
  },
  {
    name: "JBL, boAt & Philips",
    title: "Tech gifts with everyday recall",
    description: "Premium audio, personal gadgets, and practical electronics curated for welcome kits and client gifting.",
    logos: ["/logos/jbl.png", "/logos/boat.png", "/logos/philips.png"],
    icon: <Headphones className="w-5 h-5" />,
    tone: "from-amber-500 to-yellow-500"
  },
  {
    name: "Parker, Borosil & Mokobara",
    title: "Executive gifting essentials",
    description: "Writing instruments, drinkware, bags, and travelware finished with tasteful logo placement.",
    logos: ["/logos/parker.png", "/logos/borosil.png", "/logos/mokobara.png"],
    icon: <PenLine className="w-5 h-5" />,
    tone: "from-neutral-800 to-neutral-600"
  }
];

interface BrandShowcaseProps {
  compact?: boolean;
}

export function BrandShowcase({ compact = false }: BrandShowcaseProps) {
  const logoWall = [...BRANDS, ...BRANDS];

  return (
    <section className={compact ? "bg-[#faf9f6] py-20 overflow-hidden" : "bg-[#f8f4ef] py-24 overflow-hidden"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-3xl text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[10px] font-extrabold uppercase tracking-widest text-red-600 mb-4">
              <BadgeCheck className="w-3.5 h-3.5" /> Brand Partner Network
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-950 mb-4">
              Premium brands for <span className="text-red-600">corporate gifting</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-medium">
              Build employee welcome kits, branded merchandise drops, and executive gifts using known retail names your teams and clients already trust.
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.03 }}
              className="h-28 rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col items-center justify-center gap-3 p-4 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="relative h-10 w-full">
                <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain" unoptimized />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 text-center">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gray-950 border border-white/10 py-8 mb-16 shadow-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10" />
          <div className="animate-marquee-slow flex items-center gap-14 px-8">
            {logoWall.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="relative h-12 w-32 flex-shrink-0 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity">
                <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain" unoptimized />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PARTNER_STORIES.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-2xl bg-white border border-black/5 shadow-sm p-6 text-left hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${story.tone} text-white flex items-center justify-center shadow-lg`}>
                  {story.icon}
                </div>
                <div className="flex -space-x-3">
                  {story.logos.map((logo) => (
                    <div key={logo} className="relative w-11 h-11 rounded-full bg-white border border-gray-100 shadow-sm p-2">
                      <Image src={logo} alt="" fill className="object-contain p-2" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">{story.name}</span>
              <h3 className="text-xl font-black text-gray-950 mt-2 mb-3">{story.title}</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{story.description}</p>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <div className="mt-14 rounded-2xl bg-gradient-to-br from-gray-950 via-neutral-900 to-red-950 p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <Trophy className="w-4 h-4" /> Partner Showcase
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Build a co-branded kit around your audience.</h3>
              <p className="text-sm text-gray-300 max-w-2xl">
                Mix apparel, drinkware, audio, travelware, grooming, stationery, and home essentials into one premium gifting experience.
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
