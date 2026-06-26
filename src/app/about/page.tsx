"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Award, ClipboardCheck, ShieldCheck, Users, Gift, Box } from "lucide-react";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const STATS = [
  { metric: "15+ Years", label: "Experience", icon: <Award className="w-8 h-8"/> },
  { metric: "Curated", label: "Gifting Programs", icon: <Gift className="w-8 h-8"/> },
  { metric: "Premium", label: "Brand Partnerships", icon: <ShieldCheck className="w-8 h-8"/> },
  { metric: "100k+", label: "Projects Served", icon: <Users className="w-8 h-8"/> },
];

const EXPERTISE = [
  {
    title: "Corporate Gifting Curation",
    desc: "Strategic selection of premium gifts that align with your brand values and resonate with your audience.",
    icon: <Gift className="w-8 h-8 text-[#6E7757]" />
  },
  {
    title: "In-House Packaging Design",
    desc: "In-house design and manufacturing of custom boxes, from rigid premium presentation box cases to heavy-duty shipping cartons.",
    icon: <Box className="w-8 h-8 text-[#6E7757]" />
  },
  {
    title: "Quality-Controlled Execution",
    desc: "Structured sampling, artwork checks, vendor coordination, and production tracking keep every gifting program consistent.",
    icon: <ClipboardCheck className="w-8 h-8 text-[#6E7757]" />
  }
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F8F5EF] overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="mb-16">
          <SectionHeading 
            title="About PacMyProduct" 
            subtitle="We are India's premier B2B partner for corporate gifting and custom packaging solutions." 
            centered 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h3 className="text-2xl md:text-3xl font-black text-[#6E7757] leading-tight mb-6">
              Strategic B2B Partner for Corporate Gifting & Packaging
            </h3>
            <p className="text-[#6B6B63] text-sm sm:text-base leading-relaxed mb-6 font-medium">
              PacMyProduct is India's leading B2B platform specializing in end-to-end corporate gifting expertise and advanced packaging solutions capability. We help brands strengthen their professional relationships through thoughtfully curated gifts and premium presentation.
            </p>
            <p className="text-[#6B6B63] text-sm sm:text-base leading-relaxed mb-8 font-medium">
              From conceptualizing employee welcome kits to manufacturing high-volume corrugated cartons for enterprise programs, our integrated approach keeps quality, consistency, and presentation aligned from brief to final handover.
            </p>
            <Button size="lg" className="rounded-xl text-sm px-10 font-bold py-4" asChild>
              <Link href="/enquiry">Partner With Us</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[360px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#DDD5C8]"
          >
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" alt="Team Packing Gifts" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Services & Expertise */}
        <div className="space-y-24 mb-24">
          <section>
            <div className="text-center mb-12">
              <h3 className="text-xl sm:text-2xl font-black text-[#2B2B2B]">Our Services & Expertise</h3>
              <div className="mt-4 h-1.5 w-12 bg-[#6E7757] mx-auto rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {EXPERTISE.map((service, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-[#DDD5C8] hover:border-[#6E7757]/30 hover:shadow-xl transition-all duration-300 text-left">
                  <div className="mb-6 bg-[#EFE7DB] w-14 h-14 rounded-xl flex items-center justify-center">{service.icon}</div>
                  <h4 className="text-base sm:text-lg font-black text-[#2B2B2B] mb-3">{service.title}</h4>
                  <p className="text-[#6B6B63] text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Industries Served */}
          <section className="bg-[#EFE7DB] rounded-3xl p-10 md:p-16 border border-[#DDD5C8] text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-[#2B2B2B] mb-6">Industries We Serve</h3>
              <p className="text-[#6B6B63] text-sm sm:text-base mb-10 leading-relaxed font-medium">
                We provide tailored gifting and packaging solutions across diverse sectors, understanding the unique regulatory and branding requirements of each industry.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["IT & Tech Hubs", "Banking & Finance", "Healthcare & Pharma", "E-commerce & Logistics", "Education Councils", "Manufacturing", "Automobile Brands"].map((industry) => (
                  <span key={industry} className="px-5 py-2.5 bg-white text-[#6B6B63] rounded-xl font-bold text-xs border border-[#DDD5C8] shadow-sm hover:border-[#6E7757]/25 transition-all">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-[#DDD5C8] rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <div className="text-[#6E7757] mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-black text-[#6E7757] mb-1">{stat.metric}</div>
              <div className="text-[#6B6B63] text-[9px] font-extrabold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
