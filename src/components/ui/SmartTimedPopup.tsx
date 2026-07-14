"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Send, Building2, User, Mail, Phone, ShoppingBag, HelpCircle, Gift } from "lucide-react";
import { useProductPreview } from "@/context/ProductPreviewContext";

export function SmartTimedPopup() {
  const pathname = usePathname();
  const { isOpen: isPreviewOpen } = useProductPreview();

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    requirements: ""
  });

  // Searchable Select States for Quantity selection
  const [showQtyDropdown, setShowQtyDropdown] = useState(false);
  const [qtySearch, setQtySearch] = useState("");
  const qtyDropdownRef = useRef<HTMLDivElement>(null);

  const qtyOptions = useMemo(() => ["50 - 100", "100 - 500", "500 - 2000", "2000+"], []);
  
  const filteredQtyOptions = useMemo(() => {
    return qtyOptions.filter((opt) => opt.toLowerCase().includes(qtySearch.toLowerCase()));
  }, [qtyOptions, qtySearch]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Must NOT show on Admin routes
    if (pathname?.startsWith("/87564/admin")) return;

    const popupShown = sessionStorage.getItem("popupShown");
    const popupDismissed = sessionStorage.getItem("popupDismissed");
    const enquirySubmitted = sessionStorage.getItem("enquirySubmitted");

    if (popupShown === "true" || popupDismissed === "true" || enquirySubmitted === "true") {
      return;
    }

    // Set 40-second timer
    const timer = setTimeout(() => {
      if (isPreviewOpen) {
        return;
      }
      setIsOpen(true);
      sessionStorage.setItem("popupShown", "true");
    }, 40000);

    return () => clearTimeout(timer);
  }, [pathname, isPreviewOpen]);

  // Auto-hide the widget if Product Preview opens while popup is active
  useEffect(() => {
    if (isPreviewOpen && isOpen) {
      setIsOpen(false);
      sessionStorage.setItem("popupDismissed", "true");
    }
  }, [isPreviewOpen, isOpen]);

  // Handle ESC close key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Non-blocking Click Outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      // Dismiss if click is outside the main popup card
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleDismiss();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Click outside listener for the custom quantity dropdown
  useEffect(() => {
    if (!showQtyDropdown) return;
    const clickOutsideDropdown = (e: MouseEvent) => {
      if (qtyDropdownRef.current && !qtyDropdownRef.current.contains(e.target as Node)) {
        setShowQtyDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideDropdown);
    return () => document.removeEventListener("mousedown", clickOutsideDropdown);
  }, [showQtyDropdown]);

  // Focus trapping for Accessibility
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem("popupDismissed", "true");
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Textarea auto-resize (Min 100px, Max 180px)
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 100), 180)}px`;
    handleChange(e);
  }, [handleChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.phone.trim() || !form.quantity) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      quantity: form.quantity,
      budget: "Not Specified",
      deliveryLocation: "Domestic Office Dispatch",
      shortlist: [{ title: "Premium Gifting Consultation Widget Request" }],
      message: `--- Corporate Gifting Requirements ---\n${form.requirements || "No specifications detailed."}`
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then((r) => r.json());

      if (res.success) {
        setStatus("success");
        sessionStorage.setItem("enquirySubmitted", "true");
        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      } else {
        setErrorMsg(res.message || "Failed to submit request. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, x: -120, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -80, y: 20, scale: 0.94 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-40 bg-gradient-to-br from-[#FFFDF8] to-[#FFF9F2] p-6 text-[#2B2B2B] shadow-2xl border border-[#F5C2C2] rounded-[32px] text-left flex flex-col overflow-hidden bottom-8 left-24 w-[460px] max-h-[85vh] max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:max-h-[80vh] scrollbar-thin backdrop-blur-md"
        >
          
          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-[#D32F2F] border border-gray-150 transition-all duration-200 hover:scale-105 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {status === "success" ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-black text-gray-900">Thank You!</h3>
              <p className="text-sm text-gray-600 font-semibold max-w-xs">
                Our gifting expert will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎁</span>
                  <h3 className="text-lg font-black text-[#D32F2F] tracking-tight">
                    Get Instant Corporate Quote
                  </h3>
                </div>
                <p className="text-xs text-[#6B6B63] font-semibold mt-1">
                  Need help choosing the perfect corporate gifts? Our gifting experts will contact you shortly.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Name */}
                <label className="block text-xs font-black text-[#C62828] uppercase tracking-wider">
                  Your Name *
                  <div className="relative mt-1 group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                    <input 
                      required
                      type="text" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-4 h-12 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F]"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                </label>

                {/* Company Name */}
                <label className="block text-xs font-black text-[#C62828] uppercase tracking-wider">
                  Company Name *
                  <div className="relative mt-1 group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                    <input 
                      required
                      type="text" 
                      name="company" 
                      value={form.company} 
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-4 h-12 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F]"
                      placeholder="e.g. Google India"
                    />
                  </div>
                </label>

                {/* Company Email */}
                <label className="block text-xs font-black text-[#C62828] uppercase tracking-wider">
                  Company Email *
                  <div className="relative mt-1 group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                    <input 
                      required
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-4 h-12 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F]"
                      placeholder="e.g. corporate@company.com"
                    />
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Phone */}
                  <label className="block text-xs font-black text-[#C62828] uppercase tracking-wider">
                    Mobile Number *
                    <div className="relative mt-1 group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                      <input 
                        required
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-4 h-12 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F]"
                        placeholder="10-digit number"
                      />
                    </div>
                  </label>

                  {/* Searchable Quantity Selection */}
                  <div className="block text-xs font-black text-[#C62828] uppercase tracking-wider relative" ref={qtyDropdownRef}>
                    Required Quantity *
                    <div className="relative mt-1 group cursor-pointer" onClick={() => setShowQtyDropdown(!showQtyDropdown)}>
                      <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                      <input 
                        required
                        readOnly
                        type="text"
                        name="quantity"
                        value={form.quantity}
                        className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-8 h-12 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F] cursor-pointer"
                        placeholder="Select Quantity..."
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                    </div>

                    {showQtyDropdown && (
                      <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-[#F5C2C2] rounded-xl shadow-xl z-50 overflow-hidden max-h-48 flex flex-col p-1.5">
                        <input
                          type="text"
                          value={qtySearch}
                          onChange={(e) => setQtySearch(e.target.value)}
                          placeholder="Search..."
                          className="w-full rounded-lg border border-[#F5C2C2] px-2 py-1.5 mb-1.5 text-xs focus:outline-none text-gray-800"
                        />
                        <div className="overflow-y-auto flex-1 space-y-0.5 scrollbar-thin">
                          {filteredQtyOptions.length > 0 ? (
                            filteredQtyOptions.map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => {
                                  setForm((prev) => ({ ...prev, quantity: opt }));
                                  setShowQtyDropdown(false);
                                  setQtySearch("");
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-red-50 hover:text-[#D32F2F] transition-colors"
                              >
                                {opt} units
                              </button>
                            ))
                          ) : (
                            <div className="text-center text-xs text-gray-400 py-2">No option matches</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Requirements Textarea */}
                <label className="block text-xs font-black text-[#C62828] uppercase tracking-wider">
                  Gifting Requirements
                  <div className="relative mt-1 group">
                    <HelpCircle className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#D32F2F] transition-colors" />
                    <textarea 
                      name="requirements"
                      value={form.requirements}
                      onChange={handleTextareaChange}
                      className="w-full rounded-xl border border-[#F5C2C2] bg-white pl-10 pr-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#D32F2F] transition-all hover:border-[#D32F2F]"
                      style={{ minHeight: "100px", maxHeight: "180px" }}
                      placeholder="e.g. Diwali Hampers, Tech Kits (Budget, Custom logo, etc.)"
                    />
                  </div>
                </label>
              </div>

              {errorMsg && (
                <div className="text-xs font-bold text-red-700 bg-red-50 p-2.5 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button 
                  type="button" 
                  onClick={handleDismiss}
                  className="flex-1 rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] hover:bg-[#FAF9F6] text-xs font-black text-[#C62828] py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all text-center cursor-pointer uppercase tracking-wider"
                >
                  Maybe Later
                </button>
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-red-500 hover:to-red-600 text-xs font-black text-white py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Requesting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 animate-pulse" /> Request Quote
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
