"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

const PRIMARY_KITS = [
  { title: "Joining Kits", price: "Custom Quote", description: "Essential onboarding kit with diary, pen, sipper, and welcome card.", imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop" },
  { title: "Dealer Kits", price: "Custom Quote", description: "High-value kits designed for your business partners and dealers.", imageUrl: "https://images.pexels.com/photos/6590930/pexels-photo-6590930.jpeg" },
  { title: "Distributor Kits", price: "Custom Quote", description: "Durable and functional kits for distribution channel partners.", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" },
  { title: "Doctor Kits", price: "Custom Quote", description: "Specially curated medical-themed stationery and utility items.", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop" },
  { title: "Architect Kits", price: "Custom Quote", description: "Premium design tools and high-quality notebooks for architects.", imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop" },
  { title: "Plumber Kits", price: "Custom Quote", description: "Branded toolbags and functional accessories for plumbing professionals.", imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca1f965?q=80&w=800&auto=format&fit=crop" },
  { title: "Mason Kits", price: "Custom Quote", description: "Rugged and durable utility kits for masonry and construction staff.", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { title: "Electrician Kits", price: "Custom Quote", description: "Safety-focused kits with branded utility tools for electricians.", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop" },
];

const ADDITIONAL_KITS = [
  { title: "Pharma Representative Kit", price: "Custom Quote", description: "Professional bags and daily reporting tools for pharma field teams.", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
  { title: "Retail Partner Kit", price: "Custom Quote", description: "In-store branding items and utility kits for retail outlet owners.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" },
  { title: "Sales Team Kit", price: "Custom Quote", description: "Motivation kits with tech gadgets and high-end lifestyle items for sales professionals.", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
];

const FESTIVE_HAMPERS = [
  { title: "Diwali Hampers", price: "Custom Quote", description: "Premium sweets, dry fruits, floating diyas, and silver coins for the festival of lights.", imageUrl: "https://images.pexels.com/photos/8819840/pexels-photo-8819840.jpeg" },
  { title: "Holi Hampers", price: "Custom Quote", description: "Vibrant colors, gourmet gujiya, and festive thandai mix in a branded box.", imageUrl: "https://images.pexels.com/photos/7176252/pexels-photo-7176252.jpeg" },
  { title: "Eid Kits", price: "Custom Quote", description: "Traditional dates, exotic nuts, and luxury prayer mats for Eid gifting.", imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=800&auto=format&fit=crop" },
  { title: "Women's Day Gifts", price: "Custom Quote", description: "Self-care items, designer accessories, and inspirational journals for her.", imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
  { title: "Christmas Kits", price: "Custom Quote", description: "Plum cake, artisanal chocolates, and festive ornaments for the holiday season.", imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop" },
  { title: "New Year Gifts", price: "Custom Quote", description: "Premium 2026 planner, desk calendar, and high-end tech accessories.", imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop" },
  { title: "Employee Welcome Hampers", price: "Custom Quote", description: "Branded office essentials and snacks to welcome new team members.", imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop" },
];

export default function CorporateKitsPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-x-hidden">
      
      {/* FIX 1: Wrap gradient safely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundGradient />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        <SectionHeading 
          title={<>Corporate <span className="text-red-600">Kits & Hampers</span></>}
          subtitle="Industry-specific curated kits and festive hampers tailored for employees, dealers, and professional partners." 
          centered 
          className="mb-16"
        />

        {/* Primary Kits */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Primary Kits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {PRIMARY_KITS.map((kit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <ProductCard {...kit} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Additional Kits */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Additional Kits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {ADDITIONAL_KITS.map((kit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <ProductCard {...kit} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Festive Hampers */}
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Festive Hampers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FESTIVE_HAMPERS.map((hamper, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
              className="w-full"
            >
              <ProductCard {...hamper} index={idx} />
            </motion.div>
          ))}
        </div>

      </div>

    </div>
  );
}