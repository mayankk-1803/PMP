"use client";

import React from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ProductCard } from "../ui/ProductCard";

const HAMPERS = [
  {
    id: 1,
    title: "Executive Diwali Hamper",
    price: "₹1,500",
    description: "Premium festive collection with gourmet treats and handcrafted items.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Premium Welcome Kit",
    price: "₹2,200",
    description: "Complete onboarding solution for new hires with brand-aligned essentials.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tech Associate Kit",
    price: "₹3,500",
    description: "High-performance tech accessories curated for the modern professional.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&auto=format&fit=crop"
  }
];

export function FeaturedHampers() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-3 block">Bestselling Curations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Occasion Hampers</h2>
            <p className="text-lg text-gray-600">Explore our most popular business curations crafted for lasting professional impact.</p>
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex rounded-lg border-gray-200" asChild>
            <Link href="/festive-gifting">View All Hampers</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HAMPERS.map((hamper, idx) => (
            <ProductCard
              key={hamper.id}
              title={hamper.title}
              price={hamper.price}
              imageUrl={hamper.image}
              description={hamper.description}
              index={idx}
            />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Button variant="outline" className="w-full rounded-lg border-gray-200" asChild>
            <Link href="/festive-gifting">View All Hampers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
