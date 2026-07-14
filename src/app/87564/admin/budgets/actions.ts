"use server";

import fs from "fs/promises";
import path from "path";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePath } from "next/cache";

const RUNTIME_DIR = path.join(process.cwd(), "data", "runtime");
const BUDGETS_FILE = path.join(RUNTIME_DIR, "budgets.json");

export interface BudgetProduct {
  id: string;
  slug: string;
  displayName: string;
  category: string;
  description: string;
  featuredImage: string;
  gallery: string[];
  brandingOptions: string[];
  specifications: Record<string, string>;
  moq: number;
  brand?: string;
  buttonText?: string;
  price?: number | string;
  tags?: string[];
  order: number;
  active: boolean;
}

export interface BudgetConfigItem {
  id: string;
  title: string;
  value: string;
  description: string;
  image: string;
  bannerImage?: string;
  subtitle?: string;
  buttonText?: string;
  displayOrder: number;
  active: boolean;
  publicId?: string;
  bannerPublicId?: string;
  images?: Array<{ url: string; publicId: string; isCover?: boolean }>;
  collectionImages?: Array<{ url: string; publicId: string; order: number; title: string; description: string }>;
  products?: BudgetProduct[];
}

const defaultBudgets: BudgetConfigItem[] = [
  { id: "0-250", title: "₹0–250", value: "Under ₹250", description: "Perfect for Promotional Gifts", image: "", bannerImage: "", subtitle: "Affordable Gifting", buttonText: "Explore Collection", displayOrder: 1, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "250-500", title: "₹250–500", value: "₹250 - ₹500", description: "Perfect for Standard Swag", image: "", bannerImage: "", subtitle: "Value Swag Kits", buttonText: "Explore Collection", displayOrder: 2, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "500-1000", title: "₹500–1000", value: "₹500 - ₹1000", description: "Perfect for Premium Accessories", image: "", bannerImage: "", subtitle: "Premium Gifts", buttonText: "Explore Collection", displayOrder: 3, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "1000-2500", title: "₹1000–2500", value: "₹1000 - ₹2500", description: "Perfect for Executive Hampers", image: "", bannerImage: "", subtitle: "Executive Selection", buttonText: "Explore Collection", displayOrder: 4, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "2500-5000", title: "₹2500–5000", value: "₹2500+", description: "Perfect for Luxury & VIP Gifts", image: "", bannerImage: "", subtitle: "Luxury VIP Collection", buttonText: "Explore Collection", displayOrder: 5, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "5000", title: "₹5000+", value: "₹2500+", description: "Perfect for Ultra-Luxury VIP Gifts", image: "", bannerImage: "", subtitle: "Ultra-Luxury VIP", buttonText: "Explore Collection", displayOrder: 6, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] }
];

async function getFirstPublicImage(id: string): Promise<string> {
  try {
    const folder = id === "5000" ? "5000+" : id;
    const dirPath = path.join(process.cwd(), "public", folder);
    const files = await fs.readdir(dirPath);
    const imgFile = files.find((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));
    if (imgFile) {
      return `/${folder}/${imgFile}`;
    }
  } catch (e) {
    // Ignore error
  }
  return "";
}

export async function getBudgetsConfig(): Promise<BudgetConfigItem[]> {
  try {
    await fs.mkdir(RUNTIME_DIR, { recursive: true });
    try {
      const content = await fs.readFile(BUDGETS_FILE, "utf-8");
      const list = JSON.parse(content) as BudgetConfigItem[];
      
      // Make sure all default fields are populated
      const listMapped = await Promise.all(
        list.map(async (item, idx) => {
          const def = defaultBudgets.find((d) => d.id === item.id) || defaultBudgets[idx];
          
          let resolvedImages = item.images || [];
          // Legacy migration
          if (resolvedImages.length === 0 && item.image) {
            resolvedImages = [{ url: item.image, publicId: item.publicId || "", isCover: true }];
          }

          let coverItem = resolvedImages.find((img) => img.isCover);
          if (!coverItem && resolvedImages.length > 0) {
            coverItem = resolvedImages[0];
            coverItem.isCover = true;
          }

          let resolvedImage = coverItem ? coverItem.url : item.image || "";
          if (!resolvedImage) {
            resolvedImage = await getFirstPublicImage(item.id || def.id);
            if (resolvedImage && resolvedImages.length === 0) {
              resolvedImages = [{ url: resolvedImage, publicId: "", isCover: true }];
            }
          }
          
          let resolvedBannerImage = item.bannerImage || "";
          if (!resolvedBannerImage) {
            resolvedBannerImage = resolvedImage;
          }
          
          return {
            id: item.id || def.id,
            title: item.title || def.title,
            value: item.value || def.value,
            description: item.description ?? def.description,
            image: resolvedImage || def.image,
            bannerImage: resolvedBannerImage || def.bannerImage,
            subtitle: item.subtitle ?? def.subtitle,
            buttonText: item.buttonText ?? def.buttonText,
            displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : def.displayOrder,
            active: typeof item.active === "boolean" ? item.active : def.active,
            publicId: item.publicId ?? (coverItem ? coverItem.publicId : def.publicId),
            bannerPublicId: item.bannerPublicId ?? def.bannerPublicId,
            images: resolvedImages,
            collectionImages: item.collectionImages || [],
            products: item.products || [],
          };
        })
      );
      return listMapped;
    } catch {
      const listMapped = await Promise.all(
        defaultBudgets.map(async (item) => {
          const resolvedImage = item.image || await getFirstPublicImage(item.id);
          const resolvedImages = resolvedImage ? [{ url: resolvedImage, publicId: "", isCover: true }] : [];
          return {
            ...item,
            image: resolvedImage || item.image,
            bannerImage: resolvedImage || item.bannerImage,
            images: resolvedImages,
            collectionImages: [],
            products: [],
          };
        })
      );
      await fs.writeFile(BUDGETS_FILE, JSON.stringify(listMapped, null, 2), "utf-8");
      return listMapped;
    }
  } catch (err) {
    console.error("Error loading budgets configuration:", err);
    return defaultBudgets;
  }
}

export async function saveBudgetsConfig(data: BudgetConfigItem[]) {
  const admin = await getCurrentAdmin();
  if (!admin || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(admin.role)) {
    throw new Error("Forbidden: You must be an authorized admin/editor to modify settings.");
  }

  try {
    await fs.mkdir(RUNTIME_DIR, { recursive: true });
    
    // Sort before saving to keep structure clean
    const sortedData = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
    
    // Read old value for logging
    let oldValue: any = null;
    try {
      const oldContent = await fs.readFile(BUDGETS_FILE, "utf-8");
      oldValue = JSON.parse(oldContent);
    } catch {
      oldValue = defaultBudgets;
    }

    await fs.writeFile(BUDGETS_FILE, JSON.stringify(sortedData, null, 2), "utf-8");

    await logActivity({
      action: "UPDATE_BUDGET_CONFIG",
      entityType: "BudgetConfig",
      entityName: "Budget Range Settings",
      oldValue,
      newValue: sortedData,
    });

    // Revalidate paths to clear statically cached pages in Next
    revalidatePath("/gifts-by-budget");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    console.error("Error saving budgets configuration:", err);
    throw new Error(err.message || "Failed to save budgets configuration.");
  }
}

export async function getBudgetCardImageAction(rangeValue: string): Promise<string> {
  try {
    if (!rangeValue) return "/default-budget.jpg";
    
    const clean = rangeValue
      .toLowerCase()
      .replace(/[₹\s,]/g, "")
      .replace(/[–—]/g, "-")
      .trim();

    let folder = "";
    if (clean === "under250" || clean === "0-250" || clean === "under-250") {
      folder = "0-250";
    } else if (clean === "250-500") {
      folder = "250-500";
    } else if (clean === "500-1000") {
      folder = "500-1000";
    } else if (clean === "1000-2500") {
      folder = "1000-2500";
    } else if (clean === "2500-5000" || clean === "2500+") {
      folder = "2500-5000";
    } else if (clean === "5000" || clean === "5000+" || clean === "above5000" || clean === "above-5000") {
      folder = "5000+";
    } else {
      folder = clean;
    }

    if (!folder) return "/default-budget.jpg";

    const dirPath = path.join(process.cwd(), "public", folder);
    const files = await fs.readdir(dirPath);
    
    // Sort alphabetically as requested
    const sortedFiles = files.sort((a, b) => a.localeCompare(b));

    const imgFile = sortedFiles.find((f) => /\.(png|jpe?g|webp|avif|svg)$/i.test(f));
    if (imgFile) {
      return `/${folder}/${imgFile}`;
    }
  } catch (e) {
    // Ignore error
  }
  return "/default-budget.jpg";
}
