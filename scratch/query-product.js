const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

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

const ProductSchema = new mongoose.Schema({}, { strict: false });
const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const product = await ProductModel.findOne({ name: "Painter Kits 3" }).lean();
  console.log("Raw product from DB:", JSON.stringify(product, null, 2));

  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
