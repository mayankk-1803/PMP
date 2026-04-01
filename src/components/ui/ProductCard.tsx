"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  price?: string;
  className?: string;
}

export function ProductCard({ title, description, imageUrl, price, className }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("group relative overflow-hidden rounded-xl bg-[#1A1A1A] border border-gray-800 transition-colors hover:border-gray-700", className)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-900">
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
          {price && <span className="font-bold text-lg">{price}</span>}
          <Button variant="outline" size="sm" className="ml-auto w-full md:w-auto" >
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
