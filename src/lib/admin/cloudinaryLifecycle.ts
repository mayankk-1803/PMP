import { cloudinary } from "@/lib/cloudinary";

type DestroyResult = {
  publicId: string;
  result: string;
};

export function uniquePublicIds(ids: Array<string | null | undefined>): string[] {
  return Array.from(new Set(ids.filter((id): id is string => Boolean(id))));
}

export async function destroyCloudinaryAssets(publicIds: Array<string | null | undefined>) {
  const ids = uniquePublicIds(publicIds);
  const results: DestroyResult[] = [];

  for (const publicId of ids) {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    results.push({ publicId, result: String(result.result || "unknown") });
  }

  return results;
}

export function publicIdsRemoved(oldIds: Array<string | null | undefined>, nextIds: Array<string | null | undefined>) {
  const next = new Set(uniquePublicIds(nextIds));
  return uniquePublicIds(oldIds).filter((id) => !next.has(id));
}

