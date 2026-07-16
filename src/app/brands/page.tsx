import React from "react";
import Image from "next/image";

export default function BrandsPage() {
  return (
    <main className="pt-28 bg-[#FAF9F6] min-h-screen">
      <section className="relative overflow-hidden bg-[#2B2B2B] text-white py-24">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,163,106,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,163,106,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D32F2F]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-left">
            <span className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-[#EF5350]/20 text-[10px] font-extrabold uppercase tracking-widest text-[#EF5350] mb-5">
              Premium Brand Sourcing
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              Brand-led gifting for teams, clients, and channel partners.
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl font-medium">
              Curate branded merchandise, corporate kits, and employee welcome gifts using premium retail partners across apparel, tech, travel, drink ware, stationery, and lifestyle.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Image
            src="/brands.png"
            alt="Top Brands for Premium Corporate Gifting"
            width={1200}
            height={900}
            priority
            sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
            className="w-full max-w-[1400px] h-auto mx-auto object-contain"
          />
        </div>
      </section>
    </main>
  );
}
