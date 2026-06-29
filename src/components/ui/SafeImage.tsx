"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { EASE_SMOOTH } from "@/lib/animations";
import { corporateKitImage, DEFAULT_KIT_IMAGE } from "@/lib/kitImageMap";

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "workspace-essentials": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  "pens": "/images/pen1.png",
  "t-shirts": "/images/polotshirt.png",
  "keychains": "/images/executivemetalkeychain.png",
  "diaries": "/images/Diaries/1.jpg",
  "caps": "/images/sportscap/classicsportcap.png",
  "backpacks": "/images/Backpacks/1.jpg",
  "bags": "/images/Backpacks/1.jpg",
  "drinkware": "/images/sportsbottle.png",
  "gift-sets": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
  "executive-gifts": "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
  "audio-gadgets": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
  "tech-accessories": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  "paper-weights": "/images/Paper Weight/1.jpg",
  "tabletop": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop",
  "standees": "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=1000&auto=format&fit=crop",
  "raincoats": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop",
  "tissue-boxes": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
  "joining": DEFAULT_KIT_IMAGE,
  "doctor": corporateKitImage("Doctor Kits") || DEFAULT_KIT_IMAGE,
  "dealer": corporateKitImage("Dealer Kits") || DEFAULT_KIT_IMAGE,
  "distributor": corporateKitImage("Distributor Kits") || DEFAULT_KIT_IMAGE,
  "architect": corporateKitImage("Architect Kits") || DEFAULT_KIT_IMAGE,
  "contractor": corporateKitImage("Contractor Kits") || DEFAULT_KIT_IMAGE,
  "mason": corporateKitImage("Mason Kits") || DEFAULT_KIT_IMAGE,
  "mono": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
  "rigid": "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000&auto=format&fit=crop",
  "corrugated": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  "packaging": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
  "default": DEFAULT_KIT_IMAGE
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
  const isKitOrHamper = (cat?: string, altText?: string) => {
    const clean = (cat || altText || "").toLowerCase();
    return (
      clean.includes("kit") ||
      clean.includes("hamper") ||
      clean.includes("gift") ||
      clean.includes("joining") ||
      clean.includes("onboarding") ||
      clean.includes("dealer") ||
      clean.includes("distributor") ||
      clean.includes("doctor") ||
      clean.includes("architect") ||
      clean.includes("contractor") ||
      clean.includes("mason") ||
      clean.includes("electrician") ||
      clean.includes("plumber") ||
      clean.includes("sales") ||
      clean.includes("partner") ||
      clean.includes("executive") ||
      clean.includes("seminar") ||
      clean.includes("pharma") ||
      clean.includes("hospital") ||
      clean.includes("diwali") ||
      clean.includes("holi") ||
      clean.includes("eid") ||
      clean.includes("christmas") ||
      clean.includes("newyear") ||
      clean.includes("celebration") ||
      clean.includes("welcome") ||
      clean.includes("luxury") ||
      clean.includes("gourmet") ||
      clean.includes("dryfruit") ||
      clean.includes("tea") ||
      clean.includes("coffee")
    );
  };

  const getFallback = () => {
    if (isKitOrHamper(category, alt)) {
      const kitFallback = corporateKitImage(category || alt);
      if (kitFallback) return kitFallback;
      return "";
    }

    if (fallbackSrc) return fallbackSrc;
    const cat = category?.toLowerCase() || "default";
    const kitFallback = corporateKitImage(category || alt);
    if (kitFallback) return kitFallback;
    if (cat.includes("doctor") || cat.includes("hospital") || cat.includes("pharma")) return CATEGORY_FALLBACK_IMAGES.doctor;
    if (cat.includes("joining") || cat.includes("welcome") || cat.includes("onboarding")) return CATEGORY_FALLBACK_IMAGES.joining;
    if (cat.includes("dealer") || cat.includes("sales")) return CATEGORY_FALLBACK_IMAGES.dealer;
    if (cat.includes("sling")) return "/images/slingbags/classicslingbag.png";
    if (cat.includes("round-neck") || cat.includes("round neck") || cat.includes("crew-neck") || cat.includes("crew neck")) return "/images/roundnecktshirt/classicroundnecktshirt.png";
    if (cat.includes("sports-cap") || cat.includes("sports cap") || cat.includes("sport-cap") || cat.includes("sport cap")) return "/images/sportscap/classicsportcap.png";
    if (cat.includes("cotton-cap") || cat.includes("cotton cap")) return "/images/cottoncaps/classiccottoncap.png";
    if (cat.includes("architect")) return CATEGORY_FALLBACK_IMAGES.architect;
    if (cat.includes("contractor") || cat.includes("mason") || cat.includes("field")) return CATEGORY_FALLBACK_IMAGES.contractor;
    if (cat.includes("corrugated") || cat.includes("mailer") || cat.includes("shipping")) return CATEGORY_FALLBACK_IMAGES.corrugated;
    if (cat.includes("diwali")) return "/images/Diwali Hampers/1.jpg";
    if (cat.includes("holi")) return "/images/Holi Hampers/4b4cafcfc2eac114bea36d257d45a580.jpg";
    if (cat.includes("eid")) return "/images/EID HAmpers/1.jpg";
    if (cat.includes("hamper")) return "/images/Festive Hampers/1.jpg";
    if (cat.includes("rigid") || cat.includes("drawer") || cat.includes("magnetic")) return CATEGORY_FALLBACK_IMAGES.rigid;
    if (cat.includes("mono") || cat.includes("carton") || cat.includes("packaging")) return CATEGORY_FALLBACK_IMAGES.mono;
    return CATEGORY_FALLBACK_IMAGES[cat] || CATEGORY_FALLBACK_IMAGES.default;
  };

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const fallback = getFallback();
  const imgSrc = failedSrc === src ? (isKitOrHamper(category, alt) ? "" : fallback) : (src || fallback);

  if (!imgSrc) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#FAF9F6] border border-neutral-100 flex items-center justify-center" aria-label="No image available" />
    );
  }

  const handleError = () => {
    setFailedSrc(src);
  };

  if (useNextImage) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={className}
        {...nextImageProps}
      />
    );
  }

  if (isMotion) {
    return (
      <motion.img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={className}
        {...motionProps}
        {...(props as HTMLMotionProps<"img">)}
      />
    );
  }

  // Default: built-in lazy viewport reveal
  return <RevealImg imgSrc={imgSrc} alt={alt} handleError={handleError} className={className} props={props as HTMLMotionProps<"img">} />;
}

function RevealImg({ imgSrc, alt, handleError, className, props }: {
  imgSrc: string;
  alt: string;
  handleError: () => void;
  className?: string;
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
      className={className}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      {...props}
    />
  );
}

