"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export function BlogSidebar() {
  const categories = [
    { name: "All Posts", isActive: true },
    { name: "Packaging Solutions", isActive: false },
    { name: "Corporate Gifting", isActive: false },
    { name: "Employee Wellbeing", isActive: false },
    { name: "Industry Trends", isActive: false },
  ];

  const recentPosts = [
    { title: "Best Corporate Gifting Ideas for Employees in 2026", href: "#" },
    { title: "How Packaging Impacts Brand Perception", href: "#" },
    { title: "Top Diwali Corporate Gift Ideas for Businesses", href: "#" },
  ];

  return (
    <aside className="space-y-12">
      {/* Search Widget */}
      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Search</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-[#0F0F0F] border border-gray-700 text-white rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <button 
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  category.isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-[#0F0F0F]"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post, idx) => (
            <li key={idx} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
              <Link href={post.href} className="text-gray-400 hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
