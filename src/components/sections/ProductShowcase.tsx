"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

interface ShowcaseProduct {
  id: string;
  category: string;
  title: string;
  image: string;
}

export function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [products, setProducts] = useState<ShowcaseProduct[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/api/catalog/products")
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        const seen = new Set();
        const unique: ShowcaseProduct[] = [];
        (result.data ?? []).forEach((product: any) => {
          if (!seen.has(product.title) && product.images?.[0]) {
            seen.add(product.title);
            unique.push({
              id: product.id,
              category: product.category,
              title: product.title,
              image: product.images[0],
            });
          }
        });
        setProducts(unique.slice(0, 12));
      })
      .catch(() => setProducts([]));

    return () => {
      active = false;
    };
  }, []);

  const formatCategoryLabel = (cat: string) => {
    if (!cat) return "";
    const lower = cat.toLowerCase();
    if (lower === "drinkware" || lower === "drink-ware") {
      return "Drink Ware";
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((product) => product.category))).slice(0, 4)], [products]);

  const filteredProducts = products.filter((product) => activeFilter === "All" || product.category === activeFilter).slice(0, 4);

  return (
    <section className="py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-[#2B2B2B] mb-4">Curated Gifts</h2>
            <p className="text-lg text-[#6B6B63]">Explore our premium catalog of best-selling corporate kits.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === cat
                    ? "bg-[#D32F2F] text-white"
                    : "bg-white text-[#6B6B63] hover:bg-[#FAF9F6] border border-[#F5C2C2]"
                }`}
              >
                {formatCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#F5C2C2] shadow-sm hover:shadow-xl hover:shadow-[#F5C2C2]/50 transition-all flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute inset-0 bg-[#2B2B2B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="default" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-[#2B2B2B] hover:bg-[#FAF9F6] border-none shadow-xl">
                      Request Quote
                    </Button>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-left">
                  <p className="text-xs text-[#6B6B63] font-medium uppercase tracking-wider mb-2">{formatCategoryLabel(product.category)}</p>
                  <h3 className="text-lg font-bold text-[#D32F2F] mb-1 line-clamp-2 min-h-[56px]">{product.title}</h3>
                  <p className="text-[#2B2B2B] font-semibold mt-auto">Custom Quote</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
