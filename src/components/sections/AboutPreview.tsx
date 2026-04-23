"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ShieldCheck, Truck, Award } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-red-600 text-xs font-bold tracking-widest uppercase mb-3 block">About PacMyProducts</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Strategic Partner for <br />
              <span className="text-red-600">Corporate Gifting & Packaging</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We specialize in providing end-to-end solutions for corporate gifting and custom packaging. From premium product curation to in-house manufacturing, we ensure your brand leaves a lasting impression.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Award className="w-8 h-8 text-red-600 mb-3" />
                <span className="text-xs font-bold text-gray-900 uppercase">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <ShieldCheck className="w-8 h-8 text-red-600 mb-3" />
                <span className="text-xs font-bold text-gray-900 uppercase">Trusted Partner</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Truck className="w-8 h-8 text-red-600 mb-3" />
                <span className="text-xs font-bold text-gray-900 uppercase">Pan-India Delivery</span>
              </div>
            </div>

            <Button size="lg" className="rounded-lg px-10" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" 
                alt="Corporate Gifting Expertise" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold mb-1">15+</div>
              <div className="text-xs font-bold uppercase tracking-wider">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
