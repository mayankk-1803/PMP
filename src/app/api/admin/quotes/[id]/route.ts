import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteQuote, updateQuote } from "@/services/admin/quoteService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { QuoteModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldQuote = await QuoteModel.findById(id).lean<any>();
    if (!oldQuote) {
      return NextResponse.json({ success: false, message: "Quote not found" }, { status: 404 });
    }

    const updated = await updateQuote(id, data);

    if (updated) {
      await logActivity({
        action: "UPDATE_QUOTE",
        entityType: "Quote",
        entityId: id,
        entityName: updated.customerName || updated.email,
        oldValue: oldQuote,
        newValue: updated,
        req,
      });

      await revalidatePathsAndTags();
    }

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Quote not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const url = new URL(req.url);
    const permanent = url.searchParams.get("permanent") === "true";
    const admin = await getCurrentAdmin();

    if (permanent && admin?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden: Only SUPER_ADMIN can permanently delete records" }, { status: 403 });
    }

    const quote = await QuoteModel.findById(id).lean<any>();
    if (!quote) {
      return NextResponse.json({ success: false, message: "Quote not found" }, { status: 404 });
    }

    const success = await deleteQuote(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_QUOTE" : "DELETE_QUOTE",
        entityType: "Quote",
        entityId: id,
        entityName: quote.customerName || quote.email,
        oldValue: quote,
        req,
      });

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
