"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] pb-16 pt-24 md:pt-32 w-full flex items-center justify-center overflow-hidden perspective-1000">
      {/* Premium Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9FAFB] via-white to-[#F1F5F9] -z-10" />
      
      {/* Decorative Grid Line Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3A5F 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 w-full">
        
        {/* TEXT CONTENT */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2.5 rounded-full bg-white shadow-sm border border-[#1E3A5F]/10 text-[#1E3A5F] text-xs sm:text-sm font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] inline-block mr-2 animate-pulse" />
              THE PREMIUM B2B GIFTING PARTNER
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-[#1E3A5F] leading-[1.1] max-w-3xl mx-auto lg:mx-0"
          >
            End-to-End <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] to-[#5174A5]">
              Corporate Gifting
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-[#1E3A5F]/70 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            From onboarding kits to premium hampers — we handle everything.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center lg:justify-start gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto min-h-[50px] text-lg font-semibold px-8 shadow-xl shadow-[#1E3A5F]/10 hover:shadow-2xl hover:shadow-[#1E3A5F]/20 transition-all group active:scale-95" asChild>
              <Link href="/enquiry">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[50px] text-base font-semibold px-8 bg-white/50 backdrop-blur-sm border-[#1E3A5F]/10 hover:bg-[#1E3A5F]/5 active:scale-95 transition-all" asChild>
              <Link href="/corporate-kits">
                Explore Solutions
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* LOTTIE VISUAL */}
        <div className="flex-1 w-full flex justify-center items-center relative z-10 w-full lg:max-w-lg mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex items-center justify-center w-full aspect-square max-w-[400px] lg:max-w-[500px]"
          >
            {/* Premium Glow effect matched properly behind the Lottie visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[#C9A227]/15 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-[#1E3A5F]/10 blur-2xl rounded-[100%] pointer-events-none" />
            
            <iframe
              src="https://lottie.host/embed/19e28dc3-4503-4f3d-b7fb-edf4bcb08490/m1MRTQ2eXA.lottie"
              className="w-full h-full relative z-10 pointer-events-none"
              frameBorder="0"
              title="Premium Gift Lottie Animation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

