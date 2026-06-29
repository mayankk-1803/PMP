const mongoose = require('mongoose');
const fs = require('fs');

// Load environment variables manually
if (fs.existsSync('.env')) {
  const content = fs.readFileSync('.env', 'utf8');
  content.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key] = val;
    }
  });
}

async function checkSubcategories() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const SubcategorySchema = new mongoose.Schema({}, { strict: false, collection: 'subcategories' });
  const SubcategoryModel = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);

  const subcats = await SubcategoryModel.find({ active: true }).lean();
  console.log('Active Subcategories:');
  subcats.forEach(sub => {
    console.log(`- ID: ${sub._id}, Name: "${sub.name}", Slug: "${sub.slug}", Category: "${sub.category}", ParentGroup: "${sub.parentGroup}"`);
  });

  const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'products' });
  const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  const productsCount = await ProductModel.countDocuments();
  console.log(`Total Products: ${productsCount}`);

  await mongoose.disconnect();
}

checkSubcategories().catch(console.error);
