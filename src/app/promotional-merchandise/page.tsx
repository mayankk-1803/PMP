"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";

const MERCH = [
  { title: "Premium Polo T-Shirt", description: "Cotton blend with left chest embroidery.", imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
  { title: "Quilted Corporate Jacket", description: "Winter-wear jacket with discreet branding.", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
  { title: "Insulated Coffee Mug", description: "Keeps drinks hot or cold for 12 hours.", imageUrl: "https://images.unsplash.com/photo-1514315384763-ba401779410f?q=80&w=800&auto=format&fit=crop" },
];

export default function PromoMerchPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Promotional Merchandise" 
          subtitle="Apparel, office utility, and event giveaways with high-quality custom branding for your brand visibility." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MERCH.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ProductCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
