import { NextResponse } from "next/server";
import { getCatalogProductBySlug } from "@/services/admin/productService";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}
