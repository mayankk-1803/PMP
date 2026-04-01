"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";

const POSTS = [
  {
    title: "Corporate Gifting Trends for 2024",
    excerpt: "Discover what leading companies are doing to appreciate their employees in the hybrid work era.",
    image: "https://images.unsplash.com/photo-1512403661278-65121b67fced?q=80&w=800&auto=format&fit=crop",
    date: "Dec 12, 2023",
  },
  {
    title: "How to Build the Perfect Onboarding Kit",
    excerpt: "A step-by-step guide to making new hires feel welcome before day one.",
    image: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop",
    date: "Nov 28, 2023",
  },
  {
    title: "Sustainable Gifting: Beyond the Buzzword",
    excerpt: "Why eco-friendly corporate gifts are becoming a priority for Fortune 500s.",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop",
    date: "Nov 15, 2023",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Insights & Trends" 
          subtitle="Stay updated with the latest in corporate gifting and branding." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="text-sm text-primary mb-2 font-semibold tracking-wider">
                {post.date}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
