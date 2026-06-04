import { NextResponse } from "next/server";
import { listRecords } from "@/repositories/adminRepository";
import { connectMongoDB } from "@/lib/mongodb";
import { SubcategoryModel } from "@/models/cmsModels";

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const subcategories = await SubcategoryModel.find({ active: true }).sort({ name: 1 }).lean<any[]>();
    return NextResponse.json({
      success: true,
      data: subcategories.map((subcategory) => ({
        id: String(subcategory._id),
        name: subcategory.name,
        slug: subcategory.slug,
        categoryId: subcategory.categoryId ? String(subcategory.categoryId) : undefined,
        category: subcategory.category,
        parentGroup: subcategory.parentGroup,
        description: subcategory.description,
        image: subcategory.image,
        featuredImage: subcategory.featuredImage,
      })),
    });
  }

  return NextResponse.json({ success: true, data: listRecords("subcategories").filter((subcategory) => subcategory.active) });
}
