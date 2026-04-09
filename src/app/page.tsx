import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CorporateSolutions } from "@/components/sections/CorporateSolutions";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GiftsByBudget } from "@/components/sections/GiftsByBudget";
import { PremiumBrands } from "@/components/sections/PremiumBrands";
import { FeaturedHampers } from "@/components/sections/FeaturedHampers";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { PackagingSolutions } from "@/components/sections/PackagingSolutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { BulkEnquiryForm } from "@/components/sections/BulkEnquiryForm";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CorporateSolutions />
      <WhyChooseUs />
      <GiftsByBudget />
      <PremiumBrands />
      <FeaturedHampers />
      <IndustriesServed />
      <PackagingSolutions />
      <Testimonials />
      <BulkEnquiryForm />
      <CtaSection />
    </>
  );
}
