import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { createBrand, listAllBrands } from "@/services/admin/brandService";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  return NextResponse.json({ success: true, data: await listAllBrands() });
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const data = await req.json();
    const brand = await createBrand({
      name: data.name,
      slug: data.slug,
      logo: data.logo,
      cloudinaryPublicId: data.cloudinaryPublicId,
      industry: data.industry,
      category: data.category,
      description: data.description,
      active: data.active ?? true,
      order: Number(data.order) || 0,
    });

    if (brand) {
      await logActivity({
        action: "CREATE_BRAND",
        entityType: "Brand",
        entityId: brand.id,
        entityName: brand.name,
        newValue: brand,
        req,
      });

      if (brand.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_UPLOADED",
          entityType: "Brand",
          entityId: brand.id,
          entityName: brand.name,
          newValue: {
            cloudinaryPublicId: brand.cloudinaryPublicId,
            logo: brand.logo,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
