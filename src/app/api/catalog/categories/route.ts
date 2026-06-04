import { NextResponse } from "next/server";
import { listRecords } from "@/repositories/adminRepository";
import { connectMongoDB } from "@/lib/mongodb";
import { CategoryModel } from "@/models/cmsModels";

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const categories = await CategoryModel.find({ active: true }).sort({ name: 1 }).lean<any[]>();
    return NextResponse.json({
      success: true,
      data: categories.map((category) => ({
        id: String(category._id),
        name: category.name,
        slug: category.slug,
        parentGroup: category.parentGroup,
        description: category.description,
        image: category.image,
      })),
    });
  }

  return NextResponse.json({ success: true, data: listRecords("categories").filter((category) => category.active) });
}
