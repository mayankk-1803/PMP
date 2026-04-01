"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageOpen, Target, Box, Printer } from "lucide-react";

const PACKAGING_TYPES = [
  { title: "Rigid Boxes", icon: <Box className="w-8 h-8"/>, desc: "Premium, stiff luxury boxes for executive gifts.", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" },
  { title: "Corrugated Packaging", icon: <PackageOpen className="w-8 h-8"/>, desc: "Sturdy boxes designed to withstand e-commerce shipping across India.", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { title: "Mono Cartons", icon: <Target className="w-8 h-8"/>, desc: "Lightweight and fully printable for individual retail product packing.", img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop" },
  { title: "Custom Printing & Inserts", icon: <Printer className="w-8 h-8"/>, desc: "UV coating, foil stamping, and customized EVA foam inserts.", img: "https://images.pexels.com/photos/8715537/pexels-photo-8715537.jpeg" },
];

export default function PackagingSolutionsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Custom Packaging" 
          subtitle="The first impression matters. Elevate your unboxing experience with our premium packaging solutions." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {PACKAGING_TYPES.map((pkg, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl bg-[#1A1A1A] border border-gray-800">
              <div className="h-48 md:h-64 w-full bg-gray-900 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-8 relative z-10 -mt-10 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A] to-transparent">
                <div className="bg-primary/20 text-primary p-3 rounded-lg inline-block mb-4">
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-400">{pkg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
