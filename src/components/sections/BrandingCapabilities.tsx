"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  Printer, 
  Scissors, 
  Layers, 
  CheckCircle2 
} from "lucide-react";

interface Capability {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  desc: string;
  materials: string[];
}

const CAPABILITIES: Capability[] = [
  {
    icon: <Cpu className="w-6 h-6 text-red-500" />,
    title: "Precision Laser Engraving",
    subtitle: "Tactile & Permanent CNC Etch",
    desc: "Computerized CNC fiber lasers vaporize surfaces with sub-millimeter precision. Delivers an ultra-sharp, permanent contrast mark ideal for premium executive metalware and teakwood organizers.",
    materials: ["Metal Pens & Bottles", "Wooden Tabletop Utilities", "Leather Accessories"]
  },
  {
    icon: <Layers className="w-6 h-6 text-amber-500" />,
    title: "Luxury Foil Stamping",
    subtitle: "Metallic Hot Foil Imprint",
    desc: "Applies metallic foils (pure gold, sterling silver, or rose gold) under high temperature and mechanical pressure. Creates a deeply debossed, reflective metallic sheen of your brand seal.",
    materials: ["PU Leather Diaries", "Luxury Gift Box Closures", "Welcome Cards"]
  },
  {
    icon: <Scissors className="w-6 h-6 text-emerald-500" />,
    title: "High-Density Embroidery",
    subtitle: "Premium Thread-Count Stitching",
    desc: "Multi-head embroidery systems recreate vector logos using high-tensile, color-matched silk threads. Provides a heavy, raised texture that stands up to heavy industrial laundry cycles.",
    materials: ["Polo T-Shirts & Caps", "Laptop Backpacks", "Custom Canvas Pouches"]
  },
  {
    icon: <Printer className="w-6 h-6 text-blue-500" />,
    title: "High-Definition UV Flatbed",
    subtitle: "Vibrant Polymerized UV Ink Curing",
    desc: "Flatbed printers deposit ink droplets cured instantly by intense ultraviolet light. Achieves high-definition, multi-color gradient reproductions with exceptional scratch and fade resistance.",
    materials: ["Acrylic Tableware", "Tech Accessories", "Custom Gift Sets"]
  },
  {
    icon: <Printer className="w-6 h-6 text-rose-500" />,
    title: "Precision Screen Printing",
    subtitle: "Rich Pigmented Mesh Curation",
    desc: "High-tension screen meshes deposit uniform pigment layers directly onto target items. Perfect for high-volume solid color runs requiring exact Pantone color matching.",
    materials: ["Canvas Tote Bags", "Premium Cardboard Cartons", "Rigid Gift Boxes"]
  },
  {
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
    title: "Rigid Box Handcrafting",
    subtitle: "V-Groove Structural Assembly",
    desc: "High-thickness greyboards are V-groove scored and wrapped in premium textured art paper by hand. Combines heavy industrial grade protection with luxury gift-shop aesthetics.",
    materials: ["Premium Hamper Boxes", "Employee Onboarding Kits", "Gift Sets"]
  }
];

export function BrandingCapabilities() {
  return (
    <section className="py-24 bg-[#070708] border-t border-white/5 relative overflow-hidden text-white">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold tracking-widest uppercase mb-4 inline-block text-amber-300">
            Craftsmanship & Technology
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">Branding Capabilities</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            We operate advanced customization equipment to reproduce corporate brand guidelines flawlessly across diverse material substrates.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -6, borderColor: "rgba(220, 38, 38, 0.3)" }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(220,38,38,0.04)] transition-all duration-300 relative group text-left"
            >
              <div>
                {/* Icon box */}
                <div className="mb-6 bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-350">
                  {cap.icon}
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">{cap.subtitle}</span>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                    {cap.desc}
                  </p>
                </div>
              </div>

              {/* Recommended Application Badges */}
              <div className="pt-5 border-t border-white/5 space-y-2 mt-auto">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 block">Recommended For:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.materials.map((mat) => (
                    <span 
                      key={mat}
                      className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] text-gray-300 font-bold border border-white/5 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-red-500 flex-shrink-0" />
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
