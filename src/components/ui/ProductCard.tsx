"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // --- 3D TILT LOGIC ---
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  // Rotate between -5deg and 5deg
  const rotateX = useTransform(mouseYSpring, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Reset gracefully to center
    x.set(0.5);
    y.set(0.5);
  };

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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.1 // Apply subtle stagger on entry based on mapping index
      }}
      style={{
        rotateX,
        rotateY,
        perspective: 1200 // Defines rendering depth for 3D elements
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={cn(
        "group flex flex-col h-full relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-colors hover:border-[#1E3A5F]/10 hover:shadow-xl", 
        className
      )}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-[#F9FAFB] flex-shrink-0">
        <motion.img 
          src={imageUrl} 
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
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
