import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { BrandRecord } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel } from "@/models/cmsModels";

const mapBrand = (brand: any): BrandRecord => ({
  id: String(brand._id),
  name: brand.name,
  slug: brand.slug,
  logo: brand.logo,
  cloudinaryPublicId: brand.cloudinaryPublicId,
  industry: brand.industry,
  category: brand.category,
  description: brand.description,
  order: brand.order || 0,
  active: brand.active !== false,
  createdAt: brand.createdAt?.toISOString?.() || new Date().toISOString(),
});

export async function listAllBrands() {
  if (!process.env.MONGODB_URI) return listRecords("brands");
  await connectMongoDB();
  const brands = await BrandModel.find({}).sort({ order: 1, name: 1 }).lean<any[]>();
  return brands.map(mapBrand);
}

export async function createBrand(input: Omit<BrandRecord, "id" | "createdAt">) {
  if (!process.env.MONGODB_URI) return createRecord("brands", input);
  await connectMongoDB();
  const brand = await BrandModel.create(input);
  return mapBrand(brand.toObject());
}

export async function updateBrand(id: string, patch: Partial<BrandRecord>) {
  if (!process.env.MONGODB_URI) return updateRecord("brands", id, patch);
  await connectMongoDB();
  const brand = await BrandModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
  return brand ? mapBrand(brand) : null;
}

export async function deleteBrand(id: string) {
  if (!process.env.MONGODB_URI) return deleteRecord("brands", id);
  await connectMongoDB();
  const result = await BrandModel.deleteOne({ _id: id });
  return result.deletedCount > 0;
}
