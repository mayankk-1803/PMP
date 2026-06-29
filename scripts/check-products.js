const mongoose = require('mongoose');
const fs = require('fs');

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

async function checkProducts() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  
  const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'products' });
  const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  const subcats = await ProductModel.distinct('subcategory');
  console.log('Unique subcategory values on products:');
  console.log(subcats);

  const sampleProducts = await ProductModel.find({ subcategory: 'diwali-hampers' }).limit(2).lean();
  console.log('Sample diwali-hampers products:', sampleProducts.map(p => ({ title: p.title || p.name, subcategory: p.subcategory })));

  const countBySubcat = {};
  for (const s of subcats) {
    countBySubcat[s] = await ProductModel.countDocuments({ subcategory: s });
  }
  console.log('Product counts by subcategory:', countBySubcat);

  await mongoose.disconnect();
}

checkProducts().catch(console.error);
