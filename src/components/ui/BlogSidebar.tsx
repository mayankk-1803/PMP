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
    <aside className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-extrabold text-red-600 mb-6">Search</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl pl-4 pr-10 py-4 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all font-medium"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-extrabold text-red-600 mb-6">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <button 
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold ${
                  category.isActive 
                    ? "bg-gray-900 text-white shadow-md" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-extrabold text-red-600 mb-6">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post, idx) => (
            <li key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0 group">
              <Link href={post.href} className="text-gray-600 font-medium hover:text-gray-900 transition-colors line-clamp-2 leading-relaxed">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
