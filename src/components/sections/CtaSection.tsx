"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden border border-gray-100"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
              Looking for a custom gifting partner?
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We help you curate memorable hampers within your budget. Let's discuss your custom gifting needs today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-lg text-sm px-10 bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/enquiry">
                  Get a Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-lg text-sm px-10 flex items-center justify-center gap-2 border-gray-200" asChild>
                <a href="https://wa.me/919818601834" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
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
