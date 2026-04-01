"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface SectionHeadingProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mb-12", centered && "text-center", className)}
      {...props}
    >

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>

      <div
        className={cn(
          "mt-4 h-[2px] rounded-full bg-gradient-to-r from-[#E63946] via-red-500 to-[#7A0000]",
          centered
            ? "mx-auto w-20 md:w-24"
            : "w-16 md:w-20"
        )}
      />

      {subtitle && (
        <p
          className={cn(
            "text-gray-400 text-lg md:text-xl mt-4",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}