"use client";

import React from "react";
import { motion } from "framer-motion";

const METRICS = [
  { value: "500+", label: "Clients Partnered" },
  { value: "10,000+", label: "Hampers Delivered" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "Delhi NCR", label: "Delivery Network" },
];

const LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5b/DeloitteLogo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/Apple_logo_black.svg"
];

export function TrustBar() {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {METRICS.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold text-red-600">{metric.value}</h3>
              <p className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wider">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center w-full relative">
          <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-8">Trusted by industry leaders</p>
          
          <div className="relative overflow-hidden w-full max-w-[100vw]">
            <div className="flex gap-16 md:gap-24 animate-marquee w-max items-center hover:[animation-play-state:paused] group">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Company Logo"
                  className="h-6 md:h-8 object-contain opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-auto"
                />
              ))}
            </div>
            {/* Gradient Edge Fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
