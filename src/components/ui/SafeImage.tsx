"use client";

import React, { useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Image, { ImageProps } from "next/image";

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "workspace-essentials": "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=1000&auto=format&fit=crop",
  "pens": "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
  "t-shirts": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop",
  "keychains": "https://images.unsplash.com/photo-1575880911432-843818617882?q=80&w=1000&auto=format&fit=crop",
  "diaries": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop",
  "caps": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
  "backpacks": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  "drinkware": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
  "gift-sets": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
  "executive-gifts": "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
  "audio-gadgets": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
  "tech-accessories": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  "paper-weights": "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
  "tabletop": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop",
  "standees": "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=1000&auto=format&fit=crop",
  "raincoats": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop",
  "tissue-boxes": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
  "joining": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
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
