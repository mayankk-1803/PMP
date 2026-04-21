"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";

const MARQUEE_PRODUCTS = [
  { id: 1, title: "Custom Ceramic Mug", price: "₹199", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Premium Welcome Kit", price: "₹2,200", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "Executive Box", price: "₹1,850", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80" },
  { id: 4, title: "Premium Sipper & Diary", price: "₹850", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80" },
  { id: 5, title: "Tech Organizer", price: "₹1800", img: "https://tse4.mm.bing.net/th/id/OIP.k_Pte09bpvs0sjamLxcKiwHaEo?pid=Api&h=220&P=0" },
  { id: 6, title: "Eco-Friendly Kit", price: "₹1,400", img: "https://images.unsplash.com/photo-1511269524056-bb9bc54b9d03?auto=format&fit=crop&w=400&q=80" },
];

export function ProductMarquee() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden max-w-full">
      <div className="relative overflow-hidden">
        <div className="flex gap-6 md:gap-8 animate-marquee-slow w-max hover:[animation-play-state:paused] items-center px-4 group">
          {[...MARQUEE_PRODUCTS, ...MARQUEE_PRODUCTS].map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="flex bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all w-[280px] h-[100px]"
            >
              <div className="w-[100px] h-full flex-shrink-0 bg-gray-100 relative">
                <Image 
                  src={product.img} 
                  alt={product.title} 
                  fill
                  className="object-cover" 
                  unoptimized
                />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-center">
                <h4 className="font-bold text-red-600 text-[13px] leading-tight mb-1 line-clamp-2">
                  {product.title}
                </h4>
                <p className="text-gray-500 font-semibold text-xs mb-2">
                  {product.price}
                </p>
                <div className="mt-auto">
                  <Button variant="outline" size="sm" className="h-7 px-3 text-[10px] uppercase font-bold" asChild>
                    <Link href={`/enquiry?product=${encodeURIComponent(product.title)}`}>Add Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Edge Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
