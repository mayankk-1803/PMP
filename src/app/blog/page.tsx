"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { BlogCard } from "@/components/ui/BlogCard";
import { BlogSidebar } from "@/components/ui/BlogSidebar";

const POSTS = [
  {
    title: "Best Corporate Gifting Ideas for Employees in 2026",
    excerpt: "Discover what leading companies are doing to appreciate their employees in the hybrid work era. Moving away from generic swag to personalized experiences.",
    image: "https://tse1.mm.bing.net/th/id/OIP.9p0AC0CTujeCWnATtHLF0QHaG8?pid=Api&h=220&P=0",
    date: "Dec 12, 2025",
    href: "#",
  },
  {
    title: "How Packaging Impacts Brand Perception",
    excerpt: "A step-by-step guide to making new hires feel welcome before day one. Learn about the psychological impact of a well-curated welcome box.",
    image: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop",
    date: "Nov 28, 2025",
    href: "#",
  },
  {
    title: "Top Diwali Corporate Gift Ideas for Businesses",
    excerpt: "Why eco-friendly corporate gifts are becoming a non-negotiable priority for Fortune 500s. Explore sustainable packaging solutions and organic products.",
    image: "https://tse4.mm.bing.net/th/id/OIP.1BgpFJeI2_Dsu7fWMLqWpQHaHa?pid=Api&h=220&P=0",
    date: "Nov 15, 2025",
    href: "#",
  },
];

const STAGGER: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-white overflow-hidden max-w-full">
      <BackgroundGradient />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading 
          title="Insights & Trends" 
          subtitle="Stay updated with the latest in corporate gifting, branding, and employee engagement." 
          centered 
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Main Content Area */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={STAGGER}
            className="grid sm:grid-cols-2 gap-8"
          >
            {POSTS.map((post, i) => (
              <motion.div variants={FADE_UP} key={i} className="h-full">
                <BlogCard 
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.image}
                  date={post.date}
                  href={post.href}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-28"
          >
            <BlogSidebar />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
