import { NextResponse } from "next/server";
import { createProduct, listAllProducts } from "@/services/admin/productService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listAllProducts() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const status = data.status ?? (data.active === false ? "HIDDEN" : "PUBLISHED");
  const galleryImages = data.galleryImages ?? data.images ?? (data.featuredImage ? [data.featuredImage] : []);
  const product = await createProduct({
    title: data.title ?? data.name,
    slug: data.slug,
    description: data.description ?? "",
    shortDescription: data.shortDescription,
    category: data.category,
    subcategory: data.subcategory ?? data.category,
    brand: data.brand,
    featuredImage: data.featuredImage || galleryImages[0],
    galleryImages,
    images: galleryImages,
    features: data.features ?? [],
    specifications: data.specifications ?? {},
    tags: data.tags ?? [],
    moq: Number(data.moq ?? 1),
    featured: Boolean(data.featured),
    active: status !== "HIDDEN",
    status,
  });
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
