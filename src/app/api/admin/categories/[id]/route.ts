import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteCategory, updateCategory } from "@/services/admin/taxonomyService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { destroyCloudinaryAssets } from "@/lib/admin/cloudinaryLifecycle";
import { CategoryModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldCategory = await CategoryModel.findById(id).lean<any>();
    if (!oldCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const replacedPublicId = data.cloudinaryPublicId && oldCategory.cloudinaryPublicId && data.cloudinaryPublicId !== oldCategory.cloudinaryPublicId
      ? oldCategory.cloudinaryPublicId
      : "";
    if (replacedPublicId) {
      await destroyCloudinaryAssets([replacedPublicId]);
    }

    const updated = await updateCategory(id, data);

    if (updated) {
      await logActivity({
        action: "UPDATE_CATEGORY",
        entityType: "Category",
        entityId: id,
        entityName: updated.name,
        oldValue: oldCategory,
        newValue: updated,
        req,
      });

      if (replacedPublicId || data.cloudinaryPublicId) {
        await logActivity({
          action: replacedPublicId ? "IMAGE_REPLACED" : "IMAGE_UPLOADED",
          entityType: "Category",
          entityId: id,
          entityName: updated.name,
          oldValue: {
            cloudinaryPublicId: oldCategory.cloudinaryPublicId,
            image: oldCategory.image,
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

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
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

    const category = await CategoryModel.findById(id).lean<any>();
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const success = await deleteCategory(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_CATEGORY" : "DELETE_CATEGORY",
        entityType: "Category",
        entityId: id,
        entityName: category.name,
        oldValue: category,
        req,
      });

      if (permanent && category.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_DELETED",
          entityType: "Category",
          entityId: id,
          entityName: category.name,
          oldValue: {
            cloudinaryPublicId: category.cloudinaryPublicId,
            image: category.image,
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
