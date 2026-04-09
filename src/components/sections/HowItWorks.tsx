"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Select Product",
    desc: "Browse our curated catalog and choose the perfect gifts for your target audience."
  },
  {
    num: "02",
    title: "Customize Branding",
    desc: "Share your logo and brand guidelines. We'll render professional mockups for approval."
  },
  {
    num: "03",
    title: "Place Bulk Order",
    desc: "Confirm your quantities and delivery locations. We handle the procurement and assembly."
  },
  {
    num: "04",
    title: "Delivery & Tracking",
    desc: "Relax as we manage the logistics and deliver pan-India on your specified dates."
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#0B1D26] mb-4">How It Works</h2>
          <p className="text-lg text-gray-500">A seamless process from selection to doorstep delivery.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100" />
          
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative text-center"
            >
              <div className="w-24 h-24 mx-auto bg-white border-2 border-[#0B1D26] rounded-full flex items-center justify-center text-3xl font-bold text-[#0B1D26] mb-6 relative z-10 shadow-[0_0_0_10px_white]">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-[#0B1D26] mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
