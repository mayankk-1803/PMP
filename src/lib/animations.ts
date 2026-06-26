/**
 * Global Animation Variants Library — PacMyProduct
 * All public-facing components import from here.
 * Admin panel never touches this file.
 */

import type { Variants } from "framer-motion";

// ─── Shared Easing Curves ─────────────────────────────────────────────────────
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const EASE_OUT   = [0.0, 0.0, 0.2, 1] as [number, number, number, number];
export const EASE_IN    = [0.4, 0.0, 1, 1]   as [number, number, number, number];
export const SPRING     = { type: "spring", stiffness: 300, damping: 28 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 200, damping: 30 } as const;

// ─── Core Directional Fades ───────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// ─── Scale & Zoom ─────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_SMOOTH } },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.0 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

// ─── Section Reveals ─────────────────────────────────────────────────────────
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_SMOOTH } },
};

// ─── Card Reveals ─────────────────────────────────────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

// ─── Button ───────────────────────────────────────────────────────────────────
export const buttonReveal: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING } },
};

// ─── Hero Specific ────────────────────────────────────────────────────────────
export const heroReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

export const heroItemFast: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

export const heroBgReveal: Variants = {
  hidden: { scale: 1.08, opacity: 0.6 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.8, ease: EASE_OUT } },
};

export const heroOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, delay: 0.2 } },
};

// ─── Chip / Badge One-by-one ──────────────────────────────────────────────────
export const chipReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

// ─── Stats / Counter Cards (spring, one by one) ───────────────────────────────
export const statCard: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { ...SPRING_SOFT },
  },
};

// ─── Image Reveal ─────────────────────────────────────────────────────────────
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

// ─── Page Transitions ─────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SMOOTH } },
  exit:   { opacity: 0, y: 20, transition: { duration: 0.3, ease: EASE_IN } },
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const navReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

export const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SMOOTH } },
};

export const mobileMenuContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.0 } },
};

export const mobileMenuItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_SMOOTH } },
};

// ─── Floating (infinite loop) ─────────────────────────────────────────────────
export const floatY = {
  y: [0, -6, 0],
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
};

// ─── Reduced Motion (no-op variants for prefers-reduced-motion) ───────────────
export const reducedMotionVariants: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
  exit:    { opacity: 1 },
};

/**
 * Factory: returns the right variants based on user's motion preference.
 * Usage: const v = motionSafe(fadeUp);
 */
export function motionSafe(
  variants: Variants,
  prefersReduced: boolean
): Variants {
  return prefersReduced ? reducedMotionVariants : variants;
}
