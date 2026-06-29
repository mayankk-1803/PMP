import { NextResponse } from "next/server";
import { listRecords } from "@/repositories/adminRepository";
import { connectMongoDB } from "@/lib/mongodb";
import { CategoryModel } from "@/models/cmsModels";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const categories = await CategoryModel.find({ active: true, isDeleted: { $ne: true } }).sort({ order: 1, name: 1 }).lean<any[]>();
    return NextResponse.json({
      success: true,
      data: categories.map((category) => ({
        id: String(category._id),
        name: category.name,
        slug: category.slug,
        parentGroup: category.parentGroup,
        description: category.description,
        image: category.image,
        order: category.order || 0,
      })),
    });
  }

  const staticCategories = listRecords("categories").filter((category) => category.active);
  staticCategories.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ success: true, data: staticCategories });
}
