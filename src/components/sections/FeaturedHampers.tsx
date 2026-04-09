"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

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
    image: "https://images.pexels.com/photos/3826676/pexels-photo-3826676.jpeg"
  },
  {
    id: 3,
    title: "Tech Associate Kit",
    price: "₹3,500",
    image: "https://images.pexels.com/photos/34929075/pexels-photo-34929075.jpeg"
  }
];

export function FeaturedHampers() {
  return (
    <section className="py-24 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">Featured Hampers</h2>
            <p className="text-lg text-[#1E3A5F]/70">Explore our most popular ready-to-ship business curations.</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">View All Hampers</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HAMPERS.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-72 overflow-hidden bg-[#F9FAFB]">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-[#1E3A5F]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Button variant="gold" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-bold px-8">
                    Request Quote
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{product.title}</h3>
                <p className="text-[#C9A227] font-bold text-lg">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
