import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteEnquiry, updateEnquiry } from "@/services/admin/enquiryService";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  const { id } = await params;
  const updated = await updateEnquiry(id, await req.json());
  return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  const { id } = await params;
  return NextResponse.json({ success: await deleteEnquiry(id) });
}
