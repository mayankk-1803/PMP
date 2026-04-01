"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Award, Truck, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="About Pacmyproduct" 
          subtitle="We are India's premier B2B partner for corporate gifting and packaging solutions." 
          centered 
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Delivering expressions of appreciation across the nation.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Founded on the principle that every gift should tell a story, Pacmyproduct manages the entire lifecycle of corporate gifting. From curating high-quality products from premium brands to manufacturing custom packaging that wows your recipients, we handle it all.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you need 50 executive kits for your leadership team or 50,000 festive hampers distributed directly to employee homes across India, our state-of-the-art logistics and fulfillment ensure your corporate gifting is completely stress-free.
            </p>
            <div className="pt-4">
              <Link href="/enquiry">
                <Button variant="gradient">Partner With Us</Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-gray-800">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop" alt="Team Packing Gifts" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { metric: "15+ Years", label: "Experience", icon: <Award className="w-8 h-8"/> },
            { metric: "Pan India", label: "Fulfillment", icon: <Truck className="w-8 h-8"/> },
            { metric: "Premium", label: "Brand Partnerships", icon: <ShieldCheck className="w-8 h-8"/> },
            { metric: "100k+", label: "Smiles Delivered", icon: <Users className="w-8 h-8"/> },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8 text-center">
              <div className="text-primary mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.metric}</div>
              <div className="text-gray-400 uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
