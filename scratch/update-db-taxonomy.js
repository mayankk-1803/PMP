const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env
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
} catch (e) {}

const DELETED_SUBCATEGORY_SLUGS = [
  // Kits to delete
  "hospital-staff-kits",
  "training-kits",
  "startup-employee-onboarding-kits",
  "leadership-kits",
  "remote-onboarding-kits",
  "sales-team-kits",
  "contractor-kits",
  "pharma-representative-kits",
  "channel-partner-kits",
  "seminar-kits",
  "employee-welcome-kits",
  "executive-kits",
  "partner-kits",
  "real-estate-kits",
  "distributor-kits",
  // Hampers to delete
  "corporate-celebration-hampers",
  "welcome-hampers",
  "luxury-hampers",
  "premium-gourmet-hampers",
  "dry-fruit-hampers",
  "tea-coffee-hampers"
];

const NEW_KITS = [
  { name: "Retailer Kits", slug: "retailer-kits", category: "corporate-kits", parentGroup: "Corporate Kits", order: 9 },
  { name: "Plumber Kits", slug: "plumber-kits", category: "corporate-kits", parentGroup: "Corporate Kits", order: 10 },
  { name: "Painter Kits", slug: "painter-kits", category: "corporate-kits", parentGroup: "Corporate Kits", order: 11 },
  { name: "Engineer Kits", slug: "engineer-kits", category: "corporate-kits", parentGroup: "Corporate Kits", order: 12 }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const SubcategorySchema = new mongoose.Schema({}, { strict: false });
  const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema, "subcategories");

  const CategorySchema = new mongoose.Schema({}, { strict: false });
  const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");

  const ProductSchema = new mongoose.Schema({}, { strict: false });
  const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");

  // Get Category IDs
  const corporateCategory = await CategoryModel.findOne({ slug: "corporate-kits" });
  if (!corporateCategory) {
    console.error("Corporate Kits category not found in DB!");
    process.exit(1);
  }

  // 1. Deactivate deleted subcategories
  const subRes = await SubcategoryModel.updateMany(
    { slug: { $in: DELETED_SUBCATEGORY_SLUGS } },
    { $set: { active: false } }
  );
  console.log(`Deactivated ${subRes.modifiedCount} subcategories.`);

  // 2. Deactivate products belonging to deleted subcategories
  const prodRes = await ProductModel.updateMany(
    { subcategory: { $in: DELETED_SUBCATEGORY_SLUGS } },
    { $set: { active: false, status: "HIDDEN" } }
  );
  console.log(`Deactivated ${prodRes.modifiedCount} products.`);

  // 3. Upsert new kits
  for (const kit of NEW_KITS) {
    const updated = await SubcategoryModel.findOneAndUpdate(
      { slug: kit.slug },
      {
        $set: {
          name: kit.name,
          slug: kit.slug,
          categoryId: corporateCategory._id,
          category: kit.category,
          parentGroup: kit.parentGroup,
          active: true,
          order: kit.order
        }
      },
      { upsert: true, new: true }
    );
    console.log(`Upserted subcategory: ${updated.name} (${updated.slug})`);
  }

  console.log("Database update complete!");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
