"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, PackageOpen, CheckCircle, Truck } from "lucide-react";

const STEPS = [
  {
    icon: <MessageSquareText className="w-8 h-8" />,
    title: "1. Submit Enquiry",
    desc: "Share your requirements, budget, and quantity with our gifting experts."
  },
  {
    icon: <PackageOpen className="w-8 h-8" />,
    title: "2. Get Samples",
    desc: "Receive curated product options and physical samples for your review."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "3. Approve Design",
    desc: "Finalize products and approve the digital mockup of your corporate branding."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "4. Delivery",
    desc: "We handle the procurement, packing, and seamless doorstep delivery."
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">How It Works</h2>
          <p className="text-lg text-[#1E3A5F]/70 max-w-2xl mx-auto">A seamless, linear process designed to make bulk corporate gifting effortless from start to finish.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 group">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative text-center flex flex-col items-center bg-[#F8FAFC] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full"
            >
              <div className="w-16 h-16 bg-white shadow-sm rounded-xl flex items-center justify-center text-[#C9A227] mb-6 transition-transform hover:scale-105 duration-300 group-hover:text-[#1E3A5F]">
                {step.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#1E3A5F] mb-3">{step.title}</h3>
              <p className="text-[#1E3A5F]/60 leading-relaxed text-sm flex-grow">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
