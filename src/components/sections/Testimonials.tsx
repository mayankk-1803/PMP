"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "PacMyProduct transformed our onboarding process. The premium quality of the welcome kits really WOWs our new hires.",
    author: "Rohan K.",
    company: "HR Director, TechLogix"
  },
  {
    quote: "We needed 500 custom Diwali hampers delivered across India. They handled the logistics flawlessly and the branding was spot on.",
    author: "Sneha P.",
    company: "Marketing Head, ElevateBrand"
  },
  {
    quote: "Top-notch customer service and the ability to customize every detail sets them apart from the standard corporate gifting sites.",
    author: "Aman S.",
    company: "Founder, Zenith Solutions"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-[#1E3A5F]"
        >
          Partner Success Stories
        </motion.h2>
        
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-gray-100">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            loop={true}
            className="pb-16"
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
                  <Quote className="w-12 h-12 text-[#C9A227] mb-8 opacity-80" />
                  <p className="text-xl md:text-2xl font-semibold italic mb-8 text-[#1E3A5F]/80 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-[#1E3A5F] text-lg">{testimonial.author}</h4>
                    <p className="text-[#C9A227] font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #1E3A5F !important;
          opacity: 0.1 !important;
          width: 10px !important;
          height: 10px !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #1E3A5F !important;
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
