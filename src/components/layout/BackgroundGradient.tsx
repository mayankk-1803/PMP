import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] pointer-events-none opacity-20 blur-[120px]",
        className
      )}
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A227] rounded-full mix-blend-multiply opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1E3A5F] rounded-full mix-blend-multiply opacity-20" />
    </div>
  );
}
