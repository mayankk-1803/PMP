"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Activity, HardHat, Store, UserPlus } from "lucide-react";

export default function IndustrySolutionsPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Industry-Specific Solutions" 
          subtitle="Specialized gifting options designed for the specific needs of your sector." 
          centered 
          className="mb-16"
        />

        <div className="space-y-16">
          {/* Pharma */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-800">
            <div className="w-full md:w-1/2 h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pharma Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12">
              <Activity className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Pharma & Healthcare</h3>
              <p className="text-gray-400 mb-6">Doctor engagement kits,MR (Medical Representative) starter packs, and clinic wellness hampers focusing on utility and premium feel.</p>
            </div>
          </div>

          {/* Real Estate & Engineering */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-800">
            <div className="w-full md:w-1/2 h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Engineering Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12">
              <HardHat className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Real Estate & Engineering</h3>
              <p className="text-gray-400 mb-6">Contractor loyalty programs, heavy-duty utility kits, and premium channel partner welcome gifts build to last on-site.</p>
            </div>
          </div>

          {/* Retail */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-800">
            <div className="w-full md:w-1/2 h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Retail Kits" />
            </div>
            <div className="w-full md:w-1/2 p-8 lg:p-12">
              <Store className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Retail Brand Activation</h3>
              <p className="text-gray-400 mb-6">Point-of-sale promotional items, distributor incentive boxes, and staff uniforms or festival kits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
