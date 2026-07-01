"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { EASE_SMOOTH } from "@/lib/animations";
import { corporateKitImage, DEFAULT_KIT_IMAGE } from "@/lib/kitImageMap";

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  // Promotional Products — local images only
  "pens": "/images/pen1.png",
  "t-shirts": "/images/polotshirt.png",
  "keychains": "/images/executivemetalkeychain.png",
  "diaries": "/images/Diaries/1.jpg",
  "diaries-notebooks": "/images/Diaries/1.jpg",
  "caps": "/images/sportscap/classicsportcap.png",
  "backpacks": "/images/Backpacks/1.jpg",
  "bags": "/images/Backpacks/1.jpg",
  "laptop-bags": "/images/Laptop Bags/1.png",
  "travel-bags": "/images/Trolley Bags/1.jpg",
  "duffle-bags": "/images/Duffle Bags/1.webp",
  "trolley-bags": "/images/Trolley Bags/1.jpg",
  "sling-bags": "/images/slingbags/classicslingbag.png",
  "drinkware": "/images/sportsbottle.png",
  "flasks": "/images/flaskbottle.png",
  "bottles": "/images/sportsbottle.png",
  "coffee-mugs": "",  // No mug image — neutral placeholder
  "travel-mugs": "/images/flaskbottle.png",
  "mouse-pad": "/images/Mouse pad/General.jpg",
  "paper-weight": "/images/Paper Weight/1.jpg",
  "table-mats": "/images/Table Mat/1.jpg",
  "desk-organiser": "/images/Desk Organsier/1.jpg",
  "table-top": "/images/tabletopup.png",
  // Kits & Hampers — use kit images
  "corporate-kits": DEFAULT_KIT_IMAGE,
  "kits-hampers": DEFAULT_KIT_IMAGE,
  "festive-hampers": "/images/Festive Hampers/1.jpg",
  "joining": DEFAULT_KIT_IMAGE,
  "doctor": corporateKitImage("Doctor Kits") || DEFAULT_KIT_IMAGE,
  "dealer": corporateKitImage("Dealer Kits") || DEFAULT_KIT_IMAGE,
  "distributor": corporateKitImage("Distributor Kits") || DEFAULT_KIT_IMAGE,
  "architect": corporateKitImage("Architect Kits") || DEFAULT_KIT_IMAGE,
  "contractor": corporateKitImage("Contractor Kits") || DEFAULT_KIT_IMAGE,
  "mason": corporateKitImage("Mason Kits") || DEFAULT_KIT_IMAGE,
  "womens-day-gifts": "/kitsimages/womendayhamper.png",
  // Default
  "default": ""
};

export interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  category?: string;
  fallbackSrc?: string;
  isMotion?: boolean;
  motionProps?: HTMLMotionProps<"img">;
  useNextImage?: boolean;
  nextImageProps?: Omit<ImageProps, "src" | "onError" | "alt">;
}

export function SafeImage({
  src,
  category,
  fallbackSrc,
  isMotion = false,
  motionProps,
  useNextImage = false,
  nextImageProps,
  className,
  alt = "image",
  ...props
}: SafeImageProps) {
  /**
   * Returns true ONLY for genuine Kits & Hampers category slugs.
   * Promotional Product categories (pens, drinkware, bags, etc.) must NOT match here
   * — even if their titles contain words like 'executive', 'coffee', 'travel', 'gift'.
   */
  const isKitOrHamper = (cat?: string) => {
    const slug = (cat || "").toLowerCase().replace(/\s+/g, "-");
    return (
      slug === "corporate-kits" ||
      slug === "festive-hampers" ||
      slug === "kits-hampers" ||
      slug === "kits" ||
      slug === "hampers" ||
      slug === "diwali-hampers" ||
      slug === "holi-hampers" ||
      slug === "eid-kits" ||
      slug === "eid-hampers" ||
      slug === "christmas-kits" ||
      slug === "new-year-hampers" ||
      slug === "womens-day-gifts" ||
      slug === "joining-kits" ||
      slug === "dealer-kits" ||
      slug === "doctor-kits" ||
      slug === "architect-kits" ||
      slug === "mason-kits" ||
      slug === "electrician-kits" ||
      slug === "plumber-kits" ||
      slug === "interior-designer-kits" ||
      slug === "retailer-kits" ||
      slug === "painter-kits" ||
      slug === "engineer-kits"
    );
  };

  const getFallback = () => {
    if (isKitOrHamper(category)) {
      const kitFallback = corporateKitImage(category || alt);
      if (kitFallback) return kitFallback;
      // Return category-specific image for hampers
      return CATEGORY_FALLBACK_IMAGES[category?.toLowerCase() || ""] || "";
    }

    if (fallbackSrc) return fallbackSrc;
    const cat = category?.toLowerCase() || "default";
    // Check category-specific fallback first
    const categoryFallback = CATEGORY_FALLBACK_IMAGES[cat];
    if (categoryFallback !== undefined) return categoryFallback;
    // Partial slug matches for bags
    if (cat.includes("sling")) return "/images/slingbags/classicslingbag.png";
    if (cat.includes("round-neck") || cat.includes("round neck") || cat.includes("crew-neck") || cat.includes("crew neck")) return "/images/roundnecktshirt/classicroundnecktshirt.png";
    if (cat.includes("sports-cap") || cat.includes("sports cap") || cat.includes("sport-cap") || cat.includes("sport cap")) return "/images/sportscap/classicsportcap.png";
    if (cat.includes("cotton-cap") || cat.includes("cotton cap")) return "/images/cottoncaps/classiccottoncap.png";
    if (cat.includes("diwali")) return "/images/Diwali Hampers/1.jpg";
    if (cat.includes("holi")) return "/images/Holi Hampers/4b4cafcfc2eac114bea36d257d45a580.jpg";
    if (cat.includes("eid")) return "/images/EID HAmpers/1.jpg";
    // Unknown category — neutral placeholder
    return "";
  };

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fallback = getFallback();
  // Use src if it hasn't failed; if it has failed use fallback; if fallback is empty show neutral placeholder
  const imgSrc = failedSrc === src ? fallback : (src || fallback);

  if (!imgSrc) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#FAF9F6] border border-neutral-100 flex items-center justify-center animate-pulse" aria-label="No image available" />
    );
  }

  const handleError = () => {
    setFailedSrc(src);
    setIsLoaded(true); // Stop shimmer on error
  };

  const shimmerStyle = (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes shimmer-sweep {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .shimmer-sweep-bg {
        background: linear-gradient(90deg, #FAF9F6 25%, #EAD7C8 50%, #FAF9F6 75%);
        background-size: 200% 100%;
        animation: shimmer-sweep 1.6s infinite linear;
      }
    `}} />
  );

  if (useNextImage) {
    return (
      <div className="relative w-full h-full">
        {shimmerStyle}
        <Image
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`${className || ""} transition-all duration-500 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          {...nextImageProps}
        />
        {!isLoaded && <div className="absolute inset-0 w-full h-full shimmer-sweep-bg" />}
      </div>
    );
  }

  if (isMotion) {
    return (
      <div className="relative w-full h-full">
        {shimmerStyle}
        <motion.img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`${className || ""} transition-all duration-500 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          {...motionProps}
          {...(props as HTMLMotionProps<"img">)}
        />
        {!isLoaded && <div className="absolute inset-0 w-full h-full shimmer-sweep-bg" />}
      </div>
    );
  }

  // Default: built-in lazy viewport reveal
  return (
    <div className="relative w-full h-full">
      {shimmerStyle}
      <RevealImg
        imgSrc={imgSrc}
        alt={alt}
        handleError={handleError}
        className={className}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        props={props as HTMLMotionProps<"img">}
      />
      {!isLoaded && <div className="absolute inset-0 w-full h-full shimmer-sweep-bg" />}
    </div>
  );
}

function RevealImg({ imgSrc, alt, handleError, className, isLoaded, setIsLoaded, props }: {
  imgSrc: string;
  alt: string;
  handleError: () => void;
  className?: string;
  isLoaded: boolean;
  setIsLoaded: (val: boolean) => void;
  props: HTMLMotionProps<"img">;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <motion.img
      ref={ref}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className || ""} transition-opacity duration-500`}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={(inView && isLoaded) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      {...props}
    />
  );
}

