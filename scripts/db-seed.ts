import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Load environment variables manually
if (fs.existsSync(".env")) {
  const content = fs.readFileSync(".env", "utf8");
  content.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  });
}

import {
  PROFESSIONAL_BRANDS,
  PROFESSIONAL_CATEGORIES,
  PROFESSIONAL_PRODUCTS,
  PROFESSIONAL_SUBCATEGORIES,
} from "../src/lib/admin/professionalCatalogSeed";
import { DEFAULT_ADMINS } from "../src/lib/admin/seed";

async function runSeed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in env");
    process.exit(1);
  }

  console.log("Connecting to MongoDB:", uri.split("@")[1] || uri);
  await mongoose.connect(uri);
  console.log("Connected successfully");

  // Define schemas
  const BrandSchema = new mongoose.Schema({ name: String, slug: String, logo: String, active: Boolean }, { collection: "brands" });
  const CategorySchema = new mongoose.Schema({ name: String, slug: String, description: String, image: String, parentGroup: String, active: Boolean }, { collection: "categories" });
  const SubcategorySchema = new mongoose.Schema({ name: String, slug: String, category: String, parentGroup: String, image: String, active: Boolean }, { collection: "subcategories" });
  const ProductSchema = new mongoose.Schema({
    name: String, title: String, slug: String, description: String, shortDescription: String,
    categoryId: mongoose.Schema.Types.ObjectId, subCategoryId: mongoose.Schema.Types.ObjectId, brandId: mongoose.Schema.Types.ObjectId,
    category: String, subcategory: String, brand: String, featuredImage: String, galleryImages: [String], images: [String],
    features: [String], tags: [String], moq: Number, status: String, active: Boolean
  }, { collection: "products" });
  const AdminSchema = new mongoose.Schema({ name: String, email: String, passwordHash: String, role: String, active: Boolean }, { collection: "admins" });

  const BrandModel = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
  const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);
  const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema);
  const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);
  const AdminModel = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  console.log("Dropping existing collections...");
  await Promise.all([
    ProductModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    SubcategoryModel.deleteMany({}),
    BrandModel.deleteMany({}),
    AdminModel.deleteMany({ email: "pmpadmin@gmail.com" }),
  ]);
  console.log("Cleared old data.");

  console.log("Inserting categories...");
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

  console.log("Inserting subcategories...");
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

  console.log("Inserting brands...");
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

  console.log("Inserting products...");
  await ProductModel.insertMany(
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

  console.log("Creating default admin...");
  const [admin] = DEFAULT_ADMINS;
  await AdminModel.create({
    name: admin.name,
    email: admin.email,
    passwordHash: admin.passwordHash,
    role: admin.role,
    active: admin.active,
  });

  console.log("Seeding complete successfully!");
  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
