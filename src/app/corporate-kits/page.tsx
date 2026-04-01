"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { Briefcase, CreditCard, Box, ThumbsUp } from "lucide-react";

const KITS = [
  { title: "Employee Onboarding Kit", price: "Starts ₹1200", description: "Diary, Pen, Sipper, Welcome Card, Rigid Box.", imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop" },
  { title: "Work From Home Kit", price: "Starts ₹2000", description: "Laptop stand, wireless mouse, coffee mug, journal.", imageUrl: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=800&auto=format&fit=crop" },
  { title: "Dealer & Distributor Kit", price: "Starts ₹3500", description: "Premium backpack, power bank, VIP wallet, custom note.", imageUrl: "https://images.pexels.com/photos/6590930/pexels-photo-6590930.jpeg" },
  // { title: "Leadership Welcome Kit", price: "Starts ₹5000", description: "Leather briefcase, premium pen sets, tech accessories.", imageUrl: "https://images.unsplash.com/photo-1551634979-2b11f8c946e7?q=80&w=800&auto=format&fit=crop" },
];

export default function CorporateKitsPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Corporate Kits" 
          subtitle="Curated, branded, and ready-to-dispatch kits for every occasion. Bulk ordering available with Pan India delivery." 
          centered 
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 text-center">
            <Briefcase className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">New Hires</h3>
            <p className="text-gray-400 text-sm">Make a lasting first impression.</p>
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 text-center">
            <ThumbsUp className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Rewards</h3>
            <p className="text-gray-400 text-sm">Recognize and retain top talent.</p>
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 text-center">
            <Box className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Custom Branding</h3>
            <p className="text-gray-400 text-sm">Your logo on everything.</p>
          </div>
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 text-center">
            <CreditCard className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-2">Bulk Pricing</h3>
            <p className="text-gray-400 text-sm">Cost-effective for large teams.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KITS.map((kit, i) => (
            <ProductCard key={i} {...kit} />
          ))}
        </div>
      </div>
    </div>
  );
}
