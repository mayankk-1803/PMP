import { NextResponse } from "next/server";
import {
  BRAND_LOGO_PATHS,
  BRAND_PARTNERS,
  CORPORATE_KIT_SUBCATEGORIES,
  HAMPER_SUBCATEGORIES,
  PROMOTIONAL_CATEGORIES,
  PROMOTIONAL_SUBCATEGORIES,
} from "@/lib/admin/brandKitSyncData";
import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel, CategoryModel, ProductModel, SubcategoryModel } from "@/models/cmsModels";

const PRODUCT_IMAGE_BY_CATEGORY: Record<string, string[]> = {
  pens: [
    "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=1000&auto=format&fit=crop",
  ],
  "t-shirts": [
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop",
  ],
  keychains: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000&auto=format&fit=crop",
  ],
  "diaries-notebooks": [
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=1000&auto=format&fit=crop",
  ],
  caps: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  ],
  "paper-weights": [
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop",
  ],
  "mouse-pads-table-mats": [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop",
  ],
  "table-top-items": [
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
  ],
  "backpacks-bags": [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop",
  ],
};

const PRODUCT_VARIANTS = ["Classic", "Premium", "Executive", "Eco"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function upsertCategory(name: string, slug: string, description: string) {
  return CategoryModel.findOneAndUpdate(
    { slug },
    { $set: { name, slug, description, parentGroup: "Kits & Hampers", active: true } },
    { new: true, upsert: true }
  );
}

export async function POST() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ success: false, message: "MONGODB_URI is not configured" }, { status: 500 });
  }

  await connectMongoDB();
  const corporateCategory = await upsertCategory("Corporate Kits", "corporate-kits", "Corporate, industry, onboarding, partner, and field kits.");
  const hamperCategory = await upsertCategory("Festive Hampers", "festive-hampers", "Festive, welcome, celebration, appreciation, and occasion hampers.");
  const promotionalCategories = await Promise.all(
    PROMOTIONAL_CATEGORIES.map(([name, slug, description]) =>
      CategoryModel.findOneAndUpdate(
        { slug },
        { $set: { name, slug, description, parentGroup: "Promotional Products", active: true } },
        { new: true, upsert: true }
      )
    )
  );
  const promotionalCategoryBySlug = new Map(promotionalCategories.map((category) => [category.slug, category]));

  const promotionalResults = await Promise.all(
    PROMOTIONAL_SUBCATEGORIES.map(([name, slug, categorySlug, description]) => {
      const category = promotionalCategoryBySlug.get(categorySlug);
      return SubcategoryModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            categoryId: category?._id,
            category: categorySlug,
            parentGroup: "Promotional Products",
            description,
            active: true,
          },
        },
        { new: true, upsert: true }
      );
    })
  );

  const kitResults = await Promise.all(
    CORPORATE_KIT_SUBCATEGORIES.map(([name, slug, description]) =>
      SubcategoryModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            categoryId: corporateCategory._id,
            category: "corporate-kits",
            parentGroup: "Corporate Kits",
            description,
            active: true,
          },
        },
        { new: true, upsert: true }
      )
    )
  );

  const hamperResults = await Promise.all(
    HAMPER_SUBCATEGORIES.map(([name, slug, description]) =>
      SubcategoryModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            categoryId: hamperCategory._id,
            category: "festive-hampers",
            parentGroup: "Festive Hampers",
            description,
            active: true,
          },
        },
        { new: true, upsert: true }
      )
    )
  );

  const brandResults = await Promise.all(
    BRAND_PARTNERS.map(([name, slug, industry, category]) =>
      BrandModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            logo: BRAND_LOGO_PATHS[slug] || "",
            cloudinaryPublicId: BRAND_LOGO_PATHS[slug] ? `public/logos/${BRAND_LOGO_PATHS[slug].split("/").pop()}` : "",
            industry,
            category,
            description: `${name} brand partner for ${industry.toLowerCase()} corporate gifting.`,
            active: true,
          },
        },
        { new: true, upsert: true }
      )
    )
  );

  const managedProductSlugs = PROMOTIONAL_SUBCATEGORIES.flatMap(([subcategoryName, subcategorySlug, categorySlug]) =>
    PRODUCT_VARIANTS.map((variant) => `pmp-${subcategorySlug}-${slugify(variant)}`)
  );

  const productResults = await Promise.all(
    PROMOTIONAL_SUBCATEGORIES.flatMap(([subcategoryName, subcategorySlug, categorySlug, subcategoryDescription]) => {
      const category = promotionalCategoryBySlug.get(categorySlug);
      const subcategory = promotionalResults.find((item) => item.slug === subcategorySlug);
      const images = PRODUCT_IMAGE_BY_CATEGORY[categorySlug] || PRODUCT_IMAGE_BY_CATEGORY.pens;

      return PRODUCT_VARIANTS.map((variant, index) => {
        const title = `${variant} ${subcategoryName}`;
        const slug = `pmp-${subcategorySlug}-${slugify(variant)}`;
        const image = images[index % images.length];

        return ProductModel.findOneAndUpdate(
          { slug },
          {
            $set: {
              name: title,
              title,
              slug,
              description: `${subcategoryDescription} ${variant} finish, logo-ready surface, bulk-ready packaging, and corporate gifting quality control.`,
              shortDescription: `${variant} ${subcategoryName.toLowerCase()} for corporate branding and bulk gifting.`,
              categoryId: category?._id,
              subCategoryId: subcategory?._id,
              category: categorySlug,
              subcategory: subcategorySlug,
              brand: "PacMyProduct",
              featuredImage: image,
              galleryImages: [image],
              images: [image],
              features: ["Logo Branding", "Bulk Packaging", "Corporate Customization"],
              tags: ["managed-promotional-sync", categorySlug, subcategorySlug],
              moq: categorySlug === "backpacks-bags" ? 50 : categorySlug === "pens" ? 250 : 100,
              featured: index === 0,
              status: "PUBLISHED",
              active: true,
            },
          },
          { new: true, upsert: true }
        );
      });
    })
  );

  await Promise.all([
    SubcategoryModel.updateMany(
      {
        category: "corporate-kits",
        slug: { $nin: CORPORATE_KIT_SUBCATEGORIES.map(([, slug]) => slug) },
      },
      { $set: { active: false } }
    ),
    CategoryModel.updateMany(
      {
        parentGroup: "Promotional Products",
        slug: { $nin: PROMOTIONAL_CATEGORIES.map(([, slug]) => slug) },
      },
      { $set: { active: false } }
    ),
    SubcategoryModel.updateMany(
      {
        parentGroup: "Promotional Products",
        slug: { $nin: PROMOTIONAL_SUBCATEGORIES.map(([, slug]) => slug) },
      },
      { $set: { active: false } }
    ),
    SubcategoryModel.updateMany(
      {
        category: "festive-hampers",
        slug: { $nin: HAMPER_SUBCATEGORIES.map(([, slug]) => slug) },
      },
      { $set: { active: false } }
    ),
    BrandModel.updateMany(
      { slug: { $nin: BRAND_PARTNERS.map(([, slug]) => slug) } },
      { $set: { active: false } }
    ),
    ProductModel.updateMany(
      {
        tags: "managed-promotional-sync",
        slug: { $nin: managedProductSlugs },
      },
      { $set: { status: "HIDDEN", active: false } }
    ),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      corporateKitSubcategories: kitResults.length,
      hamperSubcategories: hamperResults.length,
      promotionalCategories: promotionalCategories.length,
      promotionalSubcategories: promotionalResults.length,
      promotionalProducts: productResults.length,
      brands: brandResults.length,
      cloudinaryLogoStatus: process.env.CLOUDINARY_CLOUD_NAME ? "configured" : "not_configured",
    },
  });
}
