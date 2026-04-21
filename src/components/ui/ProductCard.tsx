"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  price?: string;
  className?: string;
  index?: number;
}

export function ProductCard({ title, description, imageUrl, price, className, index = 0 }: ProductCardProps) {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const router = useRouter();
  
  const isSelected = isInShortlist(title);

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromShortlist(title);
    } else {
      addToShortlist({ title, imageUrl, price });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/enquiry?product=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.05
      }}
      whileHover={{ y: -4 }}
      className={cn(
        "group flex flex-col h-full relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200", 
        className
      )}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-gray-50 flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleToggleShortlist}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all focus:outline-none"
            aria-label="Save for quote"
          >
            <Bookmark className={cn("w-4 h-4 transition-colors", isSelected ? "fill-red-600 text-red-600" : "text-gray-400 hover:text-gray-900")} />
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-[17px] font-bold text-red-600 leading-tight line-clamp-2 transition-colors">{title}</h3>
        </div>
        
        {description && <p className="text-gray-500 text-[13px] mb-6 line-clamp-2 leading-relaxed">{description}</p>}
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          {price ? (
            <span className="font-bold text-gray-800 text-sm">{price}</span>
          ) : (
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Contact for Price</span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRequestQuote}
            className="text-[12px] h-8 px-3"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
