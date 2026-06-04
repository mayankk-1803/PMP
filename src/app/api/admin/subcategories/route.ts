import { NextResponse } from "next/server";
import { createSubcategory, listAllSubcategories } from "@/services/admin/taxonomyService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listAllSubcategories() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const subcategory = await createSubcategory({
    name: data.name,
    slug: data.slug,
    category: data.category,
    parentGroup: data.parentGroup,
    image: data.image,
    active: data.active ?? true,
  });
  return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
}
