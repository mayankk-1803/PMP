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

async function checkWomensDay() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  
  const ProductSchema = new mongoose.Schema({}, { strict: false, collection: 'products' });
  const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  const products = await ProductModel.find({ subcategory: 'womens-day-gifts' }).lean();
  console.log('Women\'s Day Gifts products:');
  console.log(JSON.stringify(products, null, 2));

  await mongoose.disconnect();
}

checkWomensDay().catch(console.error);
