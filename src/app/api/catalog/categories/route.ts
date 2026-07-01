import { NextResponse } from "next/server";
import { listAllCategories } from "@/services/admin/taxonomyService";

export const dynamic = "force-dynamic";

export async function GET() {
  const categories = await listAllCategories();
  const activeCategories = categories.filter((category) => category.active);
  activeCategories.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ success: true, data: activeCategories });
}
