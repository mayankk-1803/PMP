import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel, BrandModel, OrderModel, QuoteModel } from "@/models/cmsModels";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

const modelMap: Record<string, any> = {
  Product: ProductModel,
  Category: CategoryModel,
  Subcategory: SubcategoryModel,
  Brand: BrandModel,
  Order: OrderModel,
  Quote: QuoteModel,
};

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();
    const { entityType, id } = await req.json();

    const Model = modelMap[entityType];
    if (!Model) {
      return NextResponse.json({ success: false, message: `Invalid entity type: ${entityType}` }, { status: 400 });
    }

    const record = await Model.findById(id);
    if (!record) {
      return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 });
    }

    const name = record.title || record.name || record.customerName || id;

    // Perform restore operation
    await Model.updateOne(
      { _id: id },
      {
        $set: {
          isDeleted: false,
          deletedAt: null,
          deletedBy: null,
        },
      }
    );

    // Log the restore event
    await logActivity({
      action: `RESTORE_${entityType.toUpperCase()}`,
      entityType,
      entityId: id,
      entityName: name,
      newValue: { isDeleted: false },
      req,
    });

    // Revalidate tags and paths
    await revalidatePathsAndTags();

    return NextResponse.json({ success: true, message: `${entityType} restored successfully` });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
