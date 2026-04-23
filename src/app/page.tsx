import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Marquee } from "@/components/ui/Marquee";
import { CorporateSolutions } from "@/components/sections/CorporateSolutions";
import { FeaturedHampers } from "@/components/sections/FeaturedHampers";
import { PackagingSolutions } from "@/components/sections/PackagingSolutions";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { CtaSection } from "@/components/sections/CtaSection";
import { PremiumBrands } from "@/components/sections/PremiumBrands";
import { AboutPreview } from "@/components/sections/AboutPreview";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* 2. Budget categories (TOP) */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          <GiftsByBudget />
        </div>
      </div>

      {/* 3. Associate Brands */}
      <PremiumBrands />

      {/* 4. Promotional Gifts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Promotional Gifts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">High-quality merchandise with custom branding for your brand visibility.</p>
          </div>
          <CorporateSolutions />
        </div>
      </section>

      {/* 5. Corporate Kits & Hampers (with festive) */}
      <FeaturedHampers />

      {/* 6. Packaging Solutions */}
      <PackagingSolutions />

      {/* 7. About preview */}
      <AboutPreview />

      {/* 8. Contact CTA */}
      <CtaSection />
    </div>
  );
}
