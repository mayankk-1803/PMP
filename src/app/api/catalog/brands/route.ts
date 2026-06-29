import { NextResponse } from "next/server";
import { listRecords } from "@/repositories/adminRepository";
import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel } from "@/models/cmsModels";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const brands = await BrandModel.find({ active: true, isDeleted: { $ne: true } }).sort({ order: 1, name: 1 }).lean<any[]>();
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
        order: brand.order || 0,
      })),
    });
  }

  const staticBrands = listRecords("brands").filter((brand) => brand.active);
  staticBrands.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ success: true, data: staticBrands });
}
