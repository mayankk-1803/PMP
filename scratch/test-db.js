const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Manually load .env file
try {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val.trim();
      }
    });
  }
} catch (e) {
  console.error("Could not read .env file", e);
}

// Define Schema roughly so we don't need imports
const ProductSchema = new mongoose.Schema({}, { strict: false });
const CategorySchema = new mongoose.Schema({}, { strict: false });
const SubcategorySchema = new mongoose.Schema({}, { strict: false });

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");
const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");
const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema, "subcategories");

async function test() {
  console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined!");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  
  const productCount = await ProductModel.countDocuments({});
  console.log("Total products in MongoDB:", productCount);
  
  const activeProducts = await ProductModel.countDocuments({ status: "PUBLISHED", isDeleted: { $ne: true } });
  console.log("Published, non-deleted products in MongoDB:", activeProducts);

  const categories = await CategoryModel.find({}).lean();
  console.log("Categories in MongoDB:", categories.map((c) => ({ name: c.name, slug: c.slug, parentGroup: c.parentGroup })));

  const subcategories = await SubcategoryModel.find({}).lean();
  console.log("Subcategories count:", subcategories.length);

  const firstFive = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).limit(5).lean();
  console.log("First 5 products images:", JSON.stringify(firstFive.map((p) => ({
    title: p.title || p.name,
    category: p.category,
    subcategory: p.subcategory,
    featuredImage: p.featuredImage,
    images: p.images,
    galleryImages: p.galleryImages
  })), null, 2));

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
