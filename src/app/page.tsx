import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { CorporateSolutions } from "@/components/sections/CorporateSolutions";
import { BentoKitsShowcase } from "@/components/sections/BentoKitsShowcase";
import { OfficeUtilityShowcase } from "@/components/sections/OfficeUtilityShowcase";
import { FeaturedHampers } from "@/components/sections/FeaturedHampers";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col max-w-full overflow-hidden">
      {/* 1. Fullscreen Hero Section */}
      <HeroSection />

      {/* 2. Shop by Budget Categories Tabs */}
      <GiftsByBudget />

      {/* 3. Corporate Gifting Categories (Hover zoom grid) */}
      <section className="py-24 bg-[#fbfaf8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-red-600 text-xs font-bold tracking-widest uppercase mb-3 block">Branded Corporate Partnerships</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Curated Merchandise & <span className="text-red-600">Giveaways</span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore high-quality merchandise co-branded with laser engraving, screen printing, or embroidery to boost brand value.
            </p>
          </div>
          <CorporateSolutions />
        </div>
      </section>

      {/* 4. Bento Grid Kits Showcase */}
      <BentoKitsShowcase />

      {/* 5. Premium Office Utilities Section */}
      <OfficeUtilityShowcase />

      {/* 6. Festive Hampers Carousel */}
      <FeaturedHampers />

      {/* 7. Services & About Split Layout */}
      <AboutPreview />

      {/* 8. CTA Inquiry Section */}
      <CtaSection />
    </div>
  );
}
