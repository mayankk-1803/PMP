"use client";

import React, { useState, useEffect } from "react";
import { DEFAULT_KIT_IMAGE } from "@/lib/kitImageMap";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Sparkles, ArrowRight, Bookmark } from "lucide-react";
import { Button } from "../ui/Button";
import { useShortlist } from "@/context/ShortlistContext";
import { SafeImage } from "../ui/SafeImage";
import { localCatalogImage } from "@/lib/localCatalogImages";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface HamperSubcategory {
  id?: string;
  name: string;
  slug: string;
  category: string;
  parentGroup?: string;
  description?: string;
  image?: string;
}

export function FeaturedHampers() {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const [hampers, setHampers] = useState<HamperSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog/subcategories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const festive = (res.data as HamperSubcategory[]).filter((subcategory) => subcategory.category === "festive-hampers" || subcategory.parentGroup === "Festive Hampers");
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
      <section className="py-24 bg-[#EFE7DB] border-y border-[#DDD5C8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[380px] rounded-2xl bg-[#DDD5C8]/40 animate-pulse border border-[#DDD5C8]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#EFE7DB] border-y border-[#DDD5C8] relative overflow-hidden">
      {/* Ambient warm backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6E7757]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-[200px] h-[200px] bg-[#C8A36A]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-[#C8A36A] text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#C8A36A]" /> Festive &amp; Occasion Gifting
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2B2B2B] mb-4">
              Premium Hampers &amp; <span className="text-[#6E7757]">Corporate Kits</span>
            </h2>
            <p className="text-base text-[#6B6B63] leading-relaxed font-medium">
              Celebrate company milestones, holidays, and onboarding with our luxury curations. Custom-branded and bulk-packed.
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-xl font-bold" asChild>
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
              const hamperImg = localCatalogImage(hamper.name) || hamper.image || DEFAULT_KIT_IMAGE;

              return (
                <SwiperSlide key={hamper.slug} className="h-auto">
                  <div className="group flex flex-col h-full bg-white border border-[#DDD5C8] rounded-2xl overflow-hidden hover:border-[#6E7757]/30 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(43,43,43,0.08)] relative">
                    
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] w-full bg-[#F8F5EF] overflow-hidden flex-shrink-0 border-b border-[#DDD5C8]">
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
                      
                      {/* Festive Badge */}
                      <span className="absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 bg-[#6E7757] text-white rounded-lg shadow-lg">
                        {hamperBadge}
                      </span>

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => handleToggleShortlist(hamper.name, hamperImg, hamperPrice, e)}
                        className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#DDD5C8] text-[#6B6B63] hover:bg-[#6E7757] hover:text-white transition-colors z-20"
                        title="Shortlist Hamper"
                      >
                        <Bookmark className={`w-4 h-4 ${isSelected ? "fill-[#6E7757] text-white" : "text-[#6B6B63]"}`} />
                      </button>
                    </div>

                    {/* Content Box */}
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#2B2B2B] text-base leading-tight group-hover:text-[#6E7757] transition-colors">
                          {hamper.name}
                        </h3>
                        <span className="font-extrabold text-[#C8A36A] text-xs tracking-wider uppercase bg-[#C8A36A]/10 px-2.5 py-1 rounded-md">{hamperPrice}</span>
                      </div>
                      <p className="text-[#6B6B63] text-xs leading-relaxed mb-6 flex-grow">
                        {hamperDesc}
                      </p>

                      <div className="pt-4 border-t border-[#DDD5C8] flex items-center justify-between mt-auto">
                        <Link
                          href={`/enquiry?product=${encodeURIComponent(hamper.name)}`}
                          className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B6B63] hover:text-[#6E7757] transition-all flex items-center gap-1 group/link"
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
          <Button variant="outline" className="w-full rounded-xl" asChild>
            <Link href="/corporate-kits">View All Hampers</Link>
          </Button>
        </div>

      </div>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #6E7757 !important;
          width: 44px !important;
          height: 44px !important;
          background: rgba(248, 245, 239, 0.9) !important;
          backdrop-filter: blur(8px) !important;
          border: 1px solid #DDD5C8 !important;
          border-radius: 9999px !important;
          transition: all 0.3s !important;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #6E7757 !important;
          color: white !important;
          border-color: #6E7757 !important;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px !important;
          font-weight: bold !important;
        }
        .hampers-pagination .swiper-pagination-bullet {
          background-color: #DDD5C8 !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          transition: all 0.3s !important;
        }
        .hampers-pagination .swiper-pagination-bullet-active {
          background-color: #6E7757 !important;
          width: 24px !important;
          border-radius: 9999px !important;
        }
      `}</style>
    </section>
  );
}
