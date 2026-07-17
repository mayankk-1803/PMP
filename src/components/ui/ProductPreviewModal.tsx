"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2, Clipboard, ShieldCheck, Box } from "lucide-react";
import { useProductPreview } from "@/context/ProductPreviewContext";
import { buildEnquiryUrl, getShortlistItemDisplayName } from "@/lib/enquiryHelper";
import { getCanonicalSubcategoryName, getCanonicalCategoryName, cleanProductTitle, resolveDisplayName } from "@/lib/slugResolver";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getDisplayCategoryName, getDisplaySubcategoryName, toDisplayName } from "@/lib/displayNames";

export function ProductPreviewModal() {
  const { isOpen, product, closePreview } = useProductPreview();
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setCopied(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key and Arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !product) return;
      if (e.key === "Escape") {
        closePreview();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, product, activeIndex]);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: product.description,
      url: window.location.origin + buildEnquiryUrl({
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        moq: product.moq
      }),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  const handleGetQuote = () => {
    closePreview();
    const url = buildEnquiryUrl({
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      moq: product.moq
    });
    router.push(url);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closePreview();
    }
  };

  // Safe category & subcategory name formatting
  const displayCategory = product.category
    ? getDisplayCategoryName(getCanonicalCategoryName(product.category) || product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    : "Gifts";
  
  const displaySubcategory = product.subcategory
    ? getDisplaySubcategoryName(getCanonicalSubcategoryName(product.subcategory) || product.subcategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    : "";

  const getProductPreviewTitle = () => {
    const rawTitle = resolveDisplayName({
      title: product.title,
      name: product.name,
      displayName: product.displayName,
      category: product.category,
      subcategory: product.subcategory
    });
    return toDisplayName(rawTitle);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl overflow-hidden rounded-[24px] bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] text-[#2B2B2B]"
        >
          {/* Close Button */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black border border-gray-100 shadow-md backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Images & Gallery */}
          <div className="w-full md:w-1/2 bg-[#FAF9F6] p-6 flex flex-col justify-between border-r border-gray-150">
            {/* Main Interactive Hero Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center justify-center group">
              <div
                className="relative w-full h-full cursor-zoom-in overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <Image
                  src={images[activeIndex]}
                  alt={cleanProductTitle(product.title)}
                  fill
                  sizes="(min-width: 768px) 500px, 90vw"
                  priority
                  className={`object-contain transition-transform duration-200 ${
                    isZoomed ? "scale-[1.8]" : "scale-100"
                  }`}
                  style={
                    isZoomed
                      ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                      : undefined
                  }
                />
              </div>

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/90 hover:bg-white border border-gray-200 shadow-sm hover:scale-105 transition-all text-gray-700 focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/90 hover:bg-white border border-gray-200 shadow-sm hover:scale-105 transition-all text-gray-700 focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2.5 mt-4 max-w-full justify-start md:justify-center scrollbar-thin">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all ${
                      activeIndex === i ? "border-[#D32F2F] shadow-sm" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${cleanProductTitle(product.title)} thumbnail ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Content Details */}
          <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[85vh]">
            <div className="space-y-6 text-left">
              {/* Category Breadcrumbs / Tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350]">
                <span>{displayCategory}</span>
                {displaySubcategory && (
                  <>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">{displaySubcategory}</span>
                  </>
                )}
              </div>

              {/* Brand and Title */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {product.brand && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-gray-200 text-xs font-bold text-[#8A6A3B]">
                      {product.brand}
                    </span>
                  )}
                  {product.moq && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-gray-200 text-xs font-bold text-gray-600">
                      MOQ: {product.moq}+ units
                    </span>
                  )}
                </div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                  PacMyProduct
                </h2>
                <h3 className="text-2xl font-black tracking-tight text-gray-950 mt-1">
                  {getProductPreviewTitle()}
                </h3>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Product Overview
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {product.description || "Curated premium corporate solution designed with high-quality materials and customized branding for employee welcome swag or executive drops."}
                </p>
              </div>

              {/* Specifications / Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Product Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, i) => (
                      <div key={feature + i} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#EF5350] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Branding options (fallback list if none specified) */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Branding Capabilities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Laser Engraving", "Screen Printing", "DTF Multi-Color Print", "Blind Embossing"].map((cap) => (
                    <span
                      key={cap}
                      className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-600 uppercase tracking-wider"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-gray-150 mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGetQuote}
                className="flex-1 bg-[#D32F2F] hover:bg-[#C62828] text-white rounded-xl py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D32F2F]/15 transition-all active:scale-[0.98] border-none outline-none cursor-pointer"
              >
                <Box className="w-4 h-4" />
                Request Custom Quote
              </button>
              
              <button
                onClick={handleShare}
                className="p-3.5 rounded-xl border border-gray-250 hover:bg-gray-50 text-gray-600 hover:text-black flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 relative"
                aria-label="Share product"
              >
                {copied ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                    <Clipboard className="w-4 h-4" />
                    Copied URL!
                  </span>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
