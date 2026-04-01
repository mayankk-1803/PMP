"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";

const MERCH = [
  { title: "Premium Polo T-Shirt", description: "Cotton blend with left chest embroidery.", imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
  { title: "Quilted Corporate Jacket", description: "Winter-wear jacket with discreet branding.", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
  { title: "Insulated Coffee Mug", description: "Keeps drinks hot or cold for 12 hours.", imageUrl: "https://images.unsplash.com/photo-1514315384763-ba401779410f?q=80&w=800&auto=format&fit=crop" },
  // { title: "Executive Diary & Pen Set", description: "Faux leather bind with premium ballpoint pen.", imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
  // { title: "Tech Organizer Pouch", description: "Keep chargers and cables managed on the go.", imageUrl: "https://images.unsplash.com/photo-1628198904257-27b2b6226cb6?q=80&w=800&auto=format&fit=crop" },
  // { title: "Event Giveaways Set", description: "Lanyard, ID holder, tote bag, and keychain.", imageUrl: "https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=800&auto=format&fit=crop" },
];

export default function PromoMerchPage() {
  return (
    <div className="pt-24 pb-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Promotional Merchandise" 
          subtitle="Apparel, office utility, and event giveaways with high-quality custom branding for your brand visibility." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MERCH.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
