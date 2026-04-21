"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Package, Shield, Layers, PenTool } from "lucide-react";
import { Button } from "../ui/Button";

const PACKAGING_TYPES = [
  {
    title: "Mono Cartons",
    description: "Premium single-layer cartons for retail-ready product packaging with high-quality printing.",
    icon: <Layers className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Rigid Boxes",
    description: "Luxury handcrafted boxes for premium gifting, electronics, and high-end brand presentation.",
    icon: <Package className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Corrugated Boxes",
    description: "Heavy-duty shipping and storage solutions designed for durability and brand visibility.",
    icon: <Shield className="w-6 h-6" />,
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
  }
];

export function PackagingSolutions() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-3 block">In-House Manufacturing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Custom Packaging Solutions</h2>
            <p className="text-lg text-gray-600">We manufacture premium packaging that protects your products while elevating your brand identity.</p>
          </div>
          <Button variant="outline" className="hidden md:flex rounded-lg border-gray-200" asChild>
            <Link href="/packaging-solutions">View All Solutions</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGING_TYPES.map((type, idx) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <Image 
                  src={type.img} 
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-900 shadow-sm">
                  {type.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-red-600 mb-2 transition-colors">{type.title}</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                <Link 
                  href="/enquiry?source=packaging" 
                  className="inline-flex items-center text-xs font-bold text-red-600 hover:underline uppercase tracking-wider"
                >
                  Request Sample
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Button variant="outline" className="w-full rounded-lg border-gray-200" asChild>
            <Link href="/packaging-solutions">View All Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
