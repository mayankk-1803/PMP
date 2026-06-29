"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Bookmark, ArrowRight, ArrowLeft, ShieldCheck, 
  ChevronRight, Sparkles, Box, Check, ClipboardList,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useShortlist } from "@/context/ShortlistContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { ProductCard } from "@/components/ui/ProductCard";

interface CatalogProduct {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  moq: number;
  price?: number;
}

const toSpecs = (product: CatalogProduct) =>
  Object.entries(product.specifications || {}).map(([label, value]) => ({ label, value: String(value) }));

const toDetailProduct = (product: CatalogProduct) => ({
  ...product,
  basePrice: product.category === "packaging" ? 45 : 650,
  specs: toSpecs(product),
  customizations: product.features.length > 0 ? product.features : ["Logo branding", "Custom packaging"],
  packagings: ["Premium Gift Box", "Bulk Shipper", "Custom Sleeve"],
});

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<ReturnType<typeof toDetailProduct> | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(50);
  const [selectedBranding, setSelectedBranding] = useState("Logo branding");
  const [selectedPackaging, setSelectedPackaging] = useState("Premium Gift Box");

  const { addToShortlist, removeFromShortlist, isInShortlist } = useShortlist();
  const isShortlisted = product ? isInShortlist(product.title) : false;

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      const productResponse = await fetch(`/api/catalog/products/${slug}`);
      const productResult = await productResponse.json();
      const productsResponse = await fetch("/api/catalog/products");
      const productsResult = await productsResponse.json();

      if (!active || !productResult.success) return;
      const nextProduct = toDetailProduct(productResult.data);
      setProduct(nextProduct);
      setActiveImage(nextProduct.images[0]);
      setQuantity(nextProduct.moq);
      setSelectedBranding(nextProduct.customizations[0]);
      setSelectedPackaging(nextProduct.packagings[0]);
      const allItems = productsResult.data ?? [];
      // 1. Same subcategory (e.g. Table Mats)
      let related = allItems.filter(
        (item: CatalogProduct) => item.slug !== slug && item.subcategory === nextProduct.subcategory
      );
      
      // 2. Same parent category (e.g. Table Top)
      if (related.length < 4) {
        const sameCat = allItems.filter(
          (item: CatalogProduct) => 
            item.slug !== slug && 
            item.category === nextProduct.category && 
            item.subcategory !== nextProduct.subcategory &&
            !related.some((r: CatalogProduct) => r.slug === item.slug)
        );
        related = [...related, ...sameCat];
      }

      // 3. Other promotional products
      if (related.length < 4) {
        const otherPromo = allItems.filter(
          (item: CatalogProduct) => 
            item.slug !== slug && 
            !["corporate-kits", "festive-hampers", "packaging"].includes(item.category) &&
            !related.some((r: CatalogProduct) => r.slug === item.slug)
        );
        related = [...related, ...otherPromo];
      }

      setRelatedProducts(related.slice(0, 4));
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-28 pb-24 bg-gray-50/50 min-h-screen text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-extrabold text-gray-500 hover:text-red-650 uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-12 text-center text-sm font-bold text-gray-500">
            Loading product from catalog database...
          </div>
        </div>
      </div>
    );
  }

  // Bulk Discount Bracket calculations
  const getDiscountPercentage = (qty: number) => {
    if (qty >= 1000) return 20;
    if (qty >= 500) return 15;
    if (qty >= 250) return 10;
    if (qty >= 100) return 5;
    return 0;
  };

  const discount = getDiscountPercentage(quantity);
  const unitPrice = Math.round(product.basePrice * (1 - discount / 100));
  const totalPrice = unitPrice * quantity;

  const handleToggleShortlist = () => {
    if (isShortlisted) {
      removeFromShortlist(product.title);
    } else {
      addToShortlist({
        title: product.title,
        imageUrl: product.images[0],
        price: `₹${unitPrice} (Bulk Quote)`
      });
    }
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      product: product.title,
      qty: quantity.toString(),
      branding: selectedBranding,
      packaging: selectedPackaging,
      price: `₹${unitPrice} per unit`
    });
    router.push(`/enquiry?${query.toString()}`);
  };

  return (
    <div className="pt-28 pb-24 bg-gray-50/50 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top back links */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[10px] font-extrabold text-gray-500 hover:text-red-650 uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          
          <nav className="hidden sm:flex items-center gap-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-red-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link href="/products" className="hover:text-red-500">Products</Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>

        {/* Details Grid layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Image Galleries */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-gray-150 shadow-sm flex items-center justify-center group">
              <SafeImage
                key={activeImage}
                src={activeImage}
                alt={product.title}
                category={product.category}
                isMotion={true}
                motionProps={{
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.4 }
                }}
              />
              
              <div className="absolute top-4 right-4 z-10">
                <button
                  suppressHydrationWarning
                  onClick={handleToggleShortlist}
                  className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md text-gray-650 hover:text-red-600 border border-gray-200 transition-colors flex items-center justify-center"
                  title="Add to shortlist"
                >
                  <Bookmark className={`w-5 h-5 ${isShortlisted ? "fill-red-600 text-red-650" : ""}`} />
                </button>
              </div>

              {/* Hover to Zoom Cue */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl text-[9px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Hover to Zoom
              </div>
            </div>

            {/* Thumbnails grid */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  suppressHydrationWarning
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                    activeImage === imgUrl ? "border-red-600 shadow-md" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <SafeImage src={imgUrl} alt={`${product.title} thumbnail ${idx}`} category={product.category} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Specs & Live calculator */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2 block">{product.category} Gifting</span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">{product.title}</h1>
              <p className="text-gray-500 mt-4 leading-relaxed text-sm sm:text-base font-semibold">{product.description}</p>
            </div>

            {/* Customization Details */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500 mb-3.5 flex items-center gap-2">
                  <Check className="w-4 h-4 text-red-600" /> Branding Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.customizations.map((brand) => (
                    <button
                      suppressHydrationWarning
                      key={brand}
                      onClick={() => setSelectedBranding(brand)}
                      className={`text-left px-4 py-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selectedBranding === brand
                          ? "bg-red-50 text-red-600 border-red-200 shadow-xs"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {brand}
                      {selectedBranding === brand && <span className="w-2 h-2 bg-red-600 rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500 mb-3.5 flex items-center gap-2">
                  <Box className="w-4 h-4 text-red-600" /> Packaging Curation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.packagings.map((pack) => (
                    <button
                      suppressHydrationWarning
                      key={pack}
                      onClick={() => setSelectedPackaging(pack)}
                      className={`text-left px-4 py-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        selectedPackaging === pack
                          ? "bg-red-50 text-red-600 border-red-200 shadow-xs"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pack}
                      {selectedPackaging === pack && <span className="w-2 h-2 bg-red-600 rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nationwide Delivery SLA */}
            <div className="bg-gradient-to-r from-red-950/20 via-neutral-900/5 to-neutral-900/5 border border-red-500/10 p-5 rounded-2xl flex items-start gap-4 text-left shadow-xs">
              <div className="p-2.5 bg-red-600/10 border border-red-500/20 rounded-xl flex-shrink-0 text-red-600 mt-0.5">
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest">Pan-India Cargo Dispatch</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EF5350] animate-pulse" />
                </div>
                <h4 className="text-xs font-black text-gray-900">Enterprise Logistics: 5 - 7 Days SLA</h4>
                <p className="text-[10px] font-semibold text-gray-500 leading-relaxed">
                  Insured cargo shipping with end-to-end tracking. We support custom labeling, split shipments across multiple branch locations, and desktop delivery setups.
                </p>
              </div>
            </div>

            {/* Live Bulk Price Calculator */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-red-500">Live Bulk Calculator</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">MOQ: {product.moq} Units</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-gray-900">₹{unitPrice}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase ml-1">/ unit</span>
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Enter Order Quantity</span>
                  <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">{quantity} units</span>
                </div>
                
                <input
                  suppressHydrationWarning
                  type="range"
                  min={product.moq}
                  max={2000}
                  step={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                />

                <div className="flex justify-between text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">
                  <span>{product.moq} (Min)</span>
                  <span>250 (10% Off)</span>
                  <span>500 (15% Off)</span>
                  <span>1000+ (20% Off)</span>
                </div>
              </div>

              {/* Discount Brackets info */}
              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                {[
                  { label: "100+", disc: "5%" },
                  { label: "250+", disc: "10%" },
                  { label: "500+", disc: "15%" },
                  { label: "1000+", disc: "20%" }
                ].map((bracket, i) => {
                  const isActive = (i === 0 && quantity >= 100 && quantity < 250) ||
                                   (i === 1 && quantity >= 250 && quantity < 500) ||
                                   (i === 2 && quantity >= 500 && quantity < 1000) ||
                                   (i === 3 && quantity >= 1000);
                  return (
                    <div 
                      key={i} 
                      className={`p-2 rounded-lg transition-all ${
                        isActive ? "bg-red-600 text-white shadow-sm" : "text-gray-500"
                      }`}
                    >
                      <div className="text-[9px] font-extrabold uppercase">{bracket.label}</div>
                      <div className="text-xs font-black mt-0.5">{bracket.disc} Off</div>
                    </div>
                  );
                })}
              </div>

              {/* Final estimated quote block */}
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-between text-left">
                <div>
                  <div className="text-xs font-bold text-gray-500">Estimated Project Quote</div>
                  <div className="text-[10px] font-semibold text-gray-400 mt-0.5">Customizations included</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-gray-900">₹{totalPrice.toLocaleString("en-IN")}</div>
                  <span className="text-[8px] font-extrabold text-[#D32F2F] uppercase bg-[#FDECEC] px-2 py-0.5 rounded-md">
                    Saved ₹{(product.basePrice * quantity - totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleSendEnquiry}
                  className="rounded-xl h-13 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold shadow-lg shadow-red-600/15 flex items-center justify-center gap-2 group transition-all border-0"
                >
                  Request Bulk Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button
                  onClick={handleToggleShortlist}
                  variant="outline"
                  className="rounded-xl h-13 border-gray-250 hover:bg-gray-50 font-bold transition-all text-gray-700 flex items-center justify-center gap-2"
                >
                  <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-red-600 text-red-600" : ""}`} />
                  {isShortlisted ? "Saved in Shortlist" : "Add to Shortlist"}
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="border-t border-gray-200 pt-16 mb-20 text-left">
          <div className="mb-8 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-red-600" />
            <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-widest">Technical Specifications</h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs max-w-3xl">
            <table className="w-full text-xs sm:text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-500 w-1/3 uppercase text-[10px] tracking-wider">{spec.label}</td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t border-gray-200 pt-16 text-left">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500 fill-red-500/10" /> Related Products
            </h2>
            <Link 
              href="/products" 
              className="text-[10px] font-extrabold text-red-500 hover:text-red-600 uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              Explore Catalog <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProducts.map((relatedItem, idx) => (
              <ProductCard
                key={relatedItem.slug}
                title={relatedItem.title}
                description={relatedItem.description}
                imageUrl={relatedItem.images[0]}
                price={relatedItem.price ? `₹${relatedItem.price}` : "Custom Quote"}
                moq={relatedItem.moq}
                index={idx}
                category={relatedItem.category}
                href={`/products/${relatedItem.slug}`}
                className="hover:shadow-xl hover:shadow-gray-200/40"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
