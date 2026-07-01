const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load env
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
  "corporate-celebration-hampers",
  "welcome-hampers",
  "luxury-hampers",
  "premium-gourmet-hampers",
  "dry-fruit-hampers",
  "tea-coffee-hampers"
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const ProductSchema = new mongoose.Schema({}, { strict: false });
  const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");

  const activeDeletedProducts = await ProductModel.find({
    subcategory: { $in: DELETED_SUBCATEGORY_SLUGS },
    active: true
  });

  console.log(`Active products belonging to deleted subcategories: ${activeDeletedProducts.length}`);
  if (activeDeletedProducts.length > 0) {
    activeDeletedProducts.forEach((p) => {
      console.log(`- ${p.title || p.name} (Subcategory: ${p.subcategory})`);
    });
  } else {
    console.log("DB check passed! No active products belong to deprecated subcategories.");
  }
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
