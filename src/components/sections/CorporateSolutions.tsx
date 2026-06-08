"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { SafeImage } from "../ui/SafeImage";

const PRODUCT_CATEGORIES = [
  {
    title: "Pens",
    desc: "Elegant metal & plastic writing instruments.",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop",
    href: "/products?category=pens",
  },
  {
    title: "T-Shirts",
    desc: "High-comfort branded polo & round-neck apparel.",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    href: "/products?category=t-shirts",
  },
  {
    title: "Keychains",
    desc: "Premium metal, leather & acrylic custom keyrings.",
    image: "/images/keychain.png",
    href: "/products?category=keychains",
  },
  {
    title: "Diaries / Notebooks",
    desc: "Premium hardbound and soft leather organizers.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
    href: "/products?category=diaries",
  },
  {
    title: "Caps",
    desc: "Embroided premium cotton sports & panel caps.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop",
    href: "/products?category=caps",
  },
  {
    title: "Paper Weights",
    desc: "Executive desk paper weights with precision logo placement.",
    image: "/images/paperweight.png",
    href: "/products?category=paper-weights",
  },
  {
    title: "Mouse Pads / Table Mats",
    desc: "Branded desk mats, table mats, and mouse pads.",
    image: "/images/mousepad.png",
    href: "/products?category=mouse-pads-table-mats",
  },
  {
    title: "Table Top Items",
    desc: "Desk organizers, pen stands, and compact office utilities.",
    image: "/images/tabletopup.png",
    href: "/products?category=table-top-items",
  },
  {
    title: "Backpacks / Bags",
    desc: "Durable travel backpacks, laptop sleeves & duffels.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    href: "/products?category=backpacks",
  },
];

export function CorporateSolutions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {PRODUCT_CATEGORIES.map((cat, idx) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
          className="group relative flex flex-col justify-between h-[320px] rounded-2xl overflow-hidden border border-gray-150 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Card Image Container */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={cat.image}
              alt={cat.title}
              category={cat.href.split("category=")[1]}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent transition-opacity duration-300" />
          </div>

          {/* Action buttons (only visible or styled on hover) */}
          <div className="absolute top-4 right-4 z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={`/enquiry?product=${encodeURIComponent(cat.title)}`}
              className="flex items-center justify-center p-2.5 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition-colors"
              title="Quick Quote Request"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>
          </div>

          {/* Text Content */}
          <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
            <div className="space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-red-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed max-w-[200px] sm:max-w-none">
                {cat.desc}
              </p>
            </div>
            
            {/* View Collection Trigger */}
            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
              <Link 
                href={cat.href}
                className="text-[11px] font-extrabold uppercase tracking-widest text-amber-200 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                View Catalog <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
