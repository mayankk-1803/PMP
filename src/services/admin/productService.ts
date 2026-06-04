import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { ProductRecord } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel } from "@/models/cmsModels";

export function listProducts(): ProductRecord[] {
  return listRecords("products").filter((product) => product.active);
}

export async function listAllProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listRecords("products");
  await connectMongoDB();
  const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export function getProductBySlug(slug: string): ProductRecord | null {
  return listRecords("products").find((product) => product.slug === slug) ?? null;
}

const normalizeSpecifications = (specifications: any) => {
  if (!specifications) return {};
  if (specifications instanceof Map) return Object.fromEntries(specifications);
  if (Array.isArray(specifications)) return Object.fromEntries(specifications);
  return specifications;
};

const mapMongoProduct = (product: any): ProductRecord => ({
  id: String(product._id),
  title: product.name || product.title,
  slug: product.slug,
  description: product.description || "",
  shortDescription: product.shortDescription,
  category: product.category || "",
  subcategory: product.subcategory || "",
  brand: product.brand,
  featuredImage: product.featuredImage || product.galleryImages?.[0] || product.images?.[0],
  galleryImages: product.galleryImages || product.images || [],
  images: product.galleryImages?.length ? product.galleryImages : product.images?.length ? product.images : product.featuredImage ? [product.featuredImage] : [],
  features: product.features || [],
  specifications: normalizeSpecifications(product.specifications),
  tags: product.tags || [],
  moq: product.moq || 1,
  featured: Boolean(product.featured),
  active: product.status !== "HIDDEN",
  createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
  updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
});

export async function getCatalogProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ status: "PUBLISHED" }).sort({ createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export async function getCatalogProductBySlug(slug: string): Promise<ProductRecord | null> {
  if (!process.env.MONGODB_URI) return getProductBySlug(slug);
  await connectMongoDB();
  const product = await ProductModel.findOne({ slug, status: "PUBLISHED" }).lean<any>();
  return product ? mapMongoProduct(product) : null;
}

export async function createProduct(input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = input.galleryImages?.length ? input.galleryImages : input.images ?? [];
    const product = await ProductModel.create({
      name: input.title,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      category: input.category,
      subcategory: input.subcategory,
      brand: input.brand,
      featuredImage: input.featuredImage || images[0],
      galleryImages: images,
      images,
      features: input.features,
      specifications: input.specifications,
      tags: input.tags,
      moq: input.moq,
      featured: input.featured,
      status: input.active ? "PUBLISHED" : "HIDDEN",
      active: input.active,
    });
    return mapMongoProduct(product.toObject());
  }

  return createRecord("products", input);
}

export async function updateProduct(id: string, patch: Partial<ProductRecord> & { status?: string }) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = patch.galleryImages?.length ? patch.galleryImages : patch.images;
    const update: Record<string, unknown> = {
      ...patch,
      name: patch.title,
      featuredImage: patch.featuredImage || images?.[0],
      galleryImages: images,
      status: patch.status ?? (patch.active === false ? "HIDDEN" : patch.active === true ? "PUBLISHED" : undefined),
    };

    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const product = await ProductModel.findByIdAndUpdate(id, { $set: update }, { new: true }).lean<any>();
    return product ? mapMongoProduct(product) : null;
  }

  return updateRecord("products", id, patch);
}

export async function deleteProduct(id: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const result = await ProductModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  return deleteRecord("products", id);
}
