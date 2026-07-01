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

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const ProductSchema = new mongoose.Schema({}, { strict: false });
  const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");

  // Query all active products in backpacks-bags category
  const products = await ProductModel.find({
    category: "backpacks-bags",
    active: true
  });

  console.log(`Found ${products.length} products in category backpacks-bags:`);
  products.forEach((p) => {
    console.log(`- Slug: ${p.slug}, Title: ${p.title || p.name}, Subcategory: ${p.subcategory}, Image: ${p.featuredImage}`);
  });

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
