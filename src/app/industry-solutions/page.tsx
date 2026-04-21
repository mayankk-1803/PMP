"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Activity, HardHat, Store } from "lucide-react";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";

export default function IndustrySolutionsPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading 
          title="Industry-Specific Solutions" 
          subtitle="Specialized gifting options designed for the specific needs of your sector." 
          centered 
          className="mb-16"
        />

        <div className="space-y-16">
          {/* Pharma */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-stretch bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all"
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pharma Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-3xl font-extrabold text-red-600 mb-4">Pharma & Healthcare</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-6">Doctor engagement kits, MR (Medical Representative) starter packs, and clinic wellness hampers focusing on utility and premium feel.</p>
            </div>
          </motion.div>

          {/* Real Estate & Engineering */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row-reverse gap-8 items-stretch bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all"
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1503387762-592dea58ef4e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Engineering Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <HardHat className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-3xl font-extrabold text-red-600 mb-4">Real Estate & Engineering</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-6">Contractor loyalty programs, heavy-duty utility kits, and premium channel partner welcome gifts built to last on-site.</p>
            </div>
          </motion.div>

          {/* Retail */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-stretch bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all"
          >
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Retail Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Store className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-3xl font-extrabold text-red-600 mb-4">Retail Brand Activation</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-6">Point-of-sale promotional items, distributor incentive boxes, and staff uniforms or festival kits.</p>
            </div>
          </motion.div>
        </div>
      </div>
      <GiftsByBudget />
    </div>
  );
}
