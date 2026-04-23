"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const BRANDS = [
  { name: "Adidas", logo: "/logos/adidas.jpg" },
  { name: "Reebok", logo: "/logos/reebok.png" },
  { name: "Rare Rabbit", logo: "/logos/rarerabit.png" },
  { name: "Parker", logo: "/logos/parker.png" },
  { name: "Beardo", logo: "/logos/beardo.png" },
  { name: "Cello", logo: "/logos/cello.png" },
  { name: "Mokobara", logo: "/logos/mokobara.png" },
  { name: "JBL", logo: "/logos/jbl.png" },
  { name: "U-bon", logo: "/logos/ubon.webp" },
  { name: "Borosil", logo: "/logos/borosil.png" },
  { name: "Wildcraft", logo: "/logos/wildcraft.png" },
  { name: "Welspun", logo: "/logos/welspun.png" },
  { name: "Boat", logo: "/logos/boat.png" },
  { name: "Philips", logo: "/logos/philips.png" },
  { name: "Aiwa", logo: "/logos/aiwa.png" },
];

export function PremiumBrands() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Trusted by <span className="text-red-600">Leading Brands</span>
          </h2>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-12 md:gap-16 items-center justify-items-center mb-16">
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-16 md:h-20"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={160}
                height={80}
                className="object-contain w-auto h-full"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center border-t border-gray-100 pt-16">
          <p className="text-lg text-gray-600 mb-6">
            Looking for branded corporate gifts?
          </p>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 h-auto rounded-lg font-semibold text-base transition-all shadow-lg shadow-red-100"
            asChild
          >
            <Link href="/enquiry">Get Custom Quote</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}