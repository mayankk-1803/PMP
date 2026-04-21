"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

const KITS = [
  { title: "Employee Joining Kit", price: "Custom Quote", description: "Essential onboarding kit with diary, pen, sipper, and welcome card.", imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop" },
  { title: "Dealer Premium Kit", price: "Custom Quote", description: "High-value kits designed for your business partners and dealers.", imageUrl: "https://images.pexels.com/photos/6590930/pexels-photo-6590930.jpeg" },
  { title: "Distributor Network Kit", price: "Custom Quote", description: "Durable and functional kits for distribution channel partners.", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" },
  { title: "Doctor Professional Kit", price: "Custom Quote", description: "Specially curated medical-themed stationery and utility items.", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop" },
  { title: "Architect Creative Kit", price: "Custom Quote", description: "Premium design tools and high-quality notebooks for architects.", imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop" },
  { title: "Plumber Utility Kit", price: "Custom Quote", description: "Branded toolbags and functional accessories for plumbing professionals.", imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca1f965?q=80&w=800&auto=format&fit=crop" },
  { title: "Mason Industry Kit", price: "Custom Quote", description: "Rugged and durable utility kits for masonry and construction staff.", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { title: "Electrician Service Kit", price: "Custom Quote", description: "Safety-focused kits with branded utility tools for electricians.", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop" },
  { title: "Pharma Representative Kit", price: "Custom Quote", description: "Professional bags and daily reporting tools for pharma field teams.", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
  { title: "Retail Partner Kit", price: "Custom Quote", description: "In-store branding items and utility kits for retail outlet owners.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" },
  { title: "Sales Team Performance Kit", price: "Custom Quote", description: "Motivation kits with tech gadgets and high-end lifestyle items.", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
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
          title={<>Corporate <span className="text-red-600">Kits</span></>}
          subtitle="Industry-specific curated kits tailored for employees, dealers, and professional partners." 
          centered 
          className="mb-16"
        />

        {/* FIX 2: Prevent grid overflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {KITS.map((kit, idx) => (
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

      </div>

      {/* FIX 3: Wrap GiftsByBudget safely */}
      <div className="overflow-x-hidden">
        <GiftsByBudget />
      </div>

    </div>
  );
}