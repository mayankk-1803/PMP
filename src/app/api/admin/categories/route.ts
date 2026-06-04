import { NextResponse } from "next/server";
import { createCategory, listAllCategories } from "@/services/admin/taxonomyService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listAllCategories() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const category = await createCategory({
    name: data.name,
    slug: data.slug,
    description: data.description,
    parentGroup: data.parentGroup,
    image: data.image,
    active: data.active ?? true,
  });
  return NextResponse.json({ success: true, data: category }, { status: 201 });
}
