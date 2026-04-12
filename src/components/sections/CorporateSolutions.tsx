"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
  {
    title: "Employee Welcome Kits",
    desc: "Premium onboarding experiences to make new hires feel valued from day one.",
    image: "https://printingstudio.in/cdn/shop/files/business-objects-desk-top-view.jpg?v=1709971155&width=1445",
    href: "/corporate-kits"
  },
  {
    title: "Festive Gifting",
    desc: "Curated hampers for Diwali, New Year, and company milestones.",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    href: "/festive-gifting"
  },
  {
    title: "Client Gifts",
    desc: "High-quality luxury gifting to build lasting business relationships.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    href: "/promotional-merchandise"
  },
  {
    title: "Event Giveaways",
    desc: "Tailored merchandise and bespoke takeaways for corporate events.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop",
    href: "/industry-solutions"
  }
];

export function CorporateSolutions() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4 tracking-tight">Gifting by Category</h2>
          <p className="text-base md:text-lg text-[#1E3A5F]/70">Explore our comprehensive range of corporate gifting collections designed for modern businesses.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="h-full flex"
            >
              <Link href={cat.href} className="flex flex-col w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  {/* Using standard img for external images unless domains are configured in next.config */}
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-2">{cat.title}</h3>
                  <p className="text-sm text-[#1E3A5F]/60 mb-6 flex-grow leading-relaxed">{cat.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-[#1E3A5F] group-hover:text-[#C9A227] transition-colors mt-auto">
                    View Collection <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
