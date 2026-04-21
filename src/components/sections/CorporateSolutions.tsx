"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Promotional Gifts",
    desc: "Strategic merchandise and custom giveaways that keep your brand top-of-mind.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop",
    href: "/promotional-merchandise"
  },
  {
    title: "Corporate Kits",
    desc: "Premium onboarding and welcome kits designed for the modern workplace.",
    image: "https://printingstudio.in/cdn/shop/files/business-objects-desk-top-view.jpg?v=1709971155&width=1445",
    href: "/corporate-kits"
  },
  {
    title: "Occasion Hampers",
    desc: "Luxury curations for festivals, anniversaries, and company milestones.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    href: "/festive-gifting"
  }
];

export function CorporateSolutions() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {CATEGORIES.map((cat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link href={cat.href} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                unoptimized
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-red-600 mb-3 transition-colors">{cat.title}</h3>
              <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">{cat.desc}</p>
              <div className="mt-auto flex items-center text-xs font-bold text-gray-900 uppercase tracking-[0.1em]">
                View Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
