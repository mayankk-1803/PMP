import { NextResponse } from "next/server";
import { listRecords } from "@/repositories/adminRepository";
import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel } from "@/models/cmsModels";

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const brands = await BrandModel.find({ active: true }).sort({ name: 1 }).lean<any[]>();
    return NextResponse.json({
      success: true,
      data: brands.map((brand) => ({
        id: String(brand._id),
        name: brand.name,
        slug: brand.slug,
        logo: brand.logo,
        cloudinaryPublicId: brand.cloudinaryPublicId,
        industry: brand.industry,
        category: brand.category,
        description: brand.description,
      })),
    });
  }

  return NextResponse.json({ success: true, data: listRecords("brands").filter((brand) => brand.active) });
}
