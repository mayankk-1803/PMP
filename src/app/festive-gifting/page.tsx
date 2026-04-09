"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const FESTIVE_HAMPERS = [
  { title: "Grand Diwali Celebration Box", price: "₹2500", description: "Premium sweets, dry fruits, floating diyas, silver coin.", imageUrl: "https://images.pexels.com/photos/8819840/pexels-photo-8819840.jpeg" },
  { title: "Holi Colors & Sweets Pack", price: "₹900", description: "Organic colors, gujiya box, water balloon kit.", imageUrl: "https://images.pexels.com/photos/7176252/pexels-photo-7176252.jpeg" },
  { title: "New Year Desk Planner Kit", price: "₹1200", description: "Premium leather planner, desk calendar, branded pen.", imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop" },
];

const TAGS = ["Diwali", "New Year", "Christmas", "Holi", "Anniversary"];

export default function FestiveGiftingPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeading 
            title="Festive Gifting" 
            subtitle="Celebrate the season of joy with our premium ready-to-ship and customizable festive hampers for your employees and clients." 
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
                className="px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-[#1E3A5F] shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FESTIVE_HAMPERS.map((hamper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ProductCard {...hamper} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
