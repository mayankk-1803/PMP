"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, PackageOpen, CheckCircle, Truck } from "lucide-react";
import { staggerContainerSlow, cardReveal, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const prefersReduced = useReducedMotion();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: EASE_SMOOTH }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-4">How It Works</h2>
          <p className="text-lg text-[#6B6B63] max-w-2xl mx-auto">A seamless, linear process designed to make bulk corporate gifting effortless from start to finish.</p>
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid md:grid-cols-4 gap-6"
        >
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              variants={prefersReduced ? undefined : cardReveal}
              whileHover={prefersReduced ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              className="relative text-center flex flex-col items-center bg-[#F8F5EF] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#DDD5C8] h-full group/card hover:border-[#6E7757]/30"
            >
              <motion.div
                className="w-16 h-16 bg-white shadow-sm rounded-xl flex items-center justify-center text-[#6E7757] mb-6 transition-transform border border-[#DDD5C8]"
                whileHover={prefersReduced ? undefined : { y: -4, scale: 1.08 }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-[#6E7757] mb-3">{step.title}</h3>
              <p className="text-[#6B6B63] leading-relaxed text-sm flex-grow">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
