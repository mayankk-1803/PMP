import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] pointer-events-none opacity-40 blur-[100px]",
        className
      )}
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#3A0000] to-[#7A0000] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen" />
    </div>
  );
}
