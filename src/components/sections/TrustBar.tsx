"use client";

import React, { useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { staggerContainer, staggerItem, EASE_SMOOTH } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Viewport-triggered count-up ─────────────────────────────────────────────
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  // Extract numeric part for counting; keep suffix
  const numericMatch = value.match(/^[\d,]+/);
  const suffix = numericMatch ? value.slice(numericMatch[0].length) : "";
  const end = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ""), 10) : 0;
  const isNumeric = numericMatch !== null;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    if (prefersReduced) { setCount(end); return; }
    const controls = animate(0, end, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate(v) { setCount(Math.floor(v)); },
    });
    return controls.stop;
  }, [inView, end, isNumeric, prefersReduced]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="flex flex-col items-center justify-center text-center space-y-2"
    >
      <h3 className="text-4xl md:text-5xl font-extrabold text-[#D32F2F]">
        {isNumeric ? `${count.toLocaleString()}${suffix}` : value}
      </h3>
      <p className="text-sm md:text-base text-[#6B6B63] font-semibold uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

const METRICS = [
  { value: "500+", label: "Clients Partnered" },
  { value: "10,000+", label: "Kits Produced" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "Premium", label: "Brand Network" },
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
  const prefersReduced = useReducedMotion();
  return (
    <section className="bg-white py-16 md:py-20 border-b border-[#F5C2C2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={prefersReduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20"
        >
          {METRICS.map((metric, idx) => (
            <AnimatedStat key={idx} value={metric.value} label={metric.label} />
          ))}
        </motion.div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          className="text-center w-full relative"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6B6B63] mb-8">Trusted by industry leaders</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {LOGOS.map((logo, i) => (
              <motion.img
                key={i}
                src={logo}
                alt="Company Logo"
                initial={prefersReduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                whileHover={{ opacity: 1, filter: "grayscale(0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="h-6 md:h-8 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
