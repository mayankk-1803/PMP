"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Sparkles, ArrowRight, Bookmark } from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";
import { SafeImage } from "../ui/SafeImage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function FeaturedHampers() {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const [hampers, setHampers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog/subcategories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const festive = res.data.filter((s: any) => s.category === "festive-hampers" || s.parentGroup === "Festive Hampers");
          setHampers(festive);
        }
        setLoading(false);
      })
      .catch(() => {
        setHampers([]);
        setLoading(false);
      });
  }, []);

  const handleToggleShortlist = (title: string, image: string, price: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInShortlist(title)) {
      removeFromShortlist(title);
    } else {
      addToShortlist({ title, imageUrl: image, price });
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-[#0a0a0c] text-white border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[380px] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#0a0a0c] text-white border-y border-white/5 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" />

      {/* Decorative Ribbon Element */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-red-50/10 to-amber-50/10 rounded-full blur-xl pointer-events-none animate-ribbon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" /> Festive & Occasion Gifting
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Premium Hampers & <span className="text-red-500">Corporate Kits</span>
            </h2>
            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Celebrate company milestones, holidays, and onboarding with our luxury curations. Custom-branded and bulk-packed.
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20 font-bold" asChild>
            <Link href="/corporate-kits">View All Hampers</Link>
          </Button>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true, el: ".hampers-pagination" }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {hampers.map((hamper) => {
              const isSelected = isInShortlist(hamper.name);
              const hamperPrice = "Custom Quote";
              const hamperBadge = "Festive Hamper";
              const hamperDesc = hamper.description || "Premium custom-branded festive corporate gift hampers.";
              const hamperImg = hamper.image || "/images/joiningkit.png";

              return (
                <SwiperSlide key={hamper.slug} className="h-auto">
                  <div className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-355 hover:shadow-[0_12px_40px_rgba(220,38,38,0.06)] relative">
                    
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden flex-shrink-0 border-b border-white/5">
                      <SafeImage
                        src={hamperImg}
                        alt={hamper.name}
                        category="gift-sets"
                        useNextImage={true}
                        nextImageProps={{
                          fill: true,
                          unoptimized: true
                        }}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Festive Glow Badge */}
                      <span className="absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg shadow-lg shadow-red-600/35">
                        {hamperBadge}
                      </span>

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => handleToggleShortlist(hamper.name, hamperImg, hamperPrice, e)}
                        className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-red-600 transition-colors z-20"
                        title="Shortlist Hamper"
                      >
                        <Bookmark className={`w-4 h-4 ${isSelected ? "fill-white text-white" : "text-gray-200"}`} />
                      </button>
                    </div>

                    {/* Content Box */}
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white text-base leading-tight group-hover:text-red-400 transition-colors">
                          {hamper.name}
                        </h3>
                        <span className="font-extrabold text-amber-400 text-xs tracking-wider uppercase bg-amber-400/10 px-2.5 py-1 rounded-md">{hamperPrice}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
                        {hamperDesc}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                        <Link
                          href={`/enquiry?product=${encodeURIComponent(hamper.name)}`}
                          className="text-[10px] font-extrabold uppercase tracking-widest text-gray-300 hover:text-red-400 transition-all flex items-center gap-1 group/link"
                        >
                          Request Customization <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Pagination Controls */}
          <div className="hampers-pagination flex justify-center gap-2 mt-2"></div>
        </div>

        {/* Mobile Action Button */}
        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full rounded-xl border-white/10 text-white" asChild>
            <Link href="/corporate-kits">View All Hampers</Link>
          </Button>
        </div>

      </div>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: rgba(255, 255, 255, 0.6) !important;
          width: 44px !important;
          height: 44px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 9999px !important;
          transition: all 0.3s !important;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #dc2626 !important;
          color: white !important;
          border-color: #dc2626 !important;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px !important;
          font-weight: bold !important;
        }
        .hampers-pagination .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.2) !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          transition: all 0.3s !important;
        }
        .hampers-pagination .swiper-pagination-bullet-active {
          background-color: #dc2626 !important;
          width: 24px !important;
          border-radius: 9999px !important;
        }
      `}</style>
    </section>
  );
}
