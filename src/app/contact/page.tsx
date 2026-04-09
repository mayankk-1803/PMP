"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-[#F9FAFB]">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Contact Us" 
          subtitle="Reach out to our team for partnerships, press, or general inquiries." 
          centered 
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl"
          >
            <h3 className="text-3xl font-extrabold text-[#1E3A5F] mb-8">Get in Touch</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1E3A5F]">First Name</label>
                  <input type="text" className="w-full bg-[#F1F5F9] border border-gray-200 rounded-xl px-4 py-3 text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all font-medium" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1E3A5F]">Last Name</label>
                  <input type="text" className="w-full bg-[#F1F5F9] border border-gray-200 rounded-xl px-4 py-3 text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all font-medium" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1E3A5F]">Email Address</label>
                <input type="email" className="w-full bg-[#F1F5F9] border border-gray-200 rounded-xl px-4 py-3 text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all font-medium" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1E3A5F]">Message</label>
                <textarea rows={5} className="w-full bg-[#F1F5F9] border border-gray-200 rounded-xl px-4 py-3 text-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all resize-none font-medium" placeholder="How can we help you?" />
              </div>
              <Button variant="default" size="lg" className="w-full py-6 text-lg rounded-xl" type="button">
                Send Message
              </Button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#1E3A5F]">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-xl text-[#1E3A5F] mb-2">Corporate Office</h4>
                <p className="text-[#1E3A5F]/70 font-medium leading-relaxed">Digital Greens, A-6-014, 6th Floor Tower A, Golf Course Extn. Road, Sector-61, Gurgaon, Haryana-122102</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#1E3A5F]">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-xl text-[#1E3A5F] mb-2">Phone</h4>
                <p className="text-[#1E3A5F]/70 font-medium">+91 9818601834</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#F1F5F9] p-4 rounded-xl text-[#1E3A5F]">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-xl text-[#1E3A5F] mb-2">Email</h4>
                <p className="text-[#1E3A5F]/70 font-medium">pacmyproduct@gmail.com</p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
