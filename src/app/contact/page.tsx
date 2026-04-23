"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-white overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <SectionHeading 
            title="Contact Us" 
            subtitle="Get in touch with our team for bulk inquiries, partnerships, or any support." 
            centered 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-lg border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-red-600 mb-8">Corporate Enquiry Form</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Company Name & Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:ring-1 focus:ring-[#dc2626] transition-all" placeholder="Company Name / Your Name" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:ring-1 focus:ring-[#dc2626] transition-all" placeholder="email@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:ring-1 focus:ring-[#dc2626] transition-all" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Requirement Details</label>
                <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-[#1f2937] focus:outline-none focus:ring-1 focus:ring-[#dc2626] transition-all resize-none" placeholder="Tell us about your needs..." />
              </div>
              <Button size="lg" className="w-full rounded-lg text-sm font-bold" type="button">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>

          <div className="space-y-8 flex flex-col justify-center">
            {/* Bulk Order Section */}
            <div className=" text-black p-8 md:p-12 rounded-lg flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold mb-3 text-red-600">Bulk Order Special</h4>
                <p className="text-black text-sm mb-6 leading-relaxed">
                  Planning a large-scale gifting program? We offer exclusive pricing and dedicated management for orders above 100 units.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2.5 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Direct Line</p>
                  <p className="font-bold">+91 9818601834</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid gap-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="text-[#dc2626]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-red-600 mb-1">Corporate Office</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Digital Greens, Sector-61, Gurgaon, Haryana-122102</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex items-start gap-4">
                <div className="text-[#dc2626]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-red-600 mb-1">Email Support</h4>
                  <p className="text-gray-500 text-xs">pacmyproduct@gmail.com</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
