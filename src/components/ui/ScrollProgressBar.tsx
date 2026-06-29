"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Thin luxury scroll progress bar at the top of public pages.
 * Hidden on admin pages and on pages shorter than the viewport.
 */
export function ScrollProgressBar() {
  const pathname = usePathname() ?? "";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  // Never show on admin
  if (pathname.startsWith("/87564/admin")) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[9999] bg-gradient-to-r from-[#D32F2F] via-[#EF5350] to-[#D32F2F] will-change-transform pointer-events-none"
      style={{ scaleX }}
    />
  );
}
