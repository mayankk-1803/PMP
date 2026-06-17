"use client";

import React, { useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Image, { ImageProps } from "next/image";

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
  "joining": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  "doctor": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
  "dealer": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  "distributor": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  "architect": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
  "contractor": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
  "mason": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
  "mono": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
  "rigid": "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000&auto=format&fit=crop",
  "corrugated": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  "packaging": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
  "default": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop"
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
  const getFallback = () => {
    if (fallbackSrc) return fallbackSrc;
    const cat = category?.toLowerCase() || "default";
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

  const [imgSrc, setImgSrc] = useState(src || getFallback());
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || getFallback());
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(getFallback());
      setHasError(true);
    }
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
        {...(props as any)}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
