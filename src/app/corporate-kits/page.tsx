"use client";

import React, { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { CORPORATE_KITS, OCCASION_HAMPERS, SITE_KITS, SITE_HAMPERS } from "@/data/siteConfig";
import { Briefcase, HardHat, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type ActiveTab = "corporate" | "industry" | "festive";

const INDUSTRY_SLUGS = new Set([
  "doctor",
  "architect",
  "contractor",
  "mason",
  "electrician",
  "interior-designer",
  "pharma",
  "hospital-staff",
  "real-estate"
]);

const KIT_KEYWORDS: Record<string, string[]> = {
  joining: ["joining", "welcome", "onboarding", "employee", "campus", "remote"],
  dealer: ["dealer"],
  distributor: ["distributor"],
  doctor: ["doctor", "clinic"],
  architect: ["architect", "studio"],
  contractor: ["contractor", "field"],
  mason: ["mason"],
  electrician: ["electrician", "safety"],
  "interior-designer": ["interior", "designer"],
  pharma: ["pharma", "representative"],
  "hospital-staff": ["hospital", "staff"],
  training: ["training", "delegate"],
  seminar: ["seminar", "conference", "speaker"],
  "startup-onboarding": ["startup", "culture", "onboarding"],
  partner: ["partner", "appreciation"],
  sales: ["sales"],
  "real-estate": ["real estate", "real-estate", "handover"],
  diwali: ["diwali"],
  holi: ["holi"],
  eid: ["eid"],
  womens: ["women", "women's"],
  christmas: ["christmas"],
  newyear: ["new year", "newyear"],
  welcome: ["welcome", "employee"]
};

const optionDescription = (slug: string, label: string) => {
  const descriptions: Record<string, string> = {
    joining: "Welcome kits, onboarding boxes, campus hire kits, and remote employee packages.",
    dealer: "Dealer launch kits, sales collateral, partner folders, and channel welcome packs.",
    distributor: "Distributor growth kits, travel utilities, trophies, and campaign literature.",
    doctor: "Medical-themed doctor kits with planners, desk utilities, pens, and clinic-ready presentation.",
    architect: "Sketchbooks, planners, design tools, swatches, and studio presentation kits.",
    contractor: "Rugged field kits with caps, rainwear, tools, notebooks, and durable packaging.",
    mason: "Recognition kits with workwear, bottles, caps, certificates, and field-ready packaging.",
    electrician: "Safety and utility kits with gloves, testers, caps, notepads, and branded field packs.",
    "interior-designer": "Designer sample kits with swatches, notebooks, rulers, pens, and presentation boxes.",
    pharma: "Pharma representative kits with folders, sample inserts, planners, and branded cartons.",
    "hospital-staff": "Hospital staff appreciation kits with bottles, badge reels, notebooks, and care cards.",
    training: "Training delegate kits with notebooks, pens, agendas, badges, and tote packaging.",
    seminar: "Seminar and conference kits with speaker gifts, folders, bottles, and certificate cases.",
    "startup-onboarding": "Startup culture kits with tees, stickers, tumblers, notebooks, and modern packaging.",
    partner: "Partner appreciation kits with premium treats, awards, desk gifts, and thank-you cards.",
    sales: "Sales team starter kits with polos, backpacks, bottles, planners, and pitch material.",
    "real-estate": "Real estate launch and handover kits with key boxes, folders, pens, and luxury packaging.",
    diwali: "Diwali dry fruit, wellness, diya, and festive premium corporate hampers.",
    holi: "Holi hampers with organic colors, snacks, thandai mixes, and colorful branded boxes.",
    eid: "Eid gourmet hampers with dates, nuts, sweets, and elegant themed presentation.",
    womens: "Women's Day appreciation hampers with self-care, candles, chocolates, and custom cards.",
    christmas: "Christmas gourmet hampers with cookies, cocoa, candles, ornaments, and winter sleeves.",
    newyear: "New Year desk hampers with planners, calendars, tumblers, and premium treats.",
    welcome: "Welcome hampers with office essentials, snacks, notebooks, bottles, and branded desk items."
  };

  return descriptions[slug] || `Curated ${label.toLowerCase()} with brandable products, packaging, and bulk fulfillment.`;
};

const matchesOption = (item: { title: string; slug: string }, selectedKit: string) => {
  const haystack = `${item.title} ${item.slug}`.toLowerCase();
  const keywords = KIT_KEYWORDS[selectedKit] || [selectedKit];
  return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
};

function CorporateKitsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedKit = searchParams.get("kit") || "";
  const selectedCorporateOption = CORPORATE_KITS.find((item) => item.slug === selectedKit);
  const selectedHamperOption = OCCASION_HAMPERS.find((item) => item.slug === selectedKit);

  const activeTab: ActiveTab = selectedHamperOption
    ? "festive"
    : selectedCorporateOption && INDUSTRY_SLUGS.has(selectedCorporateOption.slug)
      ? "industry"
      : selectedCorporateOption
        ? "corporate"
        : "corporate";

  const corporateKits = SITE_KITS.filter((kit) => kit.category === "corporate");
  const industryKits = SITE_KITS.filter((kit) => kit.category === "industry");
  const festiveHampers = SITE_HAMPERS.map((h) => ({
    title: h.title,
    description: h.desc || h.description,
    imageUrl: h.imageUrl || h.image,
    price: h.price,
    slug: h.slug,
    category: "gift-sets"
  }));

  const visibleItems = useMemo(() => {
    if (selectedHamperOption) {
      const filtered = festiveHampers.filter((hamper) => matchesOption(hamper, selectedHamperOption.slug));
      return filtered.length ? filtered : festiveHampers;
    }

    if (selectedCorporateOption) {
      const source = INDUSTRY_SLUGS.has(selectedCorporateOption.slug) ? industryKits : corporateKits;
      const filtered = source.filter((kit) => matchesOption(kit, selectedCorporateOption.slug));
      return filtered.length ? filtered : source;
    }

    return activeTab === "industry" ? industryKits : corporateKits;
  }, [activeTab, corporateKits, festiveHampers, industryKits, selectedCorporateOption, selectedHamperOption]);

  const selectedLabel = selectedCorporateOption?.name || selectedHamperOption?.name || "Corporate Kits";
  const selectedDescription = selectedKit
    ? optionDescription(selectedKit, selectedLabel)
    : "Explore premium, custom-branded onboarding kits, specialized field employee kits, and luxury festive hampers curated to elevate your brand perception.";

  const tabItems = [
    { id: "corporate", label: "Employee & Joining Kits", icon: <Briefcase className="w-4 h-4" />, href: "/corporate-kits" },
    { id: "industry", label: "Field & Industry Kits", icon: <HardHat className="w-4 h-4" />, href: "/corporate-kits?kit=doctor" },
    { id: "festive", label: "Festive & Occasion Hampers", icon: <Gift className="w-4 h-4" />, href: "/corporate-kits?kit=diwali" },
  ] as const;

  const optionGroups = [
    { label: "Corporate Kits", items: CORPORATE_KITS, accent: "text-red-600" },
    { label: "Festive Hampers", items: OCCASION_HAMPERS, accent: "text-amber-600" }
  ];

  return (
    <div className="pt-32 pb-24 relative min-h-screen bg-[#faf9f6] overflow-hidden max-w-full">
      <BackgroundGradient className="opacity-15 blur-[140px]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-50/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
            Curated Gift Sets
          </span>
          <SectionHeading
            title={<>{selectedKit ? selectedLabel : "Corporate"} <span className="text-red-600">{selectedKit ? "" : "Kits & Hampers"}</span></>}
            subtitle={selectedDescription}
            centered
          />
        </div>

        <div className="flex justify-center mb-8 px-4">
          <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-white border border-gray-200/80 rounded-2xl shadow-sm max-w-4xl w-full md:w-auto relative z-10">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.href)}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 w-full md:w-auto ${
                    isActive
                      ? "bg-gray-900 text-white shadow-md shadow-gray-900/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-14 grid lg:grid-cols-2 gap-5">
          {optionGroups.map((group) => (
            <section key={group.label} className="rounded-2xl bg-white border border-gray-200/80 p-5 shadow-sm text-left">
              <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-4 ${group.accent}`}>
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const isSelected = selectedKit === item.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                        isSelected
                          ? "border-red-600 bg-red-50 text-red-600 shadow-sm"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-950"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 text-left">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
              {selectedKit ? "Selected Collection" : "Featured Collection"}
            </span>
            <h2 className="mt-1 text-2xl md:text-3xl font-black text-gray-950">
              {selectedLabel}
            </h2>
          </div>
          <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
            {visibleItems.length} Options
          </span>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedKit || "all"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {visibleItems.map((item, idx) => (
                <ProductCard
                  key={`${item.slug}-${item.title}`}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  index={idx}
                  category={item.category}
                  className="glass-card hover:shadow-xl hover:shadow-gray-200/40 border-gray-200/60"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-3">
                Bespoke Packaging & Gifting
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
                Want to curate a <span className="text-red-500">completely custom</span> kit?
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Tell us your budget, quantity, and product preferences. Our team will draft custom dielines, mockups, and organize pan-India door-to-door delivery.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto font-bold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-xl shadow-red-900/20 border-0 flex items-center justify-center gap-2 group py-4 px-8"
                asChild
              >
                <Link href="/enquiry?source=custom-kit">
                  Request Custom Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CorporateKitsPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-24 text-center text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading kits...</div>}>
      <CorporateKitsContent />
    </Suspense>
  );
}
