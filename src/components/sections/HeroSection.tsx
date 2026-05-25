"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, ChevronRight, Award, Zap } from "lucide-react";
import { Button } from "../ui/Button";

const FADE_UP = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-[140px] sm:pt-32 lg:pt-36 pb-16 flex items-center overflow-hidden luxury-gradient text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-amber-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-md"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 flex items-center gap-1.5">
                Premium Corporate Gifting & Packaging Studio <Zap className="w-3 h-3 text-red-500 fill-red-500" />
              </span>
            </motion.div>
 
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight text-white leading-[1.05]"
              >
                Curated Branded Merchandise &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                  Luxury Packaging
                </span>{" "}
                Studio
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-medium"
              >
                Bespoke employee welcome kits, curated partner brand merchandise, and premium custom packaging boxes. Shipped nationwide with seamless enterprise project execution.
              </motion.p>
            </div>
 
            {/* Quick Category Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap gap-2.5"
            >
              {["Pan-India Enterprise Delivery", "Curated Premium Partner Brands", "Custom Brand Studio & Packaging"].map((tag) => (
                <span 
                  key={tag}
                  className="text-[11px] font-bold px-3.5 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-200 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button
                variant="default"
                className="h-13 px-8 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white flex items-center justify-center gap-2 group shadow-lg shadow-red-600/35 hover:scale-[1.02] transition-all border-0"
                asChild
              >
                <Link href="/products">
                  Explore Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-13 px-8 rounded-xl font-bold border-white/10 hover:border-white/20 text-white bg-white/5 hover:bg-white/10 flex items-center justify-center gap-1.5 transition-all"
                asChild
              >
                <Link href="/enquiry">
                  Get Custom Quote <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg"
            >
              <div>
                <div className="text-2xl sm:text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">15+</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Years of Legacy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">100k+</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Gifts Delivered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">500+</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Corporate Clients</div>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Mockups Column */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[550px] flex items-center justify-center">
            
            {/* Spinning decorative vector borders */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-red-500/10 pointer-events-none animate-[spin_50s_linear_infinite]" />
            <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-white/5 pointer-events-none animate-[spin_100s_linear_infinite]" />

            {/* Main Isometric Floating Card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-3xl overflow-hidden glass-card-premium border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center p-4"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
                <Image
                  src="/hero-gift.png"
                  alt="Luxury Corporate Gifting Pack"
                  fill
                  priority
                  className="object-cover p-2.5 rounded-2xl"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] font-extrabold text-amber-300 uppercase tracking-widest block mb-1">Featured Package</span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">Executive Welcome Onboarding Kit</h3>
                </div>
              </div>
            </motion.div>

            {/* Float Card 1: Customization badge */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -top-2 right-2 sm:right-6 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Full Branding</div>
                <div className="text-[9px] text-gray-300 mt-0.5">Foil Print & Laser Engraving</div>
              </div>
            </motion.div>

            {/* Float Card 2: Premium Packaging */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -4, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute -bottom-4 left-2 sm:left-6 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Luxury Boxes</div>
                <div className="text-[9px] text-gray-300 mt-0.5">Rigid Board & Custom Cartons</div>
              </div>
            </motion.div>

            {/* Float Card 3: Nationwide Delivery */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-2 sm:-right-6 bg-black/60 backdrop-blur-2xl border border-red-500/30 p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3.5 max-w-[200px]"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20 text-white flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-extrabold text-red-400 uppercase tracking-wide">Pan-India Dispatch</div>
                <div className="text-[9px] text-gray-300 mt-0.5 leading-tight font-semibold">Insured door-to-desk bulk shipping to your offices nationwide.</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
