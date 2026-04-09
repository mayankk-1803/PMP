"use client";

import React from "react";
import { motion } from "framer-motion";
import { PackageOpen, Printer, Grid3X3, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

const FEATURES = [
  { icon: <PackageOpen className="w-6 h-6"/>, title: "Premium Rigid Boxes" },
  { icon: <Grid3X3 className="w-6 h-6"/>, title: "Corrugated Packaging" },
  { icon: <Printer className="w-6 h-6"/>, title: "Custom Screen & UV Printing" },
];

export function PackagingSolutions() {
  return (
    <section className="py-24 bg-[#F1F5F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://www.fedex.com/content/dam/fedex/us-united-states/FedEx-Office/images/2020/Q4/woman-packing-shipment-with-note.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="bg-[#C9A227] text-[#1E3A5F] w-fit px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-xl">
                Our Differentiator
              </div>
              <h3 className="text-3xl font-bold">Unboxing Experiences that Matter.</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-6">Bespoke Packaging Solutions</h2>
            <p className="text-lg text-[#1E3A5F]/70 mb-10 leading-relaxed font-medium">
              We don't just supply products; we manufacture the packaging. From luxury rigid boxes to sturdy corrugated shippers with premium branding, we own the entire supply chain to guarantee perfection.
            </p>
            
            <div className="space-y-6 mb-10">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-[#1E3A5F]/5 p-3 rounded-lg text-[#1E3A5F]">
                    {feature.icon}
                  </div>
                  <span className="font-bold text-[#1E3A5F] text-lg">{feature.title}</span>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg">Explore Packaging Solutions</Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
