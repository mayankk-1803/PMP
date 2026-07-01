import { NextResponse } from "next/server";
import { listAllSubcategories } from "@/services/admin/taxonomyService";

export const dynamic = "force-dynamic";

export async function GET() {
  const subcategories = await listAllSubcategories();
  const activeSubcategories = subcategories.filter((subcategory) => subcategory.active);
  activeSubcategories.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ success: true, data: activeSubcategories });
}
