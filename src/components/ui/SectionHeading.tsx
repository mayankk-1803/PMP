"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  subtitle?: ReactNode;
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
      className={cn("mb-16", centered && "text-center", className)}
      {...(props as any)}
    >

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-red-600">
        {title}
      </h2>

      <div
        className={cn(
          "mt-4 h-1 rounded-full bg-red-600",
          centered
            ? "mx-auto w-12"
            : "w-12"
        )}
      />

      {subtitle && (
        <p
          className={cn(
            "text-gray-500 text-base md:text-lg mt-5 leading-relaxed",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}