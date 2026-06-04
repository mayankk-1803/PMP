import { NextResponse } from "next/server";
import { deleteSubcategory, updateSubcategory } from "@/services/admin/taxonomyService";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const updated = await updateSubcategory(id, await req.json());
  return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Subcategory not found" }, { status: 404 });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ success: await deleteSubcategory(id) });
}
