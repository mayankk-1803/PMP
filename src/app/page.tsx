import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CorporateSolutions } from "@/components/sections/CorporateSolutions";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedHampers } from "@/components/sections/FeaturedHampers";
import { ProductMarquee } from "@/components/sections/ProductMarquee";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CorporateSolutions />
      <TrustBar />
      <HowItWorks />
      <FeaturedHampers />
      <ProductMarquee />
      <IndustriesServed />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
