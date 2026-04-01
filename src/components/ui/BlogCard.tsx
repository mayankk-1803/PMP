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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1A] border border-gray-800 hover:border-primary/50 transition-colors duration-300"
    >
      <Link href={href} className="block overflow-hidden aspect-video bg-gray-900 relative">
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#0F0F0F]/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-800 text-xs font-semibold text-gray-300">
          {date}
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <Link href={href} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-400 text-base mb-6 line-clamp-3 flex-1">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={href} 
            className="inline-flex items-center font-semibold text-primary group/link hover:text-white transition-colors"
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
