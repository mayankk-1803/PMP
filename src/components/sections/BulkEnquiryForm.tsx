"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Send, CheckCircle2, Loader2, AlertCircle, Package } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";

export function BulkEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { items } = useShortlist();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let finalPayload: any = { ...data };
    if (items.length > 0) {
      finalPayload.shortlist = items;
    }

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
      } else {
        setErrorMessage(result.message || "Failed to send enquiry. Please try again.");
        setStatus("error");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to send enquiry. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="py-24 bg-[#F9FAFB] border-t border-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E3A5F]">Get a Custom Quote</h2>
            <p className="text-[#1E3A5F]/70 text-lg mb-10 leading-relaxed font-medium">
              Planning a bulk requirement? Share your details below. Our corporate gifting experts will get back to you within 2-4 business hours with custom curations and pricing.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#1E3A5F]">
                <span className="w-10 h-10 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F] flex items-center justify-center font-bold">1</span>
                <span className="font-semibold text-lg">Tell us your requirements</span>
              </div>
              <div className="flex items-center gap-4 text-[#1E3A5F]">
                <span className="w-10 h-10 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F] flex items-center justify-center font-bold">2</span>
                <span className="font-semibold text-lg">Get a curated proposal</span>
              </div>
              <div className="flex items-center gap-4 text-[#1E3A5F]">
                <span className="w-10 h-10 rounded-full bg-[#1E3A5F]/5 text-[#1E3A5F] flex items-center justify-center font-bold">3</span>
                <span className="font-semibold text-lg">Approve and track your order</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-gray-100 text-[#1E3A5F] relative min-h-[600px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-28 h-28 bg-[#1E3A5F]/5 rounded-full flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#C9A227]" />
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-extrabold mb-4 text-[#1E3A5F] tracking-tight"
                  >
                    Your enquiry has been submitted successfully!
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#1E3A5F]/70 mb-10 max-w-md mx-auto text-lg font-medium"
                  >
                    Our team will contact you shortly to discuss your custom curation and pricing.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setStatus("idle")}
                      className="px-8 py-4 rounded-full border-gray-200 hover:border-[#1E3A5F] text-[#1E3A5F]"
                    >
                      Submit Another Enquiry
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {items.length > 0 && (
                    <div className="mb-6 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-[#C9A227]" />
                        <span className="text-sm font-bold text-[#1E3A5F]">Your shortlist contains {items.length} item(s):</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item, idx) => (
                          <span key={idx} className="bg-white px-2 py-1 rounded-md text-xs font-semibold text-[#1E3A5F] shadow-sm border border-gray-100">
                            {item.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-[#1E3A5F]">Full Name *</label>
                        <input required type="text" id="name" name="name" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all font-medium" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-bold text-[#1E3A5F]">Company Name *</label>
                        <input required type="text" id="company" name="company" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all font-medium" placeholder="Acme Corp" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-[#1E3A5F]">Work Email *</label>
                        <input required type="email" id="email" name="email" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all font-medium" placeholder="john@acmecorp.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-[#1E3A5F]">Phone Number *</label>
                        <input required type="tel" id="phone" name="phone" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all font-medium" placeholder="+91 98765 43210" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="quantity" className="text-sm font-bold text-[#1E3A5F]">Units *</label>
                        <select required id="quantity" name="quantity" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all appearance-none cursor-pointer font-medium">
                          <option value="">Select</option>
                          <option value="50-100">50 - 100</option>
                          <option value="101-500">101 - 500</option>
                          <option value="501-1000">501 - 1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="budget" className="text-sm font-bold text-[#1E3A5F]">Per Kit Budget</label>
                        <select id="budget" name="budget" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all appearance-none cursor-pointer font-medium">
                          <option value="">Select</option>
                          <option value="Under ₹1000">Under ₹1000</option>
                          <option value="₹1000-₹2500">₹1000-₹2500</option>
                          <option value="₹2500+">₹2500+</option>
                        </select>
                      </div>
                      <div className="space-y-2 col-span-1">
                        <label htmlFor="deliveryLocation" className="text-sm font-bold text-[#1E3A5F]">Delivery To *</label>
                        <select required id="deliveryLocation" name="deliveryLocation" className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all appearance-none cursor-pointer font-medium">
                          <option value="">Select</option>
                          <option value="Single Location">Single Office</option>
                          <option value="Multiple Locations">Multiple Offices</option>
                          <option value="Direct to Employees">Home Deliveries</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-[#1E3A5F]">Additional Details</label>
                      <textarea id="message" name="message" rows={3} className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all resize-none font-medium" placeholder="Tell us about the occasion, preferred items, or any specific branding requests..."></textarea>
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 border border-red-100 rounded-xl text-sm font-medium">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="default" 
                      className="w-full py-4 text-lg font-bold"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Get Custom Quote <Send className="ml-2 w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
