import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COMPANY SECTION */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl tracking-tight text-red-600">
                PACMYPRODUCTS
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Your premier partner for premium corporate gifting, industry-specific kits, and custom packaging solutions.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "Corporate Kits & Hampers", href: "/corporate-kits" },
                { name: "Packaging Solutions", href: "/packaging-solutions" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Services</h3>
            <ul className="space-y-4">
              {[
                { name: "Promotional Gifts", href: "/products" },
                { name: "Corporate Kits", href: "/corporate-kits" },
                { name: "Festive Hampers", href: "/corporate-kits" },
                { name: "Packaging Solutions", href: "/packaging-solutions" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span>+91 9818601834</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="break-all">pacmyproduct@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Digital Greens, Tower A, Sector-61, Gurgaon, Haryana-122102</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 PACMYPRODUCTS — All rights reserved
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
