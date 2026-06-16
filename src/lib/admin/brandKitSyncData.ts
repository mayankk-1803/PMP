export const PROMOTIONAL_CATEGORIES = [
  ["Pens", "pens", "Premium, eco, gift-box, and engraved pens for corporate branding."],
  ["Drinkware", "drinkware", "Branded bottles, flasks, and mugs for office, travel, and event gifting."],
  ["Bags", "bags", "Premium backpacks, travel bags, duffel bags, trolley bags, and sling bags."],
  ["T-Shirts", "t-shirts", "Custom collared polo and round-neck branded t-shirts."],
  ["Caps", "caps", "Branded cotton, sports, and promotional caps for events."],
  ["Keychains", "keychains", "Acrylic, metal, and leather keychains with custom logo engraving."],
  ["Diaries / Notebooks", "diaries-notebooks", "Executive diaries, hardcover notebooks, and eco-friendly planners."],
  ["Table Top", "table-top", "Premium table top desk accessories and organizers."],
  ["Paper Weight", "paper-weight", "Corporate paper weights and desk utilities."],
  ["Table Mats", "table-mats", "Custom leatherette and anti-slip desk table mats."],
  ["Mouse Pad", "mouse-pad", "High-performance custom printed and wireless charging mouse pads."],
  ["Desk Organiser", "desk-organiser", "Multi-slot wooden and metal desk organisers."]
] as const;

export const PROMOTIONAL_SUBCATEGORIES = [
  // Pens
  ["Premium Pens", "premium-pens", "pens", "Premium writing instruments for executive and corporate gifting."],
  ["Eco Pens", "eco-pens", "pens", "Eco-friendly branded pens for sustainable promotional campaigns."],
  ["Gift Box Pens", "gift-box-pens", "Boxed pen sets for client gifting and milestone programs."],
  ["Engraved Pens", "engraved-pens", "Engraved pens with polished finishes for long-term brand recall."],

  // Drinkware
  ["Flasks", "flasks", "drinkware", "Premium vacuum flasks and sippers for office and travel use."],
  ["Bottles", "bottles", "drinkware", "Reusable branded bottles for employee, dealer, and event gifting."],
  ["Coffee Mugs", "coffee-mugs", "drinkware", "Custom coffee mugs for desks, onboarding kits, and events."],
  ["Travel Mugs", "travel-mugs", "drinkware", "Travel mugs and tumblers for mobile teams and conferences."],

  // Bags
  ["Laptop Bags", "laptop-bags", "bags", "Premium laptop bags for business professionals."],
  ["Travel Bags", "travel-bags", "bags", "Durable travel bags for corporate trips."],
  ["Duffle Bags", "duffle-bags", "bags", "High-utility duffle bags for sports and travel."],
  ["Trolley Bags", "trolley-bags", "bags", "Bespoke trolley bags for executive travel."],
  ["Sling Bags", "sling-bags", "bags", "Compact sling bags for daily utility."],

  // T-Shirts
  ["Polo T-Shirts", "polo-t-shirts", "t-shirts", "Premium collared polo t-shirts for teams."],
  ["Round Neck T-Shirts", "round-neck-t-shirts", "t-shirts", "Comfortable round neck t-shirts for events."],

  // Caps
  ["Promotional Caps", "promotional-caps", "caps", "Lightweight caps for marketing campaigns."],
  ["Sports Caps", "sports-caps", "caps", "High-performance sports caps with ventilation."],
  ["Cotton Caps", "cotton-caps", "caps", "Premium brushed cotton caps for team wear."],

  // Diaries / Notebooks
  ["Executive Diaries", "executive-diaries", "diaries-notebooks", "Luxury leatherette diaries for corporate planning."],
  ["Premium Diaries", "premium-diaries", "diaries-notebooks", "Corporate-grade premium diaries and journals."],
  ["Eco Notebooks", "eco-notebooks", "diaries-notebooks", "Sustainable notebooks made from recycled paper."],
  ["Standard Notebooks", "standard-notebooks", "diaries-notebooks", "Classic hardcover and softcover notebooks."],

  // Keychains
  ["Metal Keychain", "metal-keychain", "keychains", "Metal keychains for brand giveaways."],
  ["Leather Keychain", "leather-keychain", "keychains", "Leather keychains for premium gifting."],
  ["Acrylic Keychain", "acrylic-keychain", "keychains", "Acrylic keychains for promotional campaigns."],

  // Table Top
  ["Paper Weight", "paper-weight-sub", "table-top", "Custom tabletop paper weights."],
  ["Table Mats", "table-mats-sub", "table-top", "Premium leatherette table mats."],
  ["Mouse Pad", "mouse-pad-sub", "table-top", "Precision tracking mouse pads."],
  ["Desk Organiser", "desk-organiser-sub", "table-top", "Wooden and metal desk organizers."],

  // Flat Table Top items
  ["Paper Weight", "paper-weight", "paper-weight", "Corporate paper weights and desk utilities."],
  ["Table Mats", "table-mats", "table-mats", "Custom leatherette and anti-slip desk table mats."],
  ["Mouse Pad", "mouse-pad", "mouse-pad", "High-performance custom printed mouse pads."],
  ["Desk Organiser", "desk-organiser", "desk-organiser", "Multi-slot wooden and metal desk organisers."]
] as const;

export const CORPORATE_KIT_SUBCATEGORIES = [
  ["Dealer Kits", "dealer-kits", "Dealer launch kits with sales collateral, partner folders, and channel welcome packs."],
  ["Distributor Kits", "distributor-kits", "Distributor growth kits with travel utilities, trophies, and campaign literature."],
  ["Employee Welcome Kit", "employee-welcome-kit", "Employee welcome kits containing premium utilities, apparel, and onboarding stationery."],
  ["Doctor Kits", "doctor-kits", "Medical-themed stationery, desk utilities, planners, and clinic-ready branded packs."],
  ["Architect Kits", "architect-kits", "Sketchbooks, design tools, swatches, rulers, and premium studio presentation kits."],
  ["Contractor Kits", "contractor-kits", "Field-ready branded bags, caps, notebooks, tools, and durable site essentials."],
  ["Mason Kits", "mason-kits", "Recognition and utility kits for masonry teams with workwear, drinkware, and field packaging."],
  ["Electrician Kits", "electrician-kits", "Safety and utility kits with gloves, testers, notebooks, caps, and branded field packs."],
  ["Interior Designer Kits", "interior-designer-kits", "Designer sample kits with swatches, notebooks, rulers, pens, and presentation boxes."],
  ["Pharma Representative Kits", "pharma-representative-kits", "Representative kits with folders, sample inserts, planners, and branded cartons."],
  ["Hospital Staff Kits", "hospital-staff-kits", "Hospital staff appreciation kits with bottles, badge reels, notebooks, and care cards."],
  ["Startup Employee Onboarding Kits", "startup-employee-onboarding-kits", "Startup culture kits with tees, stickers, tumblers, notebooks, and tech organizers."],
  ["Training & Seminar Kits", "training-seminar-kits", "Delegate kits with notebooks, pens, agendas, badges, bottles, and certificates."],
  ["Joining Kits", "joining-kits", "Employee onboarding kits with diary, pen, sipper, welcome card, and branded box."],
  ["Plumber Kits", "plumber-kits", "Functional kits with branded toolbags, notebooks, drinkware, and trade accessories."],
  ["Real Estate / Builder Kit", "real-estate-builder-kit", "Builder and handover kits with folders, keys, desk gifts, and luxury packaging."],
  ["Partner Kit", "partner-kit", "Partner appreciation kits with premium treats, awards, desk gifts, and thank-you cards."],
  ["Sales Team Kit", "sales-team-kit", "Sales starter kits with polos, backpacks, bottles, planners, and pitch material."]
] as const;

export const HAMPER_SUBCATEGORIES = [
  ["Diwali Hampers", "diwali-hampers", "Diwali dry fruit, wellness, diya, and festive premium corporate hampers."],
  ["Holi Hampers", "holi-hampers", "Holi hampers with organic colors, snacks, thandai mixes, and colorful branded boxes."],
  ["Eid Kits", "eid-kits", "Eid gourmet hampers with dates, nuts, sweets, and elegant themed presentation."],
  ["Women's Day Gifts", "womens-day-gifts", "Women's Day appreciation hampers with self-care, candles, chocolates, and cards."],
  ["Christmas Kits", "christmas-kits", "Christmas gourmet hampers with cookies, cocoa, candles, ornaments, and winter sleeves."],
  ["New Year Hampers", "new-year-hampers", "New Year desk hampers with planners, calendars, tumblers, and premium treats."]
] as const;

export const BRAND_PARTNERS = [
  ["Adidas", "adidas", "Apparel & Lifestyle", "Sportswear"],
  ["Reebok", "reebok", "Apparel & Lifestyle", "Sportswear"],
  ["Rare Rabbit", "rare-rabbit", "Apparel & Lifestyle", "Premium Apparel"],
  ["Parker", "parker", "Writing Instruments", "Executive Stationery"],
  ["Beardo", "beardo", "Grooming & Lifestyle", "Personal Care"],
  ["Cello", "cello", "Writing & Drinkware", "Stationery & Utility"],
  ["Mokobara", "mokobara", "Travel & Luggage", "Premium Travel"],
  ["VIP", "vip", "Travel & Luggage", "Luggage"],
  ["JBL", "jbl", "Audio & Electronics", "Audio"],
  ["boAt", "boat", "Audio & Wearables", "Smartwatches & Wearables"],
  ["Borosil", "borosil", "Drinkware & Kitchenware", "Glassware"],
  ["Milton", "milton", "Drinkware & Utility", "Home & Office Utility"],
  ["Wildcraft", "wildcraft", "Travel & Outdoor", "Bags & Gear"],
  ["American Tourister", "american-tourister", "Travel & Luggage", "Luggage"],
  ["Noise", "noise", "Wearables & Audio", "Smartwatches"],
  ["Portronics", "portronics", "Tech Accessories", "Gadgets & Chargers"],
  ["Titan", "titan", "Watches & Lifestyle", "Watches"],
  ["Fastrack", "fastrack", "Watches & Lifestyle", "Watches & Sunglasses"],
  ["Safari", "safari", "Travel & Luggage", "Luggage"],
  ["Skybags", "skybags", "Travel & Luggage", "Bags & Luggage"],
  ["Prestige", "prestige", "Home & Kitchenware", "Kitchen Utility"],
  ["Philips", "philips", "Electronics & Appliances", "Personal Care"],
  ["Havells", "havells", "Electronics & Appliances", "Home Utilities"],
  ["Usha", "usha", "Home & Appliances", "Home Utilities"],
  ["Dell", "dell", "Computing & Tech", "Laptops & Tech"],
  ["HP", "hp", "Computing & Tech", "Laptops & Tech"],
  ["Lenovo", "lenovo", "Computing & Tech", "Laptops & Tech"]
] as const;

export const BRAND_LOGO_PATHS: Record<string, string> = {
  adidas: "/logos/adidas.jpg",
  reebok: "/logos/reebok.png",
  "rare-rabbit": "/logos/rarerabit.png",
  parker: "/logos/parker.png",
  beardo: "/logos/beardo.png",
  cello: "/logos/cello.png",
  mokobara: "/logos/mokobara.png",
  vip: "/logos/vip.webp",
  jbl: "/logos/jbl.png",
  boat: "/logos/boat.png",
  borosil: "/logos/borosil.png",
  milton: "/logos/milton.jpg",
  wildcraft: "/logos/wildcraft.png",
  "american-tourister": "/logos/am.png",
  noise: "/logos/noise.jpg",
  portronics: "/logos/portronics.jpg",
  titan: "/logos/titan.jpg",
  fastrack: "/logos/fastrack.png",
  safari: "/logos/safari.jpg",
  skybags: "/logos/skybags.png",
  prestige: "/logos/prestige.png",
  philips: "/logos/philips.png",
  havells: "/logos/havells.png",
  usha: "/logos/usha.jpg",
  dell: "/logos/dell.png",
  hp: "/logos/hp.png",
  lenovo: "/logos/lenovo.jpg"
};
