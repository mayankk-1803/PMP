"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { SITE_PACKAGING, PROCESS_STEPS } from "@/data/siteConfig";
import { ShieldCheck, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { SafeImage } from "@/components/ui/SafeImage";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";

export default function PackagingSolutionsPage() {
  return (
    <div className="pt-32 pb-0 bg-[#FAF9F6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full bg-[#F8F7F3] text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-[#F5C2C2]">
            In-House Manufacturing
          </span>
          <SectionHeading 
            title={<>Custom <span className="text-[#D32F2F]">Packaging Solutions</span></>}
            subtitle="Elevate your product presentation and corporate gifting unboxing experience with our state-of-the-art custom manufacturing process." 
            centered 
          />
        </div>

        {/* Dynamic Alternating Layouts for Packaging Types */}
        <div className="space-y-24 mb-28">
          {SITE_PACKAGING.map((pkg, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D32F2F]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 bg-white">
                    <SafeImage 
                      src={pkg.img} 
                      alt={pkg.title} 
                      category="packaging"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                  <span className="text-xs font-bold tracking-widest text-[#EF5350] uppercase mb-3 block">
                    {pkg.tagline}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {pkg.desc}
                  </p>

                  {/* Spec Bullet Points */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Available Materials
                      </h4>
                      <ul className="space-y-2">
                        {pkg.materials.map((mat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#D32F2F] mt-0.5 flex-shrink-0" />
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Premium Finishes
                      </h4>
                      <ul className="space-y-2">
                        {pkg.finishes.map((fin, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#D32F2F] mt-0.5 flex-shrink-0" />
                            <span>{fin}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mb-8 text-xs font-bold text-[#6B6B63] bg-[#F8F7F3] border border-[#F5C2C2] py-2 px-4 rounded-xl w-fit">
                    <Clock className="w-4 h-4 text-[#D32F2F]" />
                    <span>Average Lead Time: {pkg.leadTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="rounded-xl font-bold py-3.5 px-6"
                      asChild
                    >
                      <Link href={buildEnquiryUrl({ category: "packaging", subcategory: pkg.title })}>
                        Order Samples
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl font-bold border-gray-300 hover:bg-gray-50 py-3.5 px-6"
                      asChild
                    >
                      <Link href="/enquiry?source=packaging">
                        Get Custom Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Timeline Section */}
        <div className="py-20 border-t border-gray-200/70 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#EF5350] text-xs font-bold tracking-widest uppercase mb-3 block">
              Step-By-Step
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Our Packaging Manufacturing Process
            </h3>
            <p className="text-sm md:text-base text-gray-500">
              How we turn design concept dielines into premium ready-to-dispatch cargo boxes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-[#F5C2C2] shadow-sm relative group hover:border-[#D32F2F]/20 hover:shadow-md transition-all text-left"
              >
                <div className="absolute -top-5 right-6 text-5xl font-black text-[#F8F7F3] group-hover:text-[#D32F2F]/10 transition-colors select-none">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-[#2B2B2B] mb-3 group-hover:text-[#D32F2F] transition-colors">
                  {step.name}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-24 p-8 md:p-16 rounded-3xl bg-[#2B2B2B] text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D32F2F]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EF5350]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-[#EF5350] uppercase block mb-3">
                Bulk Branding and Fulfillment
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Need premium boxes with <span className="text-[#EF5350]">custom structural inserts</span>?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Send us your product dimensions. We'll produce custom EVA foam, paperboard dividers, or vacuum plastic trays, and drop-ship directly to your warehouse.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=packaging-structural">
                  Talk to Packaging Experts
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Embedded Budget segment for easy navigation */}
      <GiftsByBudget />
    </div>
  );
}
