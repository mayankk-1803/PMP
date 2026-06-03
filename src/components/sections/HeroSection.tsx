"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, ChevronRight, Star, ShieldCheck, Flame, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

// Custom client-side animated counter component for trust metrics
function CountUpNumber({ end, suffix = "", duration = 2.5 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Particle templates for ambient backdrop depth
const PARTICLE_TEMPLATES = [
  { x: "15%", y: 250, duration: 8, delay: 0.5, scale: 0.8, opacity: 0.6 },
  { x: "28%", y: 220, duration: 10, delay: 2.0, scale: 1.2, opacity: 0.4 },
  { x: "42%", y: 260, duration: 7, delay: 0.0, scale: 0.6, opacity: 0.8 },
  { x: "55%", y: 240, duration: 9, delay: 3.5, scale: 1.0, opacity: 0.5 },
  { x: "68%", y: 280, duration: 11, delay: 1.2, scale: 0.8, opacity: 0.7 },
  { x: "82%", y: 230, duration: 8, delay: 4.8, scale: 1.1, opacity: 0.4 },
  { x: "22%", y: 240, duration: 9, delay: 6.0, scale: 0.9, opacity: 0.5 },
  { x: "35%", y: 250, duration: 10, delay: 1.5, scale: 0.7, opacity: 0.6 },
  { x: "48%", y: 230, duration: 6, delay: 5.2, scale: 1.3, opacity: 0.5 },
  { x: "62%", y: 270, duration: 12, delay: 2.8, scale: 0.5, opacity: 0.7 },
  { x: "75%", y: 250, duration: 7, delay: 0.8, scale: 1.0, opacity: 0.6 },
  { x: "88%", y: 260, duration: 9, delay: 3.0, scale: 0.8, opacity: 0.5 },
];

// Product Ecosystem configuration
const ECOSYSTEM_ITEMS = [
  {
    id: "welcome-kit",
    title: "Employee Welcome Kit",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop",
    width: "w-[170px] sm:w-[200px] lg:w-[260px] xl:w-[280px]",
    height: "h-[200px] sm:h-[230px] lg:h-[300px] xl:h-[320px]",
    desktopPos: "left-[10%] top-[8%] sm:left-[12%] sm:top-[10%] lg:left-[12%] lg:top-[12%] xl:left-[15%] xl:top-[10%]",
    zIndex: "z-30",
    floatDuration: 10,
    floatOffset: 8,
    rotateRange: [-1, 1],
    parallaxFactor: 1.0,
    glow: "rgba(220,38,38,0.35)",
    isCenter: true
  },
  {
    id: "notebook",
    title: "Executive Notebook",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop",
    width: "w-[90px] sm:w-[110px] lg:w-[145px] xl:w-[160px]",
    height: "h-[110px] sm:h-[130px] lg:h-[165px] xl:h-[185px]",
    desktopPos: "left-[60%] top-[25%] sm:left-[62%] sm:top-[28%] lg:left-[60%] lg:top-[30%]",
    zIndex: "z-20",
    floatDuration: 9,
    floatOffset: 6,
    rotateRange: [-2.5, 1.5],
    parallaxFactor: 0.6,
    glow: "rgba(212,175,55,0.12)",
    isCenter: false
  },
  {
    id: "desk-organizer",
    title: "Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    width: "w-[92px] sm:w-[115px] lg:w-[150px] xl:w-[165px]",
    height: "h-[88px] sm:h-[105px] lg:h-[130px] xl:h-[145px]",
    desktopPos: "left-[50%] top-[4%] sm:left-[52%] sm:top-[6%] lg:left-[50%] lg:top-[8%]",
    zIndex: "z-25",
    floatDuration: 8,
    floatOffset: 7,
    rotateRange: [-1.5, 2],
    parallaxFactor: 0.7,
    glow: "rgba(212,175,55,0.12)",
    isCenter: false
  },
  {
    id: "bamboo-bottle",
    title: "Bamboo Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
    width: "w-[70px] sm:w-[85px] lg:w-[110px] xl:w-[125px]",
    height: "h-[125px] sm:h-[150px] lg:h-[195px] xl:h-[215px]",
    desktopPos: "left-[78%] top-[11%] sm:left-[78%] sm:top-[12%] lg:left-[76%] lg:top-[14%]",
    zIndex: "z-20",
    floatDuration: 11,
    floatOffset: 8,
    rotateRange: [2, -1],
    parallaxFactor: 0.5,
    glow: "rgba(34,197,94,0.12)",
    isCenter: false
  },
  {
    id: "pen-set",
    title: "Premium Gift Box",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    width: "w-[95px] sm:w-[115px] lg:w-[150px] xl:w-[165px]",
    height: "h-[90px] sm:h-[105px] lg:h-[130px] xl:h-[145px]",
    desktopPos: "left-[34%] top-[58%] sm:left-[36%] sm:top-[60%] lg:left-[38%] lg:top-[61%]",
    zIndex: "z-25",
    floatDuration: 9.5,
    floatOffset: 6,
    rotateRange: [-2, 1],
    parallaxFactor: 0.75,
    glow: "rgba(220,38,38,0.14)",
    isCenter: false
  },
  {
    id: "tote-bag",
    title: "Tote Bag",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800&auto=format&fit=crop",
    width: "w-[82px] sm:w-[100px] lg:w-[135px] xl:w-[150px]",
    height: "h-[112px] sm:h-[130px] lg:h-[170px] xl:h-[190px]",
    desktopPos: "left-[72%] top-[58%] sm:left-[73%] sm:top-[59%] lg:left-[71%] lg:top-[59%]",
    zIndex: "z-20",
    floatDuration: 10.5,
    floatOffset: 7,
    rotateRange: [1.5, -1.5],
    parallaxFactor: 0.55,
    glow: "rgba(255,255,255,0.12)",
    isCenter: false
  },
  {
    id: "calendar-block",
    title: "Calendar Block",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop",
    width: "w-[78px] sm:w-[95px] lg:w-[120px] xl:w-[135px]",
    height: "h-[78px] sm:h-[95px] lg:h-[120px] xl:h-[135px]",
    desktopPos: "left-[18%] top-[64%] sm:left-[20%] sm:top-[66%] lg:left-[22%] lg:top-[66%]",
    zIndex: "z-20",
    floatDuration: 8.5,
    floatOffset: 5,
    rotateRange: [-1, 2],
    parallaxFactor: 0.45,
    glow: "rgba(212,175,55,0.1)",
    isCenter: false
  }
];

const DESKTOP_ECOSYSTEM_ITEMS = ECOSYSTEM_ITEMS.filter((item) =>
  ["welcome-kit", "notebook", "desk-organizer", "bamboo-bottle", "pen-set"].includes(item.id)
);

const MOBILE_ECOSYSTEM_ITEMS = [
  {
    id: "mobile-welcome-kit",
    title: "Welcome Kit",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=600&auto=format&fit=crop",
    className: "left-[27%] top-[10px] w-[150px] h-[150px] z-30",
    delay: 0
  },
  {
    id: "mobile-bottle",
    title: "Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    className: "left-[4%] top-[36px] w-[78px] h-[138px] z-20",
    delay: 0.15
  },
  {
    id: "mobile-notebook",
    title: "Notebook",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
    className: "right-[4%] top-[32px] w-[92px] h-[112px] z-20",
    delay: 0.3
  },
  {
    id: "mobile-tshirt",
    title: "Gift Box",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    className: "left-[15%] bottom-[12px] w-[96px] h-[86px] z-25",
    delay: 0.45
  },
  {
    id: "mobile-backpack",
    title: "Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    className: "right-[13%] bottom-[4px] w-[108px] h-[108px] z-25",
    delay: 0.6
  }
];

function EcosystemCard({
  item,
  mouseX,
  mouseY,
  prefersReducedMotion
}: {
  item: (typeof ECOSYSTEM_ITEMS)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean;
}) {
  const floatY = prefersReducedMotion
    ? [0, 0]
    : [item.floatOffset, -item.floatOffset, item.floatOffset];
  const floatRotate = prefersReducedMotion
    ? [0, 0]
    : [item.rotateRange[0], item.rotateRange[1], item.rotateRange[0]];
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-20 * item.parallaxFactor, 20 * item.parallaxFactor]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-20 * item.parallaxFactor, 20 * item.parallaxFactor]);

  return (
    <motion.div
      key={item.id}
      style={{ x: parallaxX, y: parallaxY }}
      animate={{
        y: floatY,
        rotate: floatRotate
      }}
      transition={{
        y: { duration: item.floatDuration, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: item.floatDuration + 1, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{
        scale: item.isCenter ? 1.03 : 1.06,
        y: -5,
        zIndex: 40,
      }}
      className={`absolute ${item.desktopPos} ${item.width} ${item.height} ${item.zIndex} cursor-pointer group/card pointer-events-auto`}
    >
      <div className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${
        item.isCenter
          ? "shadow-[0_20px_60px_rgba(220,38,38,0.35),_0_0_50px_rgba(212,175,55,0.25)] border-2 border-red-500/35"
          : "shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.55)] border border-white/5"
      } bg-neutral-900/60`}>
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12" />
        </div>

        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover/card:scale-[1.05] filter brightness-110 contrast-105 saturate-105"
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-1" />
      </div>

      {item.isCenter && (
        <div className="hidden sm:block absolute top-[103%] left-0 w-full h-[60px] opacity-15 scale-y-[-1] pointer-events-none select-none blur-[1.5px] z-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/90 to-[#0c0a09]/10" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Parallax mouse variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    
    // Accessibility check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return; // Desktop only
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      mediaQuery.removeEventListener("change", listener);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      void video.play().catch(() => {
        // Muted autoplay can be delayed by a browser, but the video remains the primary mounted asset.
      });
    };

    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");
    video.defaultMuted = true;

    playVideo();
    const retryTimers = [250, 750, 1500, 3000].map((delay) => window.setTimeout(playVideo, delay));
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("playing", playVideo);

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("playing", playVideo);
    };
  }, []);

  const handleVideoReady = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.muted = true;
      video.defaultMuted = true;
      void video.play().catch(() => {
        // Muted autoplay should be allowed, but leave the video mounted if a browser delays playback.
      });
    }
  };


  // Stagger load anim configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-[70vh] pt-[72px] pb-5 sm:pt-[88px] sm:pb-8 lg:pt-28 lg:pb-16 flex items-center overflow-hidden bg-[#0c0a09] text-white">
      
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
        <video
          ref={videoRef}
          src="/gifting.mp4"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoReady}
          onLoadedMetadata={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500 object-center"
        />
        {videoFailed && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100" 
            style={{ backgroundImage: "url('/hero-gift.png')" }} 
          />
        )}
      </div>

      {/* 2. Layered Cinematic Overlay System */}
      <div className="absolute inset-0 bg-black/[0.03] z-1 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09]/0 via-[#0c0a09]/18 to-[#0c0a09]/72 z-1 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(220,38,38,0.10),_transparent_65%)] z-1 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.06),_transparent_55%)] z-1 select-none pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_58%,_rgba(0,0,0,0.16)_100%)] z-1 select-none pointer-events-none" />

      {/* 3. Ambient Blinking / Moving Lighting System (Depth layers) */}
      <div className="absolute top-1/4 right-[15%] w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[140px] z-1 select-none pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-[30%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] z-1 select-none pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[35%] right-[25%] w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[100px] z-1 select-none pointer-events-none animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[40%] right-[20%] w-[250px] h-[250px] bg-yellow-500/5 rounded-full blur-[90px] z-1 select-none pointer-events-none animate-pulse-slow" style={{ animationDelay: "3s" }} />

      {/* 4A. Mobile Hero: headline, products, copy, CTA, metrics */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:hidden">
        <div className="mx-auto flex min-h-[calc(100svh-92px)] max-w-md flex-col justify-start">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="pt-4 text-[30px] min-[375px]:text-[34px] sm:text-[38px] font-black tracking-tight text-white leading-[1.02]"
          >
            Premium Corporate Gifts
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">
              & Branded Merchandise
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-3 h-[218px] min-[375px]:h-[228px] sm:h-[240px] w-full overflow-visible"
          >
            <div className="absolute inset-x-4 top-8 h-32 rounded-full bg-red-500/18 blur-3xl" />
            <div className="absolute inset-x-12 bottom-8 h-24 rounded-full bg-amber-300/12 blur-2xl" />
            {MOBILE_ECOSYSTEM_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute ${item.className}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover brightness-110 contrast-105 saturate-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-1 max-w-sm text-[13px] leading-relaxed text-gray-200 font-semibold"
          >
            Premium welcome kits, executive gifts, and branded merchandise curated for modern teams.
          </motion.p>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 flex items-center gap-2"
          >
            <Button
              variant="default"
              className="h-10 flex-1 rounded-xl font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.28)] border-0 cursor-pointer text-xs"
              asChild
            >
              <Link href="/promotional-merchandise">
                Explore Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-10 shrink-0 rounded-xl px-3 font-bold border border-white/15 text-white bg-white/10 hover:bg-white/15 backdrop-blur-md flex items-center justify-center gap-1.5 text-xs"
              asChild
            >
              <Link href="/enquiry">
                Quote <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 flex flex-wrap gap-1.5"
          >
            {["Welcome Kits", "Corporate Gifts", "Premium Giveaways"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-red-100 shadow-sm flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-amber-200" />
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3"
          >
            {[
              { value: mounted ? <CountUpNumber end={500} suffix="+" duration={1.4} /> : "500+", label: "Clients" },
              { value: mounted ? <CountUpNumber end={100} suffix="k+" duration={1.4} /> : "100k+", label: "Gifts" },
              { value: mounted ? <CountUpNumber end={15} suffix="+" duration={1.4} /> : "15+", label: "Years" }
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.06] px-2 py-2 text-center">
                <div className="text-lg font-black text-white leading-none">{metric.value}</div>
                <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4B. Desktop Grid Container (Content & Ecosystem Showcase) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 hidden lg:grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Typography Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 space-y-4 sm:space-y-5 text-left"
        >
          {/* Tag Line */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-md max-w-full overflow-hidden">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider sm:tracking-widest text-amber-200 flex items-center gap-1 sm:gap-1.5">
              <span className="sm:inline hidden">Curated Corporate Gifting & Experiences</span>
              <span className="sm:hidden inline">Corporate Gifting & Experiences</span>
              <Flame className="w-3 h-3 text-red-500 fill-red-500 shrink-0" />
            </span>
          </motion.div>

          {/* Main Cinematic Title */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-black tracking-tight text-white leading-[1.1] sm:leading-[1.05]"
          >
            Premium Corporate Gifts <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
              & Branded Merchandise
            </span>
          </motion.h1>

          {/* Subtitle with rhythm */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed font-medium"
          >
            Bespoke Employee Welcome Kits, Premium Giveaways, and Executive Gift Sets curated to elevate your brand perception, delight clients, and build team unity.
          </motion.p>

          {/* Core Service Bullet Tags (Visual Storytelling reinforcement) */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
            {[
              "Welcome Kits", 
              "Corporate Gifting", 
              "Premium Giveaways", 
              "Branded Merchandise",
              "Executive Gift Sets"
            ].map((tag) => (
              <span 
                key={tag}
                className="text-[10px] font-bold px-3 py-1 rounded-lg bg-red-950/40 border border-red-500/20 text-red-300 shadow-sm flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-red-500" />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Redesigned tactility CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-2.5 pt-2 sm:gap-4 sm:pt-3"
          >
            <Button
              variant="default"
              className="h-10 sm:h-11 w-full sm:w-auto px-4 sm:px-6 rounded-xl font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 border-0 cursor-pointer text-xs sm:text-sm"
              asChild
            >
              <Link href="/promotional-merchandise">
                Explore Products
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-10 sm:h-11 w-full sm:w-auto px-4 sm:px-6 rounded-xl font-bold border-0 text-[#0c0a09] bg-white hover:bg-gray-100 hover:scale-[1.04] active:scale-[0.98] flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer text-xs sm:text-sm shadow-md"
              asChild
            >
              <Link href="/enquiry">
                Get Custom Quote <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Animated Trust Section (reinforced immediate trust) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-6 sm:gap-6 sm:pt-8 border-t border-white/10 max-w-lg"
          >
            <div>
              <div className="text-xl sm:text-2.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {mounted ? <CountUpNumber end={500} suffix="+" /> : "500+"}
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Corporate Clients</div>
            </div>
            <div>
              <div className="text-xl sm:text-2.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {mounted ? <CountUpNumber end={100} suffix="k+" /> : "100k+"}
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Gifts Delivered</div>
            </div>
            <div>
              <div className="text-xl sm:text-2.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {mounted ? <CountUpNumber end={15} suffix="+" /> : "15+"}
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Product Ecosystem Showcase Block */}
        <div className="lg:col-span-7 relative h-[200px] sm:h-[260px] lg:h-[420px] w-full flex items-center justify-center">
          
          {/* A. Overlapping 3D Parallax Ecosystem */}
          <div className="relative w-full h-full">
            
            {/* Ambient depth glows and particles behind the centerpiece Welcome Kit */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden rounded-3xl">
              {/* Large red radial glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-red-650/8 blur-[100px] mix-blend-screen animate-pulse-slow" />
              
              {/* Subtle gold radial glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-amber-400/6 blur-[80px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

              {/* Floating particles */}
              <div className="absolute inset-0 z-5">
                {PARTICLE_TEMPLATES.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: p.x, y: p.y + 300, opacity: 0, scale: p.scale }}
                    animate={{
                      y: [p.y + 300, p.y - 120],
                      opacity: [0, p.opacity, p.opacity, 0]
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: p.delay
                    }}
                    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 to-red-500 blur-[0.2px]"
                  />
                ))}
              </div>
            </div>

            {/* Distributed Trust Badges floating asynchronously in the corners */}
            {/* Top Left Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute top-[1%] left-[1%] z-40 bg-white/5 border border-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2 select-none hover:bg-white/10 text-white transition-colors duration-300 pointer-events-auto"
            >
              <ShieldCheck className="w-4 h-4 text-red-500 fill-red-500/10" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-200">500+ Corporate Clients</span>
            </motion.div>

            {/* Top Right Badge */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute top-[1%] right-[1%] z-40 bg-white/5 border border-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2 select-none hover:bg-white/10 text-white transition-colors duration-300 pointer-events-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/10" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-200">Custom Branding</span>
            </motion.div>

            {/* Product items rendering with Mouse Parallax & float loops */}
            {DESKTOP_ECOSYSTEM_ITEMS.map((item) => (
              <EcosystemCard
                key={item.id}
                item={item}
                mouseX={mouseX}
                mouseY={mouseY}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

        </div>
      </div>
      
    </section>
  );
}
