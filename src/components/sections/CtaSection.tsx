"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#F8FAFC] via-[#EEF2F6] to-[#E2E8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1E3A5F] rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227] rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A227] rounded-full filter blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Looking for the perfect corporate gifting partner?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              We help you curate memorable hampers within your budget. Let's discuss your custom gifting needs today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="gold" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full font-bold" asChild>
                <Link href="/enquiry">
                  Get Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-white text-white hover:bg-white hover:text-[#1E3A5F] transition-colors flex items-center justify-center gap-2" asChild>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
