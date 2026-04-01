"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const IMAGES = [
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610486663553-6a56fddcb8b2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555616642-e0ba23fb5f56?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Past Projects" 
          subtitle="Take a look at some of the premium bespoke kits and packaging we've crafted." 
          centered 
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((src, i) => (
            <div key={i} className={`relative overflow-hidden group rounded-xl ${i === 0 || i === 4 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
              <img 
                src={src} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={`Gallery image ${i+1}`}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase border border-white px-6 py-2 backdrop-blur-sm">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
