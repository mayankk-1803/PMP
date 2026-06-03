"use client";

import React from "react";
import { motion } from "framer-motion";

const METRICS = [
  { value: "500+", label: "Clients Partnered" },
  { value: "10,000+", label: "Hampers Delivered" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "Pan-India", label: "Delivery Network" },
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
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
              {LOGOS.map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Company Logo"
                  className="h-6 md:h-8 w-full object-contain opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
