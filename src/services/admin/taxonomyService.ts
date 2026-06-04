import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { CategoryRecord, SubcategoryRecord } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { CategoryModel, SubcategoryModel } from "@/models/cmsModels";

const toIso = (value: any) => value?.toISOString?.() || new Date().toISOString();

const mapCategory = (category: any): CategoryRecord => ({
  id: String(category._id),
  name: category.name,
  slug: category.slug,
  description: category.description,
  parentGroup: category.parentGroup,
  image: category.image,
  active: category.active !== false,
  createdAt: toIso(category.createdAt),
});

const mapSubcategory = (subcategory: any): SubcategoryRecord => ({
  id: String(subcategory._id),
  name: subcategory.name,
  slug: subcategory.slug,
  categoryId: subcategory.categoryId ? String(subcategory.categoryId) : undefined,
  category: subcategory.category,
  parentGroup: subcategory.parentGroup || "",
  description: subcategory.description,
  image: subcategory.image || "",
  featuredImage: subcategory.featuredImage,
  active: subcategory.active !== false,
  createdAt: toIso(subcategory.createdAt),
});

export async function listAllCategories() {
  if (!process.env.MONGODB_URI) return listRecords("categories");
  await connectMongoDB();
  const categories = await CategoryModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
  return categories.map(mapCategory);
}

export async function createCategory(input: Omit<CategoryRecord, "id" | "createdAt">) {
  if (!process.env.MONGODB_URI) return createRecord("categories", input);
  await connectMongoDB();
  const category = await CategoryModel.create(input);
  return mapCategory(category.toObject());
}

export async function updateCategory(id: string, patch: Partial<CategoryRecord>) {
  if (!process.env.MONGODB_URI) return updateRecord("categories", id, patch);
  await connectMongoDB();
  const category = await CategoryModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
  return category ? mapCategory(category) : null;
}

export async function deleteCategory(id: string) {
  if (!process.env.MONGODB_URI) return deleteRecord("categories", id);
  await connectMongoDB();
  const result = await CategoryModel.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

export async function listAllSubcategories() {
  if (!process.env.MONGODB_URI) return listRecords("subcategories");
  await connectMongoDB();
  const subcategories = await SubcategoryModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
  return subcategories.map(mapSubcategory);
}

export async function createSubcategory(input: Omit<SubcategoryRecord, "id" | "createdAt">) {
  if (!process.env.MONGODB_URI) return createRecord("subcategories", input);
  await connectMongoDB();
  const subcategory = await SubcategoryModel.create(input);
  return mapSubcategory(subcategory.toObject());
}

export async function updateSubcategory(id: string, patch: Partial<SubcategoryRecord>) {
  if (!process.env.MONGODB_URI) return updateRecord("subcategories", id, patch);
  await connectMongoDB();
  const subcategory = await SubcategoryModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
  return subcategory ? mapSubcategory(subcategory) : null;
}

export async function deleteSubcategory(id: string) {
  if (!process.env.MONGODB_URI) return deleteRecord("subcategories", id);
  await connectMongoDB();
  const result = await SubcategoryModel.deleteOne({ _id: id });
  return result.deletedCount > 0;
}
