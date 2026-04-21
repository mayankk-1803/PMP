import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Marquee } from "@/components/ui/Marquee";
import { CorporateSolutions } from "@/components/sections/CorporateSolutions";
import { FeaturedHampers } from "@/components/sections/FeaturedHampers";
import { PackagingSolutions } from "@/components/sections/PackagingSolutions";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";

import { ProductMarquee } from "@/components/sections/ProductMarquee";

const BRANDS = [
  "Adidas", "Reebok", "Rare Rabbit", "Parker", "Beardo", "Cello", "Mokobara", 
  "VIP", "JBL", "U-bon", "Borosil", "Wildcraft", "Welspun", "Blue Pond", 
  "Boat", "Philips", "Aiwa"
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* 2. Trusted Brands Marquee */}
      <section className="py-12 bg-white">
        <Marquee duration={30} fadeColor="white" fadeWidth="w-32">
          {BRANDS.map((brand, idx) => (
            <div key={idx} className="mx-12 cursor-default flex items-center justify-center">
              <span className="text-gray-400 font-bold tracking-widest text-lg md:text-xl grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 uppercase">
                {brand}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* 3. Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Promotional Gifts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">High-quality merchandise with custom branding for your brand visibility.</p>
          </div>
          <CorporateSolutions />
        </div>
      </section>

      {/* 4. Corporate Kits & Hampers Section */}
      {/* 5. Occasion-Based Hampers Section */}
      <FeaturedHampers />

      <ProductMarquee />

      {/* 7. Packaging Solutions Preview */}
      <PackagingSolutions />

      {/* 8. CTA Section (Bulk Enquiry) */}
      <CtaSection />
      
      {/* Supplemental Sections */}
      <HowItWorks />
      <IndustriesServed />
      <Testimonials />
    </div>
  );
}
