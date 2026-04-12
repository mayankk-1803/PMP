"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";

const HAMPERS = [
  {
    id: 1,
    title: "Executive Diwali Hamper",
    price: "₹1,500",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Premium Welcome Kit",
    price: "₹2,200",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tech Associate Kit",
    price: "₹3,500",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/4/297186863/QF/QA/EU/27887478/employee-welcome-kit-500x500.jpg"
  }
];

export function FeaturedHampers() {
  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">Featured Curations</h2>
            <p className="text-lg text-[#1E3A5F]/70">Explore our most popular ready-to-ship business curations crafted for impact.</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex border-[#1E3A5F]/20 text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors" asChild>
            <Link href="/corporate-kits">View All Hampers</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {HAMPERS.map((product, idx) => {
            const inList = isInShortlist(product.title);
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                key={product.id}
                className="flex flex-col group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 h-full"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F9FAFB]">
                  <img 
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Save for Quote Button */}
                  <button
                    onClick={() => {
                      if (inList) {
                        removeFromShortlist(product.title);
                      } else {
                        addToShortlist({ title: product.title, price: product.price, imageUrl: product.image });
                      }
                    }}
                    className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${inList ? 'bg-[#C9A227] text-white hover:bg-[#be9823]' : 'bg-white/90 text-[#1E3A5F] hover:bg-white hover:text-[#C9A227]'}`}
                    title={inList ? "Remove from Shortlist" : "Save for Quote"}
                  >
                    {inList ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{product.title}</h3>
                  <p className="text-[#C9A227] font-bold text-lg mb-6 flex-grow">{product.price}</p>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <Button 
                      className="w-full py-6 font-bold shadow-sm" 
                      variant="outline"
                      onClick={() => {
                        if (!inList) addToShortlist({ title: product.title, price: product.price, imageUrl: product.image });
                      }}
                    >
                      {inList ? "Added to Quote List" : "Save for Quote"}
                    </Button>
                    <Button className="w-full bg-[#1E3A5F] hover:bg-[#152844] text-white py-6 shadow-md transition-all" asChild>
                      <Link href={`/enquiry?product=${encodeURIComponent(product.title)}`}>Request Quote</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
