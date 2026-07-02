"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PackagingSolutionsPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-[#FAF9F6] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1300px] overflow-hidden rounded-none sm:rounded-3xl shadow-lg sm:shadow-2xl border-0 sm:border border-gray-200/60 bg-white"
        >
          <img
            src="/packagepic.jpeg"
            alt="Packaging Artwork"
            className="w-full h-auto object-contain block"
          />
        </motion.div>
      </div>
    </div>
  );
}
