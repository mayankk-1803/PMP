import React from "react";
import Link from "next/link";
import { Gift, Mail, Phone, Globe } from "lucide-react";

const footerLinks = [
  {
    title: "Categories",
    links: [
      { name: "Corporate Kits", href: "/corporate-kits" },
      { name: "Festive Gifting", href: "/festive-gifting" },
      { name: "Promotional Merchandise", href: "/promotional-merchandise" },
      { name: "Industry Solutions", href: "/industry-solutions" },
      { name: "Packaging Solutions", href: "/packaging-solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Gallery", href: "/gallery" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Request Quote", href: "/enquiry" },
    ],
  },
  {
    title: "Budget",
    links: [
      { name: "Under ₹250", href: "/gifts-by-budget" },
      { name: "₹250 - ₹500", href: "/gifts-by-budget" },
      { name: "₹500 - ₹1000", href: "/gifts-by-budget" },
      { name: "₹1000 - ₹2500", href: "/gifts-by-budget" },
      { name: "Premium (₹2500+)", href: "/gifts-by-budget" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                PACMYPRODUCT
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              End-to-End Corporate Gifting Solutions in India. Bulk orders, custom branding, and premium quality delivery across the nation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-primary transition-all">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-primary transition-all">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-primary transition-all">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pacmyproduct. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
