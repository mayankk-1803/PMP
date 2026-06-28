import React from "react";

export default function BrandsPage() {
  return (
    <main className="pt-28 bg-[#F8F5EF] min-h-screen">
      <section className="relative overflow-hidden bg-[#2B2B2B] text-white py-24">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,163,106,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,163,106,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6E7757]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-left">
            <span className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-[#C8A36A]/20 text-[10px] font-extrabold uppercase tracking-widest text-[#C8A36A] mb-5">
              Premium Brand Sourcing
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              Brand-led gifting for teams, clients, and channel partners.
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl font-medium">
              Curate branded merchandise, corporate kits, and employee welcome gifts using premium retail partners across apparel, tech, travel, drinkware, stationery, and lifestyle.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <img
            src="/images/pacmyproductlogos.png"
            alt="PacMyProduct Brand Partners"
            className="w-full max-w-[1400px] h-auto mx-auto object-contain"
          />
        </div>
      </section>
    </main>
  );
}
