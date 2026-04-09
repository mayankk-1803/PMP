"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-12 md:py-20 perspective-1000">
      {/* Premium Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9FAFB] via-white to-[#F1F5F9] -z-10" />
      
      {/* Decorative Grid Line Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3A5F 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 md:gap-16 w-full">
        
        <div className="flex-1 text-center lg:text-left w-full flex flex-col items-center lg:items-start lg:block order-2 lg:order-1 pt-4 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white border border-[#1E3A5F]/10 text-[#1E3A5F] text-xs md:text-sm font-semibold tracking-wider mb-6 md:mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] inline-block mr-2 animate-pulse" />
              THE PREMIUM B2B GIFTING PARTNER
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-4 lg:order-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 text-[#1E3A5F] leading-[1.1]"
          >
            End-to-End <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5174A5]">
              Corporate Gifting
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="order-5 lg:order-none text-base md:text-xl text-[#1E3A5F]/70 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Premium curated gifting and bespoke packaging crafted specifically for highly-valued employees and clients.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-none flex flex-col w-full sm:w-auto sm:flex-row justify-center lg:justify-start gap-4 mb-8 lg:mb-0"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg py-4 md:py-2 shadow-lg group" asChild>
              <Link href="/enquiry">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hidden sm:flex w-full sm:w-auto text-base font-bold bg-white/50 backdrop-blur-sm" asChild>
              <Link href="/corporate-kits">
                Explore Solutions
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative flex-1 w-full flex justify-center items-center py-6 order-1 lg:order-2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* Premium Glow effect matched properly behind the Lottie visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#C9A227]/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-[100%] pointer-events-none" />
            
            <iframe
              src="https://lottie.host/embed/19e28dc3-4503-4f3d-b7fb-edf4bcb08490/m1MRTQ2eXA.lottie"
              className="w-[220px] h-[220px] md:w-[350px] md:h-[350px] relative z-10"
              frameBorder="0"
              title="Premium Gift Lottie Animation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
