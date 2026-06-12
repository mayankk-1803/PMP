import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel, BrandModel } from "@/models/cmsModels";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

const modelMap: Record<string, any> = {
  Category: CategoryModel,
  Subcategory: SubcategoryModel,
  Brand: BrandModel,
  Product: ProductModel,
};

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();
    const { entityType, ids } = await req.json(); // e.g., Category, Subcategory, Brand, Product

    const Model = modelMap[entityType];
    if (!Model) {
      return NextResponse.json({ success: false, message: `Invalid entity type: ${entityType}` }, { status: 400 });
    }

    if (!Array.isArray(ids)) {
      return NextResponse.json({ success: false, message: "ids parameter must be an array" }, { status: 400 });
    }

    const bulkOps = ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index + 1 } },
      },
    }));

    if (bulkOps.length > 0) {
      await Model.bulkWrite(bulkOps);
    }

    // Log reordering event
    await logActivity({
      action: `REORDER_${entityType.toUpperCase()}`,
      entityType,
      entityName: `Drag & Drop Reorder (${ids.length} items)`,
      newValue: { count: ids.length },
      req,
    });

    await revalidatePathsAndTags();

    return NextResponse.json({ success: true, message: `${entityType} order updated successfully` });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
