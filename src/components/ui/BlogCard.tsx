"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  href: string;
}

export function BlogCard({ title, excerpt, date, imageUrl, href }: BlogCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link href={href} className="block overflow-hidden aspect-video bg-[#F1F5F9] relative">
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#1E3A5F] shadow-sm">
          {date}
        </div>
      </Link>
      
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <Link href={href} className="group-hover:text-[#C9A227] transition-colors">
          <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-[#1E3A5F] line-clamp-2 leading-tight">
            {title}
          </h3>
        </Link>
        <p className="text-[#1E3A5F]/70 font-medium text-base mb-8 line-clamp-3 flex-1 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={href} 
            className="inline-flex items-center font-bold text-[#C9A227] group/link hover:text-[#1E3A5F] transition-colors"
          >
            Read More
            <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
