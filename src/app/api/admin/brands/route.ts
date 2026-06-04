import { NextResponse } from "next/server";
import { createBrand, listAllBrands } from "@/services/admin/brandService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listAllBrands() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const brand = await createBrand({
    name: data.name,
    slug: data.slug,
    logo: data.logo,
    cloudinaryPublicId: data.cloudinaryPublicId,
    industry: data.industry,
    category: data.category,
    description: data.description,
    active: data.active ?? true,
  });
  return NextResponse.json({ success: true, data: brand }, { status: 201 });
}
