"use server";

import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePath } from "next/cache";
import { BUDGET_IMAGES_MAP } from "@/lib/generatedImageMap";
import {
  getBudgetsConfigService,
  saveBudgetsConfigService,
  type BudgetConfigItem,
  type BudgetProduct,
} from "@/services/admin/budgetCollectionService";

export async function getBudgetsConfig(): Promise<BudgetConfigItem[]> {
  try {
    return await getBudgetsConfigService();
  } catch (err) {
    console.error("[Budget CRUD] getBudgetsConfig failed:", err);
    return [];
  }
}

export async function saveBudgetsConfig(data: BudgetConfigItem[]): Promise<{ success: boolean; message?: string }> {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(admin.role)) {
      return {
        success: false,
        message: "Forbidden: You must be an authorized admin/editor to modify settings.",
      };
    }

    const oldValue = await getBudgetsConfigService();

    const res = await saveBudgetsConfigService(data);
    if (!res.success) {
      return res;
    }

    await logActivity({
      action: "UPDATE_BUDGET_CONFIG",
      entityType: "BudgetConfig",
      entityName: "Budget Range Settings",
      oldValue,
      newValue: data,
    });

    try {
      revalidatePath("/gifts-by-budget");
      revalidatePath("/gifts-by-budget/[slug]", "page");
      revalidatePath("/87564/admin/budgets");
      revalidatePath("/87564/admin/budgets/[slug]", "page");
      revalidatePath("/");
    } catch (revErr) {
      console.warn("[Budget CRUD] Revalidation warning:", revErr);
    }

    return { success: true, message: "Budget collection saved successfully." };
  } catch (err: any) {
    console.error("[Budget CRUD] Exception in saveBudgetsConfig:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to save budget collection configuration.",
    };
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

    const files = BUDGET_IMAGES_MAP[folder] || [];
    const sortedFiles = [...files].sort((a, b) => a.localeCompare(b));

    const imgFile = sortedFiles.find((f) => /\.(png|jpe?g|webp|avif|svg)$/i.test(f));
    if (imgFile) {
      return `/${folder}/${imgFile}`;
    }
  } catch (e) {
    // Ignore error
  }
  return "/default-budget.jpg";
}
