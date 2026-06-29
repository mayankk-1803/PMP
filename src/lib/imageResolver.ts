import { localCatalogImage } from "./localCatalogImages";
import { realCatalogImage } from "./catalogImages";

export function resolveProductImage(product: {
  title?: string;
  name?: string;
  featuredImage?: string;
  featuredImageUrl?: string;
  imageUrl?: string;
  image?: string;
  images?: string[];
  galleryImages?: string[];
  category?: string;
  subcategory?: string;
  slug?: string;
}): string {
  if (!product) return "";
  const titleStr = product.title || product.name || "";
  const dbImage =
    product.featuredImage ||
    product.featuredImageUrl ||
    product.imageUrl ||
    product.image ||
    (product.images && product.images[0]) ||
    (product.galleryImages && product.galleryImages[0]) ||
    "";

  if (dbImage) return dbImage;

  // Fallback to local catalog images
  const localImage = localCatalogImage(titleStr);
  if (localImage) return localImage;

  const realImage = realCatalogImage(
    titleStr,
    product.category || "",
    product.subcategory || "",
    product.slug || titleStr
  );
  if (realImage) return realImage;

  return "";
}

export function resolveCategoryImage(category: {
  name?: string;
  image?: string;
  slug?: string;
}, fallback = ""): string {
  if (!category) return fallback;
  const nameStr = category.name || "";
  if (category.image) return category.image;
  const local = localCatalogImage(nameStr);
  if (local) return local;
  return fallback;
}

export function resolveSubcategoryImage(subcategory: {
  name?: string;
  image?: string;
  slug?: string;
}, fallback = ""): string {
  if (!subcategory) return fallback;
  const nameStr = subcategory.name || "";
  if (subcategory.image) return subcategory.image;
  const local = localCatalogImage(nameStr);
  if (local) return local;
  return fallback;
}
