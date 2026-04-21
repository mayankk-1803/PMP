"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { CheckCircle2, Loader2, Send, Package } from "lucide-react";
import { useShortlist } from "@/context/ShortlistContext";

function EnquiryFormContainer() {
  const searchParams = useSearchParams();
  const singleProduct = searchParams.get("product");
  const isShortlistSource = searchParams.get("source") === "shortlist";
  
  const { items } = useShortlist();
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Attach shortlist items to API payload if applicable
    let finalPayload: any = { ...data };
    if (isShortlistSource && items.length > 0) {
      finalPayload.shortlist = items;
    } else if (singleProduct) {
      finalPayload.shortlist = [{ title: singleProduct }];
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
    <div className="lg:col-span-3 p-8 md:p-12 relative min-h-[600px]">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle2 className="w-16 h-16 text-gray-900" />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Request Submitted Successfully!
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg mb-10 max-w-md font-medium leading-relaxed"
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
                size="lg" 
                onClick={() => setStatus("idle")}
                className="px-8"
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
          >
            <div className="mb-8 border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Project Details</h3>
              
              {/* Product Context Badges */}
              {isShortlistSource && items.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-900" />
                    <span className="text-sm font-bold text-gray-700">Requesting Quote for {items.length} item(s):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span key={item.title} className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-600 border border-gray-200 shadow-sm">
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {singleProduct && !isShortlistSource && (
                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4 inline-flex items-center gap-2">
                   <Package className="w-4 h-4 text-gray-900" />
                   <span className="text-sm font-bold text-gray-700">Requesting Quote for: </span>
                   <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-600 border border-gray-200 shadow-sm">
                     {singleProduct}
                   </span>
                 </div>
              )}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Name *</label>
                  <input required name="name" type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Company *</label>
                  <input required name="company" type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium" placeholder="Company Name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Contact *</label>
                  <input required name="email" type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium" placeholder="work@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number *</label>
                  <input required name="phone" type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium" placeholder="+91" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Estimated Quantity *</label>
                  <select required name="quantity" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all appearance-none font-medium cursor-pointer">
                    <option value="">Select Quantity</option>
                    <option value="50 - 100">50 - 100</option>
                    <option value="100 - 500">100 - 500</option>
                    <option value="500 - 2000">500 - 2000</option>
                    <option value="2000+">2000+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Budget Per Box (₹)</label>
                  <select name="budget" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all appearance-none font-medium cursor-pointer">
                    <option value="">Not Specified</option>
                    <option value="Under ₹500">Under ₹500</option>
                    <option value="₹500 - ₹1000">₹500 - ₹1000</option>
                    <option value="₹1000 - ₹2500">₹1000 - ₹2500</option>
                    <option value="Premium (₹2500+)">Premium (₹2500+)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Delivery To *</label>
                <select required name="deliveryLocation" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all appearance-none font-medium cursor-pointer">
                  <option value="">Select Protocol</option>
                  <option value="Single Location">Single Office Building</option>
                  <option value="Multiple Locations">Multiple Branches</option>

                  <option value="Direct to Employee Home">Direct to Employee Homes</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Specific Requirements</label>
                <textarea name="message" rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all resize-none font-medium" placeholder="Tell us about the occasion, target audience, and preferred items..." />
              </div>

              {status === "error" && (
                <div className="text-red-600 font-bold bg-gray-50 p-3 rounded-lg text-sm border border-gray-200">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full py-6 text-lg rounded-xl flex items-center justify-center gap-2 transition-all bg-red-600 hover:bg-red-700 text-white" 
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Enquiry <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  We typically respond within 2-4 business hours.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen overflow-hidden max-w-full">
      <BackgroundGradient />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionHeading 
            title="Request a Custom Quote"
            subtitle="Tell us about your gifting requirements and our experts will craft the perfect solution." 
            centered 
            className="mb-0"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
        >
          {/* Wrap form area in Suspense so useSearchParams doesn't block build */}
          <Suspense fallback={
            <div className="lg:col-span-3 p-8 md:p-12 flex items-center justify-center min-h-[600px]">
              <Loader2 className="w-10 h-10 animate-spin text-red-600" />
            </div>
          }>
            <EnquiryFormContainer />
          </Suspense>

          {/* Info Side */}
          <div className="lg:col-span-2  p-8 md:p-12 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 text-red-600">What happens next?</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-gray-400 mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-red-600 mb-1 tracking-wide text-lg">Expert Consultation</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Our gifting expert will contact you within 24 hours to deeply understand your requirement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-gray-400 mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-red-600 mb-1 tracking-wide text-lg">Custom Mockups</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Receive a tailored presentation with product mockups featuring your brand logo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-gray-400 mt-1"><CheckCircle2 className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-red-600 mb-1 tracking-wide text-lg">Sample Approval</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Physical samples are dispatched for your final review before bulk production begins.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-2 rounded-lg"><Send className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Our Office</p>
                  <p className="text-sm font-medium leading-relaxed">Digital Greens, Tower A, Sector-61,<br/>Gurgaon, Haryana-122102</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-2 rounded-lg"><Send className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-sm font-bold">pacmyproduct@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-600 p-2 rounded-lg"><Send className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-sm font-bold">+91 9818601834</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
