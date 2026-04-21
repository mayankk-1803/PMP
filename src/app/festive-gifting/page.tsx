"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

const FESTIVE_HAMPERS = [
  { title: "Grand Diwali Celebration Hamper", price: "Custom Quote", description: "Premium sweets, dry fruits, floating diyas, and silver coins for the festival of lights.", imageUrl: "https://images.pexels.com/photos/8819840/pexels-photo-8819840.jpeg" },
  { title: "Vibrant Holi Colors & Sweets", price: "Custom Quote", description: "Organic gulal, gourmet gujiya, and festive thandai mix in a branded box.", imageUrl: "https://images.pexels.com/photos/7176252/pexels-photo-7176252.jpeg" },
  { title: "Eid Mubarak Premium Kit", price: "Custom Quote", description: "Traditional dates, exotic nuts, and luxury prayer mats for Eid gifting.", imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=800&auto=format&fit=crop" },
  { title: "Women's Day Special Curation", price: "Custom Quote", description: "Self-care items, designer accessories, and inspirational journals for her.", imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
  { title: "Classic Christmas Joy Box", price: "Custom Quote", description: "Plum cake, artisanal chocolates, and festive ornaments for the holiday season.", imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop" },
  { title: "New Year Executive Planner Kit", price: "Custom Quote", description: "Premium 2025 planner, desk calendar, and high-end tech accessories.", imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop" },
  { title: "Employee Welcome Hamper", price: "Custom Quote", description: "Branded office essentials and snacks to welcome new team members.", imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop" },
];

const TAGS = ["Diwali", "Holi", "Eid", "Women's Day", "Christmas", "New Year", "Welcome Kits"];

export default function FestiveGiftingPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionHeading 
            title={<>Occasion <span className="text-red-600">Hampers</span></>}
            subtitle="Premium ready-to-ship and customizable hampers for festivals, milestones, and corporate celebrations." 
            centered 
            className="mb-8"
          />
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {TAGS.map((tag, i) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FESTIVE_HAMPERS.map((hamper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
            >
              <ProductCard {...hamper} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
      <GiftsByBudget />
    </div>
  );
}
