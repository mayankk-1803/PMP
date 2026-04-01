"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <BackgroundGradient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Contact Us" 
          subtitle="Reach out to our team for partnerships, press, or general inquiries." 
          centered 
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">First Name</label>
                  <input type="text" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Last Name</label>
                  <input type="text" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea rows={5} className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can we help you?" />
              </div>
              <Button variant="gradient" className="w-full" type="button">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Corporate Office</h4>
                <p className="text-gray-400">Digital Greens, A-6-014, 6th Floor Tower A, Golf Course Extn. Road, Sector-61, Gugaon, Haryana-122102</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Phone</h4>
                <p className="text-gray-400">91 9818601834</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Email</h4>
                <p className="text-gray-400">pacmyproduct@gmail.com</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
