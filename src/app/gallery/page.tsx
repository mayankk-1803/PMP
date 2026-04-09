"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const IMAGES = [
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Past Projects" 
          subtitle="Take a look at some of the premium bespoke kits and packaging we've crafted." 
          centered 
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {IMAGES.map((src, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative overflow-hidden group rounded-2xl shadow-sm border border-gray-100 ${i === 0 || i === 4 ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-square"}`}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={`Gallery image ${i+1}`}
              />
              <div className="absolute inset-0 bg-[#1E3A5F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase border border-white px-8 py-3 backdrop-blur-sm rounded-xl">View Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
