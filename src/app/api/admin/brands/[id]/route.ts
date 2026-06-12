import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteBrand, updateBrand } from "@/services/admin/brandService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { destroyCloudinaryAssets } from "@/lib/admin/cloudinaryLifecycle";
import { BrandModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldBrand = await BrandModel.findById(id).lean<any>();
    if (!oldBrand) {
      return NextResponse.json({ success: false, message: "Brand not found" }, { status: 404 });
    }

    const replacedPublicId = data.cloudinaryPublicId && oldBrand.cloudinaryPublicId && data.cloudinaryPublicId !== oldBrand.cloudinaryPublicId
      ? oldBrand.cloudinaryPublicId
      : "";
    if (replacedPublicId) {
      await destroyCloudinaryAssets([replacedPublicId]);
    }

    const updated = await updateBrand(id, data);

    if (updated) {
      await logActivity({
        action: "UPDATE_BRAND",
        entityType: "Brand",
        entityId: id,
        entityName: updated.name,
        oldValue: oldBrand,
        newValue: updated,
        req,
      });

      if (replacedPublicId || data.cloudinaryPublicId) {
        await logActivity({
          action: replacedPublicId ? "IMAGE_REPLACED" : "IMAGE_UPLOADED",
          entityType: "Brand",
          entityId: id,
          entityName: updated.name,
          oldValue: {
            cloudinaryPublicId: oldBrand.cloudinaryPublicId,
            logo: oldBrand.logo,
            removedPublicId: replacedPublicId || undefined,
          },
          newValue: {
            cloudinaryPublicId: updated.cloudinaryPublicId,
            logo: updated.logo,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Brand not found" }, { status: 404 });
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

    const brand = await BrandModel.findById(id).lean<any>();
    if (!brand) {
      return NextResponse.json({ success: false, message: "Brand not found" }, { status: 404 });
    }

    const success = await deleteBrand(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_BRAND" : "DELETE_BRAND",
        entityType: "Brand",
        entityId: id,
        entityName: brand.name,
        oldValue: brand,
        req,
      });

      if (permanent && brand.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_DELETED",
          entityType: "Brand",
          entityId: id,
          entityName: brand.name,
          oldValue: {
            cloudinaryPublicId: brand.cloudinaryPublicId,
            logo: brand.logo,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
