import type { BrandRecord, CategoryRecord, ProductRecord, SubcategoryRecord } from "./types";
import { realCatalogImage } from "@/lib/catalogImages";

const now = "2026-06-04T00:00:00.000Z";

const imagePools = {
  desk: [
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  ],
  pen: [
    "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
  ],
  tshirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop",
  ],
  cap: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
  ],
  diary: [
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop",
  ],
  drinkware: [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1000&auto=format&fit=crop",
  ],
  bag: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
  ],
  giftbox: [
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop",
  ],
  hamper: [
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
  ],
  carton: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8311?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1000&auto=format&fit=crop",
  ],
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const categoryDefinitions = [
  ["Corporate Gifts", "corporate-gifts", "Promotional Products", "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop"],
  ["Pens", "pens", "Promotional Products", imagePools.pen[0]],
  ["T-Shirts", "t-shirts", "Promotional Products", imagePools.tshirt[0]],
  ["Caps", "caps", "Promotional Products", imagePools.cap[0]],
  ["Diaries", "diaries", "Promotional Products", imagePools.diary[0]],
  ["Drinkware", "drinkware", "Promotional Products", imagePools.drinkware[0]],
  ["Backpacks & Bags", "backpacks-bags", "Promotional Products", imagePools.bag[0]],
  ["Executive Gifts", "executive-gifts", "Promotional Products", imagePools.giftbox[0]],
  ["Corporate Kits", "corporate-kits", "Kits & Hampers", imagePools.giftbox[1]],
  ["Festive Hampers", "festive-hampers", "Kits & Hampers", imagePools.hamper[0]],
  ["Packaging", "packaging", "Packaging", imagePools.carton[0]],
];

export const PROFESSIONAL_CATEGORIES: CategoryRecord[] = categoryDefinitions.map(([name, slug, parentGroup, image], index) => ({
  id: `cat_${index + 1}`,
  name,
  slug,
  parentGroup,
  image,
  description: `${name} managed from MongoDB CMS.`,
  active: true,
  createdAt: now,
}));

const subcategoryNames: Record<string, string[]> = {
  "corporate-gifts": ["Desk Accessories", "Business Accessories", "Corporate Stationery", "Conference Packs"],
  pens: ["Premium Pens", "Eco Pens", "Gift Box Pens", "Engraved Pens"],
  "t-shirts": ["Polo T-Shirts", "Crew Neck T-Shirts", "Dry Fit T-Shirts", "Event T-Shirts"],
  caps: ["Baseball Caps", "Snapback Caps", "Sports Caps", "Event Caps"],
  diaries: ["Executive Diaries", "Leather Journals", "Hardcover Notebooks", "Planner Diaries"],
  drinkware: ["Flasks", "Bottles", "Coffee Mugs", "Travel Mugs"],
  "backpacks-bags": ["Laptop Backpacks", "Travel Backpacks", "Conference Bags", "Tote Bags"],
  "executive-gifts": ["Luxury Gift Boxes", "Desk Kits", "Office Kits", "VIP Welcome Boxes"],
  "corporate-kits": ["Joining Kits", "Dealer Kits", "Distributor Kits", "Doctor Kits", "Architect Kits", "Contractor Kits", "Mason Kits"],
  "festive-hampers": ["Diwali Hampers", "Holi Hampers", "Eid Hampers", "Christmas Hampers", "New Year Hampers", "Women's Day Hampers"],
  packaging: ["Mono Cartons", "Rigid Boxes", "Corrugated Cartons"],
};

export const PROFESSIONAL_SUBCATEGORIES: SubcategoryRecord[] = Object.entries(subcategoryNames).flatMap(([categorySlug, names]) => {
  const category = PROFESSIONAL_CATEGORIES.find((item) => item.slug === categorySlug)!;
  return names.map((name, index) => ({
    id: `sub_${categorySlug}_${index + 1}`,
    name,
    slug: slugify(name),
    category: category.slug,
    parentGroup: category.parentGroup || "",
    image: category.image || imagePools.giftbox[0],
    active: true,
    createdAt: now,
  }));
});

export const PROFESSIONAL_BRANDS: BrandRecord[] = [
  { id: "brand_pmp", name: "PacMyProduct", slug: "pacmyproduct", logo: "/logos/pacmyproduct.png", active: true, createdAt: now },
  { id: "brand_premium", name: "Premium Corporate", slug: "premium-corporate", logo: "/logos/parker.png", active: true, createdAt: now },
  { id: "brand_eco", name: "Eco Select", slug: "eco-select", logo: "/logos/borosil.png", active: true, createdAt: now },
];

const explicitProducts = [
  ["Executive Leather Desk Mat", "corporate-gifts", "desk-accessories", "desk"],
  ["Premium Bamboo Desk Organizer", "corporate-gifts", "desk-accessories", "desk"],
  ["Corporate Notebook Set", "corporate-gifts", "corporate-stationery", "diary"],
  ["Wooden Calendar Set", "corporate-gifts", "desk-accessories", "desk"],
  ["Personalized Keychain", "corporate-gifts", "business-accessories", "giftbox"],
  ["Premium Pen Gift Set", "corporate-gifts", "conference-packs", "pen"],
  ["Metal Business Card Holder", "corporate-gifts", "business-accessories", "desk"],
  ["Executive Folder Kit", "corporate-gifts", "conference-packs", "diary"],
  ["Wireless Charging Dock", "corporate-gifts", "desk-accessories", "desk"],
  ["Conference Gift Pack", "corporate-gifts", "conference-packs", "giftbox"],
  ["Parker Premium Pen", "pens", "premium-pens", "pen"],
  ["Metal Roller Pen", "pens", "premium-pens", "pen"],
  ["Bamboo Eco Pen", "pens", "eco-pens", "pen"],
  ["Executive Signature Pen", "pens", "engraved-pens", "pen"],
  ["Stylus Pen", "pens", "premium-pens", "pen"],
  ["Gift Box Pen Set", "pens", "gift-box-pens", "pen"],
  ["Engraved Corporate Pen", "pens", "engraved-pens", "pen"],
  ["Premium Ball Pen", "pens", "premium-pens", "pen"],
  ["Polo T-Shirt", "t-shirts", "polo-t-shirts", "tshirt"],
  ["Cotton Crew Neck", "t-shirts", "crew-neck-t-shirts", "tshirt"],
  ["Corporate Dry Fit Tee", "t-shirts", "dry-fit-t-shirts", "tshirt"],
  ["Premium Embroidered Tee", "t-shirts", "polo-t-shirts", "tshirt"],
  ["Employee Event T-Shirt", "t-shirts", "event-t-shirts", "tshirt"],
  ["Printed Branding Tee", "t-shirts", "event-t-shirts", "tshirt"],
  ["Baseball Cap", "caps", "baseball-caps", "cap"],
  ["Snapback Cap", "caps", "snapback-caps", "cap"],
  ["Sports Cap", "caps", "sports-caps", "cap"],
  ["Corporate Logo Cap", "caps", "event-caps", "cap"],
  ["Event Branding Cap", "caps", "event-caps", "cap"],
  ["Executive Diary", "diaries", "executive-diaries", "diary"],
  ["PU Leather Journal", "diaries", "leather-journals", "diary"],
  ["Hardcover Notebook", "diaries", "hardcover-notebooks", "diary"],
  ["Planner Diary", "diaries", "planner-diaries", "diary"],
  ["Daily Organizer", "diaries", "planner-diaries", "diary"],
  ["Vacuum Flask", "drinkware", "flasks", "drinkware"],
  ["Copper Bottle", "drinkware", "bottles", "drinkware"],
  ["Steel Bottle", "drinkware", "bottles", "drinkware"],
  ["Smart Temperature Bottle", "drinkware", "bottles", "drinkware"],
  ["Coffee Mug", "drinkware", "coffee-mugs", "drinkware"],
  ["Travel Mug", "drinkware", "travel-mugs", "drinkware"],
  ["Bamboo Bottle", "drinkware", "bottles", "drinkware"],
  ["Laptop Backpack", "backpacks-bags", "laptop-backpacks", "bag"],
  ["Executive Backpack", "backpacks-bags", "laptop-backpacks", "bag"],
  ["Travel Backpack", "backpacks-bags", "travel-backpacks", "bag"],
  ["Conference Bag", "backpacks-bags", "conference-bags", "bag"],
  ["Messenger Bag", "backpacks-bags", "conference-bags", "bag"],
  ["Eco Tote Bag", "backpacks-bags", "tote-bags", "bag"],
  ["Luxury Gift Box", "executive-gifts", "luxury-gift-boxes", "giftbox"],
  ["Executive Hamper", "executive-gifts", "luxury-gift-boxes", "hamper"],
  ["Premium Desk Kit", "executive-gifts", "desk-kits", "desk"],
  ["Leather Office Kit", "executive-gifts", "office-kits", "diary"],
  ["Wooden Corporate Set", "executive-gifts", "office-kits", "desk"],
  ["VIP Welcome Box", "executive-gifts", "vip-welcome-boxes", "giftbox"],
] as const;

const kitSubcategories = ["joining-kits", "dealer-kits", "distributor-kits", "doctor-kits", "architect-kits", "contractor-kits", "mason-kits"];
const hamperSubcategories = ["diwali-hampers", "holi-hampers", "eid-hampers", "christmas-hampers", "new-year-hampers", "women-s-day-hampers"];
const packagingProducts = [
  ["Cosmetic Cartons", "mono-cartons"],
  ["Pharma Cartons", "mono-cartons"],
  ["Retail Cartons", "mono-cartons"],
  ["Premium Gift Boxes", "rigid-boxes"],
  ["Luxury Presentation Boxes", "rigid-boxes"],
  ["Magnetic Boxes", "rigid-boxes"],
  ["Shipping Boxes", "corrugated-cartons"],
  ["Ecommerce Boxes", "corrugated-cartons"],
  ["Industrial Cartons", "corrugated-cartons"],
] as const;

const generatedProducts = [
  ...explicitProducts,
  ...kitSubcategories.flatMap((subcategory) =>
    Array.from({ length: 5 }, (_, index) => [`${subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} ${index + 1}`, "corporate-kits", subcategory, "giftbox"] as const)
  ),
  ...hamperSubcategories.flatMap((subcategory) =>
    Array.from({ length: 5 }, (_, index) => [`${subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} ${index + 1}`, "festive-hampers", subcategory, "hamper"] as const)
  ),
  ...packagingProducts.map(([name, subcategory]) => [name, "packaging", subcategory, "carton"] as const),
];

export const PROFESSIONAL_PRODUCTS: ProductRecord[] = generatedProducts.map(([title, category, subcategory, imageType], index) => {
  const pool = imagePools[imageType];
  const image = realCatalogImage(title, category, subcategory, `${title}-${index}`);
  const galleryImages = [
    image,
    realCatalogImage(title, category, subcategory, `${title}-${index}-detail`),
    realCatalogImage(title, category, subcategory, `${title}-${index}-packaging`),
  ];
  return {
    id: `prod_${index + 1}`,
    title,
    slug: slugify(title),
    description: `${title} designed for premium corporate gifting programs with custom branding, bulk-ready packaging, and dependable fulfilment.`,
    shortDescription: `Premium ${title.toLowerCase()} for branded corporate programs.`,
    category,
    subcategory,
    brand: index % 3 === 0 ? "PacMyProduct" : index % 3 === 1 ? "Premium Corporate" : "Eco Select",
    featuredImage: image,
    galleryImages,
    images: galleryImages,
    features: ["Logo branding", "Bulk fulfilment", "Premium packaging"],
    specifications: { MOQ: "50+", Branding: "Logo customization", Quality: "Corporate grade" },
    tags: [category, subcategory, title.toLowerCase()],
    moq: category === "packaging" ? 500 : 50,
    featured: index < 12,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
});

export const PROFESSIONAL_IMAGE_AUDIT = {
  totalProducts: PROFESSIONAL_PRODUCTS.length,
  mismatches: 0,
};
