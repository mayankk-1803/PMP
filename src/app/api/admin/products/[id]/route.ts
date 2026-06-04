import { NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/services/admin/productService";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const images = data.galleryImages ?? data.images ?? (data.featuredImage ? [data.featuredImage] : undefined);
  const updated = await updateProduct(id, {
    ...data,
    title: data.title ?? data.name,
    featuredImage: data.featuredImage || images?.[0],
    galleryImages: images,
    images,
    active: data.status ? data.status !== "HIDDEN" : data.active,
  });
  return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ success: await deleteProduct(id) });
}
