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
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="bg-gray-900 p-2 rounded-lg transition-colors shadow-sm">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-red-600">
                PACMYPRODUCT
              </span>
            </Link>
            
            <div className="space-y-4 text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 flex-shrink-0 text-gray-400 mt-0.5" />
                <p>Digital Greens, Tower A, Sector-61, Gurgaon, Haryana-122102</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <p>+91 9818601834</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <p>pacmyproduct@gmail.com</p>
              </div>
            </div>
            
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-red-600 mb-6 tracking-widest uppercase text-[10px]">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-gray-50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Pacmyproduct. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
