"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Palette, CheckCircle2 } from "lucide-react";

export function CustomizationPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-red-600 mb-6">See Your Brand Come to Life</h2>
            <p className="text-lg text-gray-600 mb-8">
              We offer comprehensive customization options from elegant UV printing to subtle screen debossing. Simply upload your logo and our design team will render high-fidelity mockups for your approval.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Upload />, title: "Upload Logo", desc: "Share your brand assets in hi-res format." },
                { icon: <Palette />, title: "Visual Mockups", desc: "Review how your brand looks on selected products." },
                { icon: <CheckCircle2 />, title: "Production", desc: "Once approved, bulk branding commences immediately." },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-900 border border-gray-100 shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-red-600">{step.title}</h4>
                    <p className="text-gray-600 font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* Abstract UI Mockup */}
            <div className="relative w-full max-w-md bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-2xl flex flex-col items-center">
              {/* Fake Browser/App Header */}
              <div className="w-full flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-100"></div>
                </div>
                <div className="text-xs font-semibold text-gray-400">Branding Preview</div>
              </div>

              {/* Upload Dropzone UI */}
              <div className="w-full border-2 border-dashed border-gray-300 bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors mb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-4" />
                <p className="font-semibold text-gray-900">Drop Your Logo Here</p>
                <p className="text-xs text-gray-500 mt-1">PNG, SVG or AI up to 10MB</p>
              </div>

              {/* Fake Product Preview */}
              <div className="w-full bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-50 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-100 text-gray-900 text-xs px-2 py-1 rounded font-bold">READY</div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const Package = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)
