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

async function runMigration() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    parentGroup: String,
    description: String,
    image: String,
    active: Boolean,
    isDeleted: Boolean
  }, { timestamps: true, collection: 'categories' });

  const SubcategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    category: String,
    parentGroup: String,
    image: String,
    active: Boolean,
    isDeleted: Boolean
  }, { timestamps: true, collection: 'subcategories' });

  const ProductSchema = new mongoose.Schema({
    name: String,
    title: String,
    slug: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    subCategoryId: mongoose.Schema.Types.ObjectId,
    category: String,
    subcategory: String,
    images: [String],
    galleryImages: [String]
  }, { timestamps: true, collection: 'products' });

  const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
  const SubcategoryModel = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
  const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  // 1. Ensure Decoratives category and Decorative subcategory exist
  let decorativesCategory = await CategoryModel.findOne({ slug: 'decoratives', isDeleted: { $ne: true } });
  if (!decorativesCategory) {
    decorativesCategory = await CategoryModel.create({
      name: 'Decoratives',
      slug: 'decoratives',
      parentGroup: 'Promotional Products',
      description: 'Elegant custom items and decoratives for corporate environments, desktop gifting, and recognition events.',
      image: '',
      active: true,
      isDeleted: false
    });
    console.log('Created Decoratives category');
  } else {
    console.log('Decoratives category already exists');
  }

  let decorativeSubcategory = await SubcategoryModel.findOne({ slug: 'decorative', isDeleted: { $ne: true } });
  if (!decorativeSubcategory) {
    decorativeSubcategory = await SubcategoryModel.create({
      name: 'Decorative',
      slug: 'decorative',
      categoryId: decorativesCategory._id,
      category: 'decoratives',
      parentGroup: 'Promotional Products',
      image: '',
      active: true,
      isDeleted: false
    });
    console.log('Created Decorative subcategory');
  } else {
    console.log('Decorative subcategory already exists');
  }

  // 2. Ensure Household Utilities category and Household Utilities subcategory exist
  let householdCategory = await CategoryModel.findOne({ slug: 'household-utilities', isDeleted: { $ne: true } });
  if (!householdCategory) {
    householdCategory = await CategoryModel.create({
      name: 'Household Utilities',
      slug: 'household-utilities',
      parentGroup: 'Promotional Products',
      description: 'Useful everyday home appliances and utilities customized with custom brand logos.',
      image: '',
      active: true,
      isDeleted: false
    });
    console.log('Created Household Utilities category');
  } else {
    console.log('Household Utilities category already exists');
  }

  let householdSubcategory = await SubcategoryModel.findOne({ slug: 'household-utilities', isDeleted: { $ne: true } });
  if (!householdSubcategory) {
    householdSubcategory = await SubcategoryModel.create({
      name: 'Household Utilities',
      slug: 'household-utilities',
      categoryId: householdCategory._id,
      category: 'household-utilities',
      parentGroup: 'Promotional Products',
      image: '',
      active: true,
      isDeleted: false
    });
    console.log('Created Household Utilities subcategory');
  } else {
    console.log('Decorative subcategory already exists');
  }

  // 3. Migrate Wired products ('bluetooth-speaker') to Household Utilities
  const result = await ProductModel.updateMany(
    { subcategory: 'bluetooth-speaker' },
    {
      $set: {
        category: 'household-utilities',
        subcategory: 'household-utilities',
        categoryId: householdCategory._id,
        subCategoryId: householdSubcategory._id
      }
    }
  );
  console.log(`Successfully migrated ${result.modifiedCount} products from Electronics/Wired to Household Utilities/Household Utilities.`);

  // 4. Mark old Wired subcategory as deleted
  const deleteResult = await SubcategoryModel.updateOne(
    { slug: 'bluetooth-speaker' },
    {
      $set: {
        active: false,
        isDeleted: true,
        deletedAt: new Date()
      }
    }
  );
  console.log(`Marked old 'bluetooth-speaker' subcategory as deleted: ${deleteResult.modifiedCount} records modified.`);

  await mongoose.disconnect();
  console.log('Database migration completed successfully.');
}

runMigration().catch(console.error);
