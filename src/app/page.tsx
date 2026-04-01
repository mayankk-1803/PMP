"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { ArrowRight, Package, TrendingUp, Truck, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";

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

const STATS = [
  { value: "50,000+", label: "Kits Delivered" },
  { value: "100+", label: "Corporate Clients" },
  // { value: "25+", label: "Cities Covered" },
  { value: "5+", label: "Years Experience" },
];

const TESTIMONIALS = [
  {
    quote: "PacMyProduct delivered high-quality onboarding kits across multiple locations on time.",
    author: "HR Manager",
    company: "IT Company"
  },
  {
    quote: "Great packaging quality and smooth execution for bulk corporate gifting.",
    author: "Marketing Head",
    company: "Retail Brand"
  }
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
            Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF7582]">Corporate Gifting Solutions</span> for Businesses in Delhi NCR
          </motion.h1>
          <motion.p variants={FADE_UP} className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Bulk gifting solutions for employees, clients, and events across Delhi NCR with custom branding and premium packaging.
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
                Explore Solutions
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-[#0A0A0A] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-8">
            Trusted by 100+ companies across India
          </h3>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER}
            className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {["JBL", "BOROSIL", "ADIDAS", "VIP", "BOAT"].map((brand) => (
              <motion.h4 variants={FADE_UP} key={brand} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">
                {brand}
              </motion.h4>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden bg-[#0F0F0F]">
        <BackgroundGradient />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            className="grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-800"
          >
            {STATS.map((stat, idx) => (
              <motion.div variants={FADE_UP} key={idx} className="text-center pt-8 sm:pt-0">
                <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-primary font-semibold tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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

      {/* Mid-Page CTA */}
      <section className="py-24 relative overflow-hidden bg-[#E63946]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Custom Corporate Gifts?
          </motion.h2>
          <motion.p variants={FADE_UP} className="text-xl text-white/90 mb-10">
            Get a Quote in 24 Hours. Bulk orders starting from 50 units.
          </motion.p>
          <motion.div variants={FADE_UP}>
            <Link href="/enquiry">
              <Button variant="outline" size="lg" className="text-lg bg-white text-primary border-white hover:bg-gray-100 hover:text-primary">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
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
                      <CheckCircle2 className="h-5 w-5" />
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

      {/* Testimonials */}
      <section className="py-24 bg-[#0F0F0F] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Clients Say" centered />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={STAGGER}
            className="grid md:grid-cols-2 gap-8 mt-12"
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div variants={FADE_UP} key={idx} className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 relative">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-800 opacity-50" />
                <p className="text-xl text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="text-white font-bold">{testimonial.author}</h4>
                  <p className="text-primary text-sm font-medium">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <article className="py-24 bg-[#0A0A0A] border-t border-gray-800">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-p:text-gray-400 prose-headings:text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Corporate Gifting Solutions for Modern Businesses</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Corporate gifting plays a crucial role in building strong business relationships. At PacMyProduct, we provide end-to-end corporate gifting and packaging solutions tailored for companies of all sizes.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            From employee onboarding kits to festive hampers and promotional merchandise, our solutions are designed to enhance brand value and create lasting impressions. With bulk ordering, custom branding, and pan India delivery, we ensure seamless execution for every requirement.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you are looking for premium executive gifts or cost-effective bulk solutions, our team helps you choose the right products aligned with your brand identity.
          </p>
        </motion.div>
      </article>

    </>
  );
}
