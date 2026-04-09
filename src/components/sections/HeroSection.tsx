"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9FAFB] via-[#F1F5F9] to-[#E8D8C4]/20 pt-20">
      {/* Decorative Grid Line Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3A5F 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] inline-block mr-2 animate-pulse" />
              THE PREMIUM B2B GIFTING PARTNER
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-[#1E3A5F] leading-[1.1]"
          >
            End-to-End <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5174A5]">
              Corporate Gifting Solutions
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#1E3A5F]/70 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Premium curated gifting, branded merchandise, and bespoke packaging crafted specifically for highly-valued employees and clients.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <Link href="/enquiry" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base font-bold shadow-xl group">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/corporate-kits" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-base font-bold bg-white/50 backdrop-blur-sm">
                Explore Solutions
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 w-full max-w-lg lg:max-w-none pb-12 lg:pb-0"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1E3A5F]/10 border border-white p-2 bg-white/50 backdrop-blur-xl">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop" alt="Premium Corporate Box" className="rounded-2xl object-cover w-full h-[400px] lg:h-[500px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
