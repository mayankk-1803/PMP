"use client";

import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Layers, Package, Shield } from "lucide-react";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

const PACKAGING_TYPES = [
  { 
    title: "Mono Cartons", 
    icon: <Layers className="w-8 h-8"/>, 
    desc: "High-quality single-layer cartons for individual retail product packaging. Fully customizable with offset printing and premium finishes.", 
    img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    title: "Rigid Boxes", 
    icon: <Package className="w-8 h-8"/>, 
    desc: "Luxury handcrafted boxes for premium corporate gifting, electronics, and high-end brand presentation. Available with custom inserts.", 
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    title: "Corrugated Cartons", 
    icon: <Shield className="w-8 h-8"/>, 
    desc: "Heavy-duty 3-ply, 5-ply, and 7-ply shipping boxes designed for maximum durability and protection during transit.", 
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" 
  },
];

export default function PackagingSolutionsPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <SectionHeading 
            title={<>Packaging <span className="text-red-600">Solutions</span></>}
            subtitle="Premium in-house manufacturing of custom packaging boxes designed to elevate your brand's unboxing experience." 
            centered 
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGING_TYPES.map((pkg, idx) => (
            <div key={idx} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video w-full bg-gray-50 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-gray-900 mb-6">
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-600 transition-colors">{pkg.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">{pkg.desc}</p>
                <Button variant="outline" className="w-fit font-bold" asChild>
                  <Link href="/enquiry?source=packaging">Request Sample</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GiftsByBudget />
    </div>
  );
}
