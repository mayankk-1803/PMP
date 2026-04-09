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
}

export function ProductCard({ title, description, imageUrl, price, className }: ProductCardProps) {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const router = useRouter();
  
  // To avoid hydration mismatch errors with localStorage, we initially assume it's not selected 
  // until the client mounts. Since ProductCard is client side and Context manages 'isMounted', 
  // checking is safe.
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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group flex flex-col h-full relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl border border-gray-100 transition-all", className)}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-[#F9FAFB] flex-shrink-0">
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Bookmark Icon Container */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
          <button
            onClick={handleToggleShortlist}
            className="p-3 rounded-full bg-white/95 backdrop-blur shadow-sm hover:scale-110 transition-transform flex items-center justify-center focus:outline-none"
            aria-label="Save for quote"
            title={isSelected ? "Remove from shortlist" : "Save for Quote"}
          >
            <Bookmark className={cn("w-5 h-5 transition-colors", isSelected ? "fill-[#C9A227] text-[#C9A227]" : "text-[#1E3A5F] hover:text-[#C9A227]")} />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{title}</h3>
        {description && <p className="text-[#1E3A5F]/70 text-sm mb-6 leading-relaxed font-medium line-clamp-3">{description}</p>}
        
        {/* mt-auto pushes this footer perfectly to the bottom regardless of description height */}
        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between w-full">
          {price && <span className="font-bold text-[#C9A227] text-lg">{price}</span>}
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleRequestQuote}
            className={cn("px-6 py-4 rounded-xl font-semibold shadow-sm text-sm tracking-wide", !price && "w-full ml-auto justify-center")}
          >
            Request Quote
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
