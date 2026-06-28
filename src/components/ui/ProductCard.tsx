"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";
import { useRouter } from "next/navigation";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { SafeImage } from "./SafeImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  price?: string;
  moq?: number;
  brandingOptions?: string[];
  className?: string;
  index?: number;
  category?: string;
  href?: string;
}

export function ProductCard({ title, description, imageUrl, price, moq, brandingOptions = [], className, index = 0, category, href }: ProductCardProps) {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  
  const isSelected = isInShortlist(title);
  const displayImage = localCatalogImage(title) || imageUrl;

  const handleToggleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeFromShortlist(title);
    } else {
      addToShortlist({ title, imageUrl: displayImage, price });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/enquiry?product=${encodeURIComponent(title)}`);
  };

  const handleCardClick = () => {
    if (href) {
      router.push(href);
      return;
    }
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    router.push(`/products/${slug}`);
  };

  return (
    <motion.div 
      initial={prefersReduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.07
      }}
      whileHover={prefersReduced ? undefined : { y: -10, scale: 1.01 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      onClick={handleCardClick}
      className={cn(
        "group flex flex-col h-full relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(43,43,43,0.06)] border border-[#DDD5C8] transition-all hover:shadow-[0_16px_40px_rgba(43,43,43,0.12)] hover:border-[#C8A36A]/40 cursor-pointer", 
        className
      )}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-[#F8F5EF] flex-shrink-0">
        <SafeImage 
          src={displayImage} 
          alt={title}
          category={category}
          useNextImage={true}
          nextImageProps={{
            fill: true,
            sizes: "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Subtle shimmer sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none" />

        <div className="absolute top-3 right-3 z-10">
          <motion.button
            whileHover={prefersReduced ? undefined : { scale: 1.1 }}
            whileTap={prefersReduced ? undefined : { scale: 0.9 }}
            onClick={handleToggleShortlist}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all focus:outline-none"
            aria-label="Save for quote"
          >
            <Bookmark className={cn("w-4 h-4 transition-colors", isSelected ? "fill-[#6E7757] text-[#6E7757]" : "text-[#6B6B63] hover:text-[#2B2B2B]")} />
          </motion.button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-[17px] font-bold text-[#6E7757] leading-tight line-clamp-2 transition-colors group-hover:text-[#4E583F]">{title}</h3>
        </div>
        
        {description && <p className="text-[#6B6B63] text-[13px] mb-4 line-clamp-2 leading-relaxed">{description}</p>}

        {(moq || brandingOptions.length > 0) && (
          <div className="mb-5 space-y-3">
            {brandingOptions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {brandingOptions.slice(0, 2).map((option) => (
                  <span
                    key={option}
                    className="rounded-md border border-[#DDD5C8] bg-[#F8F5EF] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#6B6B63]"
                  >
                    {option}
                  </span>
                ))}
              </div>
            )}
            {moq && (
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B6B63]">
                MOQ {moq}+ Units
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-[#DDD5C8] flex items-center justify-between">
          {price ? (
            <span className="font-bold text-[#2B2B2B] text-sm">{price}</span>
          ) : (
            <span className="text-[11px] font-bold text-[#6B6B63] uppercase tracking-wider">Contact for Price</span>
          )}
          <motion.div
            initial={prefersReduced ? false : { y: 8, opacity: 0.7 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRequestQuote}
              className="text-[12px] h-8 px-3 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              Get Quote
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
