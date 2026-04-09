"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Briefcase, CreditCard, Box, ThumbsUp } from "lucide-react";

const KITS = [
  { title: "Employee Onboarding Kit", price: "Starts ₹1200", description: "Diary, Pen, Sipper, Welcome Card, Rigid Box.", imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop" },
  { title: "Work From Home Kit", price: "Starts ₹2000", description: "Laptop stand, wireless mouse, coffee mug, journal.", imageUrl: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop" },
  { title: "Dealer & Distributor Kit", price: "Starts ₹3500", description: "Premium backpack, power bank, VIP wallet, custom note.", imageUrl: "https://images.pexels.com/photos/6590930/pexels-photo-6590930.jpeg" },
];

const FEATURES = [
  { icon: <Briefcase className="w-8 h-8" />, title: "New Hires", desc: "Make a lasting first impression." },
  { icon: <ThumbsUp className="w-8 h-8" />, title: "Rewards", desc: "Recognize and retain top talent." },
  { icon: <Box className="w-8 h-8" />, title: "Custom Branding", desc: "Your logo on everything." },
  { icon: <CreditCard className="w-8 h-8" />, title: "Bulk Pricing", desc: "Cost-effective for large teams." }
];

export default function CorporateKitsPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          title="Corporate Kits" 
          subtitle="Curated, branded, and ready-to-dispatch kits for every occasion. Bulk ordering available, delivering in Delhi NCR." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="bg-[#F1F5F9] w-16 h-16 rounded-xl flex items-center justify-center text-[#1E3A5F] mb-6 group-hover:bg-[#1E3A5F] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-bold text-[#1E3A5F] text-xl mb-2">{feature.title}</h3>
              <p className="text-[#1E3A5F]/70 font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KITS.map((kit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ProductCard {...kit} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
