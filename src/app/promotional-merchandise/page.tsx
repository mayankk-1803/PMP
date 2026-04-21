"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

const MERCH_CATEGORIES = [
  { title: "Premium Branding Pens", description: "Executive metal and plastic pens with laser engraving or screen printing.", imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop" },
  { title: "Corporate T-Shirts", description: "Polo and Round-neck cotton t-shirts with high-quality embroidery or printing.", imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
  { title: "Custom Keychains", description: "Metal, leather, and acrylic keychains tailored to your brand logo.", imageUrl: "https://images.unsplash.com/photo-1575880911432-843818617882?q=80&w=800&auto=format&fit=crop" },
  { title: "Diaries & Notebooks", description: "Premium leatherette and hardbound diaries for office utility.", imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
  { title: "Branded Caps", description: "Cotton and mesh caps with adjustable straps and front branding.", imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" },
  { title: "Executive Paper Weights", description: "Glass and metal paper weights with internal 3D laser engraving.", imageUrl: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop" },
  { title: "Mouse Pads & Table Mats", description: "Anti-slip mouse pads and premium table mats for workspace comfort.", imageUrl: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800&auto=format&fit=crop" },
  { title: "Table Top Items", description: "Clocks, pen stands, and desktop organizers for executive desks.", imageUrl: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=800&auto=format&fit=crop" },
  { title: "Backpacks & Bags", description: "Laptop bags, travel backpacks, and eco-friendly tote bags.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { title: "Custom Coasters", description: "Wooden, cork, and acrylic coasters for office and home use.", imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=800&auto=format&fit=crop" },
  { title: "Corporate Umbrellas", description: "Large golf umbrellas and compact 3-fold umbrellas with branding.", imageUrl: "https://images.unsplash.com/photo-1530268576203-5cbb0150f12a?q=80&w=800&auto=format&fit=crop" },
  { title: "Promotion Standees", description: "Roll-up standees and promotional banners for events and exhibitions.", imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop" },
  { title: "Premium Raincoats", description: "Durable and waterproof raincoats for outdoor field staff.", imageUrl: "https://images.unsplash.com/photo-1532431412517-e83694f4c954?q=80&w=800&auto=format&fit=crop" },
  { title: "Custom Tissue Boxes", description: "Branded wooden and plastic tissue holders for cars and offices.", imageUrl: "https://images.unsplash.com/photo-1612041761821-2a1e3428f526?q=80&w=800&auto=format&fit=crop" },
];

export default function PromoMerchPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading 
          title={<>Promotional <span className="text-red-600">Merchandise</span></>}
          subtitle="A comprehensive range of office utility and event giveaways with high-quality custom branding." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MERCH_CATEGORIES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
            >
              <ProductCard {...item} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
      <GiftsByBudget />
    </div>
  );
}
