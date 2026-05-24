"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Package, Settings, CheckCircle2, ArrowRight, Box, Layers, HelpCircle
} from "lucide-react";
import { Button } from "../ui/Button";
import { SITE_PACKAGING, PROCESS_STEPS } from "@/data/siteConfig";

export function PackagingSolutions() {
  const [activeTab, setActiveTab] = useState("mono");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const currentProduct = SITE_PACKAGING.find(p => p.id === activeTab) || SITE_PACKAGING[0];

  const togglingAccordion = (idx: number) => {
    if (openAccordion === idx) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(idx);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3 block flex items-center gap-1.5">
              <Box className="w-4 h-4 text-red-500" /> In-House Custom Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Premium <span className="text-red-600">Packaging Solutions</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              We design and manufacture structural boxes that guard your products and communicate luxury at first contact.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-xl border-gray-250 font-bold" asChild>
            <Link href="/packaging-solutions">Explore Packaging Services</Link>
          </Button>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Tab Selectors & Swageazy Specs Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              {SITE_PACKAGING.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveTab(prod.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    activeTab === prod.id
                      ? "bg-red-50/50 border-red-600/30 shadow-md shadow-red-600/5 text-gray-950"
                      : "bg-white border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="text-left">
                    <h3 className={`font-bold text-[16px] ${activeTab === prod.id ? "text-red-600" : "text-gray-900 group-hover:text-red-600 transition-colors"}`}>
                      {prod.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{prod.tagline}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-all ${
                    activeTab === prod.id ? "translate-x-1 text-red-600" : "text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5"
                  }`} />
                </button>
              ))}
            </div>

            {/* Accordion Specifications Panel */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50 p-2 space-y-2">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> Technical Standards
              </div>
              
              {[
                { title: "Box Dielines & Custom Cuts", content: "Our team drafts precise CAD dielines corresponding to your items. We dispatch flat physical proofs for shape approval before printing." },
                { title: "ECO Board Materials", content: "From recycled FSC kraft paper stocks to double-ply white test liners. Choose between E/B flutes or solid greyboards from 1.5mm to 3mm." },
                { title: "SLA Production Timelines", content: "Production ranges from 5 to 7 days for corrugated mailers, and up to 14 working days for complex handmade rigid gift chests." }
              ].map((item, idx) => (
                <div key={idx} className="border border-gray-150 rounded-xl bg-white overflow-hidden shadow-xs text-left">
                  <button
                    onClick={() => togglingAccordion(idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-gray-400">{openAccordion === idx ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {openAccordion === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-4 text-xs text-gray-500 leading-relaxed"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold h-12 flex items-center justify-center gap-2 border-0 shadow-lg shadow-red-600/15" asChild>
                <Link href={`/enquiry?source=packaging&type=${activeTab}`}>
                  Request Free Flat Mockup
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Isometric Interactive Showcase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-12 gap-8 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm"
              >
                {/* Isometric 3D image preview container */}
                <div className="md:col-span-5 relative aspect-square sm:aspect-[4/5] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm box-isometric-container flex items-center justify-center group/iso min-h-[300px]">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={currentProduct.img}
                      alt={currentProduct.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/iso:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Floating 3D mockup indicators */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] text-amber-300 font-extrabold uppercase tracking-widest block">Lead Time SLA</span>
                    <span className="text-xs text-white font-extrabold flex items-center gap-1.5 mt-0.5">
                      <Settings className="w-3.5 h-3.5 animate-spin" /> {currentProduct.leadTime}
                    </span>
                  </div>

                  {/* 3D Box Perspective hover card */}
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-red-500" /> Custom Board Stock
                  </div>
                </div>

                {/* Details list */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6 text-left">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">
                      {currentProduct.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      {currentProduct.desc}
                    </p>
                  </div>

                  {/* Material checklist */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-2.5">
                        Material & Board Stock
                      </h4>
                      <div className="grid gap-2">
                        {currentProduct.materials.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-2.5">
                        Premium Finish Options
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentProduct.finishes.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400">Custom Shapes & Sizes</span>
                    <Link
                      href={`/enquiry?product=${encodeURIComponent(currentProduct.title + " Packaging")}`}
                      className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-widest inline-flex items-center gap-1 hover:underline"
                    >
                      Configure Specs <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Manufacturing Process Timeline */}
        <div className="border-t border-gray-200 pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Step-by-Step Curation</span>
            <h3 className="text-2xl font-black text-gray-900 mt-2">
              Our Packaging Customization Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((proc, idx) => (
              <div 
                key={idx}
                className="p-6 bg-gray-50 border border-gray-150 rounded-2xl text-left relative group hover:border-red-600/30 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-black text-gray-250 group-hover:text-red-100 transition-colors mb-4">
                  {proc.step}
                </div>
                <h4 className="font-extrabold text-sm text-gray-900 mb-2">
                  {proc.name}
                </h4>
                <p className="text-xs leading-relaxed text-gray-500">
                  {proc.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
