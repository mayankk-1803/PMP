"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { CheckCircle2 } from "lucide-react";

export default function EnquiryPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0A0A0A] min-h-screen">
      <BackgroundGradient />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionHeading 
            title="Request a Custom Quote" 
            subtitle="Tell us about your gifting requirements and our experts will craft the perfect solution." 
            centered 
            className="mb-0"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 bg-[#141414] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          {/* Form Side */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">Project Details</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input type="text" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Company</label>
                  <input type="text" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Company Name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Contact</label>
                  <input type="email" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="work@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  <input type="tel" className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+91" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t border-gray-800 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Estimated Quantity</label>
                  <select className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>50 - 100</option>
                    <option>100 - 500</option>
                    <option>500 - 2000</option>
                    <option>2000+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Budget Per Box (₹)</label>
                  <select className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Under ₹500</option>
                    <option>₹500 - ₹1000</option>
                    <option>₹1000 - ₹2500</option>
                    <option>Premium (₹2500+)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Specific Requirements</label>
                <textarea rows={4} className="w-full bg-[#0F0F0F] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about the occasion, target audience, and preferred items..." />
              </div>

              <Button variant="gradient" size="lg" className="w-full" type="button">
                Submit Enquiry
              </Button>
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-2 bg-[#1A1A1A] p-8 md:p-12 border-l border-gray-800">
            <h3 className="text-xl font-bold mb-6">What happens next?</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-primary mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Expert Consultation</h4>
                  <p className="text-gray-400 text-sm">Our gifting expert will contact you within 24 hours to deeply understand your requirement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-primary mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Custom Mockups</h4>
                  <p className="text-gray-400 text-sm">Receive a tailored presentation with product mockups featuring your brand logo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-primary mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Sample Approval</h4>
                  <p className="text-gray-400 text-sm">Physical samples are dispatched for your final review before bulk production begins.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#0F0F0F] rounded-xl border border-gray-800 text-center">
              <h4 className="font-semibold text-white mb-2">Need Immediate Support?</h4>
              <p className="text-primary font-bold text-lg">+91 98765xxxxx</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
