"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="relative pt-10 pb-20 bg-[#f8f6f4] overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-[#f8f6f4]" />

      {/* Soft Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gray-100 blur-[120px] rounded-full top-1/2 right-[-100px] -translate-y-1/2 opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-8"
        >
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            THE PREMIUM B2B GIFTING PARTNER
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
        >
          Corporate Gifting & <span className="text-red-600">Packaging</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Elevate your brand with premium custom gifts, onboarding kits, and
          high-quality packaging designed for lasting impact.
        </motion.p>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
            Corporate Kits
          </span>
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
            Festive Hampers
          </span>
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
            Promotional Gifts
          </span>
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
            Packaging Solutions
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            variant="default"
            className="px-8 py-4 rounded-lg font-semibold"
            asChild
          >
            <Link href="/products">Explore Products →</Link>
          </Button>

          <Button
            variant="outline"
            className="px-8 py-4 rounded-lg font-semibold"
            asChild
          >
            <Link href="/enquiry">Get Quote →</Link>
          </Button>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-sm text-gray-500"
        >
          Trusted by 100+ companies across India
        </motion.p>

      </div>
    </section>
  );
}
