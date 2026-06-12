import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteOrder, updateOrder } from "@/services/admin/orderService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { OrderModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldOrder = await OrderModel.findById(id).lean<any>();
    if (!oldOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const updated = await updateOrder(id, data);

    if (updated) {
      await logActivity({
        action: "UPDATE_ORDER",
        entityType: "Order",
        entityId: id,
        entityName: updated.customerName || updated.email,
        oldValue: oldOrder,
        newValue: updated,
        req,
      });

      await revalidatePathsAndTags();
    }

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
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

    const order = await OrderModel.findById(id).lean<any>();
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const success = await deleteOrder(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_ORDER" : "DELETE_ORDER",
        entityType: "Order",
        entityId: id,
        entityName: order.customerName || order.email,
        oldValue: order,
        req,
      });

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
