"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { ArrowRight, Package, TrendingUp, Truck, ShieldCheck } from "lucide-react";

const FEATURED_HAMPERS = [
  {
    title: "Executive Diwali Hamper",
    description: "Premium sweets, dry fruits, and custom branded diary with pen.",
    price: "₹1,500",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Premium Welcome Kit",
    description: "Branded t-shirt, sipper, diary, and ID card holder in a rigid box.",
    price: "₹2,200",
    imageUrl: "https://images.pexels.com/photos/3826676/pexels-photo-3826676.jpeg",
  },
  {
    title: "Tech Associate Kit",
    description: "Wireless mouse, power bank, and premium ear-buds.",
    price: "₹3,500",
    imageUrl: "https://images.pexels.com/photos/34929075/pexels-photo-34929075.jpeg",
  },
];

const CATEGORIES = [
  { name: "Corporate Kits", href: "/corporate-kits", icon: <Package className="h-8 w-8" /> },
  { name: "Festive Hampers", href: "/festive-gifting", icon: <ShieldCheck className="h-8 w-8" /> },
  { name: "Promo Merch", href: "/promotional-merchandise", icon: <TrendingUp className="h-8 w-8" /> },
  { name: "Industry Kits", href: "/industry-solutions", icon: <Truck className="h-8 w-8" /> },
];

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <BackgroundGradient />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512403661278-65121b67fced?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={STAGGER}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <motion.div variants={FADE_UP} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold tracking-wider">
            PREMIUM B2B GIFTING PARTNER
          </motion.div>
          <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto leading-tight">
            End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF7582]">Corporate Gifting</span> Solutions
          </motion.h1>
          <motion.p variants={FADE_UP} className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Bulk Orders | Custom Branding | Pan India Delivery
          </motion.p>
          <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/enquiry">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto text-lg group">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/corporate-kits">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg bg-[#0F0F0F]/50 backdrop-blur-sm">
                View Products
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Explore by Category" centered />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CATEGORIES.map((category) => (
              <motion.div variants={FADE_UP} key={category.name}>
                <Link href={category.href} className="block h-full">
                  <div className="h-full group bg-[#1A1A1A] hover:bg-primary/5 border border-gray-800 hover:border-primary/50 transition-all rounded-2xl p-8 text-center flex flex-col items-center gap-4">
                    <div className="bg-[#0F0F0F] p-4 rounded-xl group-hover:text-primary transition-colors text-gray-400">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={STAGGER}
            >
              <SectionHeading title="Why Partner With Us?" subtitle="Our commitment to delivering exceptional unboxing experiences." className="mb-8" />
              <div className="space-y-6 mt-8">
                {[
                  { title: "Bulk Orders", desc: "Capability to handle volumes from 50 to 50,000+ units." },
                  { title: "Custom Branding", desc: "High-quality UV printing, engraving, and screen printing." },
                  { title: "Premium Quality", desc: "Curated products from top brands to ensure durability." },
                  { title: "Pan India Delivery", desc: "Direct-to-employee doorstep delivery across India." }
                ].map((item, idx) => (
                  <motion.div variants={FADE_UP} key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-gray-800"
            >
              <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" alt="Corporate Gifting" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Hampers */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundGradient />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="Ready-to-Ship Hampers" subtitle="Our most popular curated collections." className="mb-0" />
            <Link href="/festive-gifting" className="hidden md:block">
              <Button variant="ghost" className="text-primary group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FEATURED_HAMPERS.map((hamper, idx) => (
              <motion.div variants={FADE_UP} key={idx}>
                <ProductCard {...hamper} />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/festive-gifting">
              <Button variant="outline" className="w-full">View All Hampers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands & Clients */}
      <section className="py-16 bg-[#0A0A0A] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-8">
            Proudly partnered with top brands
          </h3>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER}
            className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {["JBL", "BOROSIL", "ADIDAS", "VIP", "BOAT"].map(brand => (
              <motion.h4 variants={FADE_UP} key={brand} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
                {brand}
              </motion.h4>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <BackgroundGradient />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <SectionHeading title="Ready to elevate your corporate gifting?" centered className="mb-8" />
          <motion.p variants={FADE_UP} className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get in touch with our gifting experts today to design the perfect unboxing experience for your employees, clients, or partners.
          </motion.p>
          <motion.div variants={FADE_UP}>
            <Link href="/enquiry">
              <Button variant="gradient" size="lg" className="text-lg hover:scale-105 transition-transform duration-300">
                Get Your Custom Quote Today
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
