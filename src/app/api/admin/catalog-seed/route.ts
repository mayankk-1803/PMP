import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { AdminModel, BrandModel, CategoryModel, ProductModel, SubcategoryModel } from "@/models/cmsModels";
import { DEFAULT_ADMINS } from "@/lib/admin/seed";
import {
  PROFESSIONAL_BRANDS,
  PROFESSIONAL_CATEGORIES,
  PROFESSIONAL_IMAGE_AUDIT,
  PROFESSIONAL_PRODUCTS,
  PROFESSIONAL_SUBCATEGORIES,
} from "@/lib/admin/professionalCatalogSeed";

export async function POST() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ success: false, message: "MONGODB_URI is not configured" }, { status: 503 });
  }

  await connectMongoDB();

  await Promise.all([
    ProductModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    SubcategoryModel.deleteMany({}),
    BrandModel.deleteMany({}),
    AdminModel.deleteMany({ email: "pmpadmin@gmail.com" }),
  ]);

  const categories = await CategoryModel.insertMany(
    PROFESSIONAL_CATEGORIES.map((category) => ({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      parentGroup: category.parentGroup,
      active: category.active,
    }))
  );

  const subcategories = await SubcategoryModel.insertMany(
    PROFESSIONAL_SUBCATEGORIES.map((subcategory) => ({
      name: subcategory.name,
      slug: subcategory.slug,
      category: subcategory.category,
      parentGroup: subcategory.parentGroup,
      image: subcategory.image,
      active: subcategory.active,
    }))
  );

  const brands = await BrandModel.insertMany(
    PROFESSIONAL_BRANDS.map((brand) => ({
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo,
      active: brand.active,
    }))
  );

  const categoryBySlug = new Map(categories.map((category) => [category.slug, category._id]));
  const subcategoryBySlug = new Map(subcategories.map((subcategory) => [subcategory.slug, subcategory._id]));
  const brandByName = new Map(brands.map((brand) => [brand.name, brand._id]));

  const products = await ProductModel.insertMany(
    PROFESSIONAL_PRODUCTS.map((product) => ({
      name: product.title,
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      categoryId: categoryBySlug.get(product.category),
      subCategoryId: subcategoryBySlug.get(product.subcategory),
      brandId: brandByName.get(product.brand || "PacMyProduct"),
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      featuredImage: product.images[0],
      galleryImages: product.images,
      images: product.images,
      features: product.features,
      tags: product.tags,
      moq: product.moq,
      status: product.active ? "PUBLISHED" : "HIDDEN",
      active: product.active,
    }))
  );

  const [admin] = DEFAULT_ADMINS;
  await AdminModel.create({
    name: admin.name,
    email: admin.email,
    passwordHash: admin.passwordHash,
    role: admin.role,
    active: admin.active,
  });

  return NextResponse.json({
    success: true,
    inserted: {
      products: products.length,
      categories: categories.length,
      subcategories: subcategories.length,
      brands: brands.length,
      admins: 1,
    },
    imageAudit: PROFESSIONAL_IMAGE_AUDIT,
  });
}
