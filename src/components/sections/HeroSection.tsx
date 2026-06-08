"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star, Flame, CheckCircle2 } from "lucide-react";
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

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* 4A. Mobile Hero: headline, copy, CTA, metrics */}
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

          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-sm text-[13px] leading-relaxed text-gray-200 font-semibold"
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

      {/* 4B. Desktop Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 hidden lg:block">
        
        {/* Left Typography Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl space-y-4 sm:space-y-5 text-left"
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
      </div>
      
    </section>
  );
}
