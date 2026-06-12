import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteSubcategory, updateSubcategory } from "@/services/admin/taxonomyService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { destroyCloudinaryAssets } from "@/lib/admin/cloudinaryLifecycle";
import { SubcategoryModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldSubcategory = await SubcategoryModel.findById(id).lean<any>();
    if (!oldSubcategory) {
      return NextResponse.json({ success: false, message: "Subcategory not found" }, { status: 404 });
    }

    const replacedPublicId = data.cloudinaryPublicId && oldSubcategory.cloudinaryPublicId && data.cloudinaryPublicId !== oldSubcategory.cloudinaryPublicId
      ? oldSubcategory.cloudinaryPublicId
      : "";
    if (replacedPublicId) {
      await destroyCloudinaryAssets([replacedPublicId]);
    }

    const updated = await updateSubcategory(id, data);

    if (updated) {
      await logActivity({
        action: "UPDATE_SUBCATEGORY",
        entityType: "Subcategory",
        entityId: id,
        entityName: updated.name,
        oldValue: oldSubcategory,
        newValue: updated,
        req,
      });

      if (replacedPublicId || data.cloudinaryPublicId) {
        await logActivity({
          action: replacedPublicId ? "IMAGE_REPLACED" : "IMAGE_UPLOADED",
          entityType: "Subcategory",
          entityId: id,
          entityName: updated.name,
          oldValue: {
            cloudinaryPublicId: oldSubcategory.cloudinaryPublicId,
            image: oldSubcategory.image,
            removedPublicId: replacedPublicId || undefined,
          },
          newValue: {
            cloudinaryPublicId: updated.cloudinaryPublicId,
            image: updated.image,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Subcategory not found" }, { status: 404 });
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

    const subcategory = await SubcategoryModel.findById(id).lean<any>();
    if (!subcategory) {
      return NextResponse.json({ success: false, message: "Subcategory not found" }, { status: 404 });
    }

    const success = await deleteSubcategory(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_SUBCATEGORY" : "DELETE_SUBCATEGORY",
        entityType: "Subcategory",
        entityId: id,
        entityName: subcategory.name,
        oldValue: subcategory,
        req,
      });

      if (permanent && subcategory.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_DELETED",
          entityType: "Subcategory",
          entityId: id,
          entityName: subcategory.name,
          oldValue: {
            cloudinaryPublicId: subcategory.cloudinaryPublicId,
            image: subcategory.image,
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
