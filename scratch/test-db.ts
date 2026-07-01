import { connectMongoDB } from "../src/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel } from "../src/models/cmsModels";
import * as fs from "fs";
import * as path from "path";

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
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.error("Could not read .env file", e);
}

async function test() {
  console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
  await connectMongoDB();
  
  const productCount = await ProductModel.countDocuments({});
  console.log("Total products in MongoDB:", productCount);
  
  const activeProducts = await ProductModel.countDocuments({ status: "PUBLISHED", isDeleted: { $ne: true } });
  console.log("Published, non-deleted products in MongoDB:", activeProducts);

  const categories = await CategoryModel.find({}).lean();
  console.log("Categories in MongoDB:", categories.map((c: any) => ({ name: c.name, slug: c.slug, parentGroup: c.parentGroup })));

  const subcategories = await SubcategoryModel.find({}).lean();
  console.log("Subcategories count:", subcategories.length);

  const firstFive = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).limit(5).lean();
  console.log("First 5 products images:", firstFive.map((p: any) => ({
    title: p.title || p.name,
    category: p.category,
    subcategory: p.subcategory,
    featuredImage: p.featuredImage,
    images: p.images,
    galleryImages: p.galleryImages
  })));

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
