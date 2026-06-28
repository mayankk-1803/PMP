"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Shimmer base keyframe is handled via Tailwind's animate-pulse
// For the shimmer sweep we use CSS gradient animation via inline style

interface SkeletonProps {
  className?: string;
}

function Shimmer({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#EFE7DB] rounded-xl",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}

/** Skeleton for a single ProductCard */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-[20px] bg-white border border-[#DDD5C8] overflow-hidden shadow-sm">
      <Shimmer className="w-full h-[240px] rounded-none" />
      <div className="p-5 space-y-3 flex-1">
        <Shimmer className="h-5 w-3/4" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-4 border-t border-[#DDD5C8] mt-auto">
          <Shimmer className="h-4 w-20" />
          <Shimmer className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton for a category card */
export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white border border-[#DDD5C8] overflow-hidden shadow-sm">
      <Shimmer className="w-full h-[180px] rounded-none" />
      <div className="p-6 space-y-3">
        <Shimmer className="h-5 w-1/2" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/** Skeleton for a brand card */
export function BrandCardSkeleton() {
  return (
    <div className="rounded-xl bg-white border border-[#DDD5C8] p-5 min-h-[220px] flex flex-col justify-between">
      <Shimmer className="h-16 w-full mb-4" />
      <div className="space-y-2">
        <Shimmer className="h-4 w-1/2" />
        <Shimmer className="h-3 w-3/4" />
      </div>
    </div>
  );
}

/** Full section skeleton for homepage — used while sections load */
export function SectionSkeleton({ count = 4, columns = 4 }: { count?: number; columns?: number }) {
  const colClass =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`grid ${colClass} gap-6`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </motion.div>
  );
}
