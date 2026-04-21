"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  fadeColor?: string;
  fadeWidth?: string;
}

export function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
  fadeColor = "white",
  fadeWidth = "w-24",
}: MarqueeProps) {
  return (
    <div className={cn("relative flex overflow-hidden group", className)}>
      {/* Edge Fade Left */}
      <div
        className={cn("absolute left-0 top-0 h-full z-10 pointer-events-none", fadeWidth)}
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />

      {/* Marquee Track */}
      <div
        className={cn(
          "flex flex-nowrap whitespace-nowrap",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          display: "flex",
          width: "max-content",
        }}
      >
        {children}
        {children}
      </div>

      {/* Edge Fade Right */}
      <div
        className={cn("absolute right-0 top-0 h-full z-10 pointer-events-none", fadeWidth)}
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
