"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Award, Truck, ShieldCheck, Users } from "lucide-react";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const STATS = [
  { metric: "15+ Years", label: "Experience", icon: <Award className="w-8 h-8"/> },
  { metric: "Delhi NCR", label: "Fulfillment", icon: <Truck className="w-8 h-8"/> },
  { metric: "Premium", label: "Brand Partnerships", icon: <ShieldCheck className="w-8 h-8"/> },
  { metric: "100k+", label: "Smiles Delivered", icon: <Users className="w-8 h-8"/> },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 relative overflow-hidden bg-[#F9FAFB]">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading 
          title="About PacMyProduct" 
          subtitle="We are India's premier B2B partner for corporate gifting and packaging solutions." 
          centered 
          className="mb-20"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl lg:text-4xl font-extrabold text-[#1E3A5F] leading-tight">
              Delivering expressions of appreciation across the nation.
            </h3>
            <p className="text-[#1E3A5F]/70 text-lg leading-relaxed font-medium">
              Founded on the principle that every gift should tell a story, PacMyProduct manages the entire lifecycle of corporate gifting. From curating high-quality products from premium brands to manufacturing custom packaging that wows your recipients, we handle it all.
            </p>
            <p className="text-[#1E3A5F]/70 text-lg leading-relaxed font-medium">
              Whether you need 50 executive kits for your leadership team or 50,000 festive hampers distributed directly to employee homes across India, our state-of-the-art logistics and fulfillment ensure your corporate gifting is completely stress-free.
            </p>
            <div className="pt-6">
              <Button variant="default" size="lg" className="px-10 py-6 rounded-full shadow-lg" asChild>
                <Link href="/enquiry">Partner With Us</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1E3A5F]/10 border border-white"
          >
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" alt="Team Packing Gifts" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="text-[#C9A227] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
              <div className="text-4xl font-extrabold text-[#1E3A5F] mb-3">{stat.metric}</div>
              <div className="text-[#1E3A5F]/60 tracking-wider text-sm font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
