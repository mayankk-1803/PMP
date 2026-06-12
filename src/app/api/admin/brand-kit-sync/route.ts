import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import fs from "fs";
import path from "path";
import { cloudinary } from "@/lib/cloudinary";
import {
  BRAND_LOGO_PATHS,
  BRAND_PARTNERS,
  CORPORATE_KIT_SUBCATEGORIES,
  HAMPER_SUBCATEGORIES,
  PROMOTIONAL_CATEGORIES,
  PROMOTIONAL_SUBCATEGORIES,
} from "@/lib/admin/brandKitSyncData";
import { localCatalogImage } from "@/lib/localCatalogImages";
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
  bags: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop",
  ],
};

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  bags: "/images/ecopackback.png",
  "t-shirts": "/images/premiumcorporatetshirt.png",
  caps: "/images/keychain.png",
  keychains: "/images/keychain.png",
  "diaries-notebooks": "/images/leathermat.png",
  "table-top": "/images/tabletopup.png",
  "paper-weight": "/images/paperweight.png",
  "table-mats": "/images/leathermat.png",
  "mouse-pad": "/images/mousepad.png",
  "desk-organiser": "/images/tabletopup.png",
};

const PRODUCT_VARIANTS = ["Classic", "Premium", "Executive", "Eco"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Helper to upload a local asset to Cloudinary
async function uploadToCloudinary(localPath: string, folder: string, publicId: string): Promise<{ url: string; publicId: string } | null> {
  if (!localPath || !localPath.startsWith("/")) return null;
  const absolutePath = path.join(process.cwd(), "public", localPath);
  if (!fs.existsSync(absolutePath)) return null;

  try {
    const result = await cloudinary.uploader.upload(absolutePath, {
      folder: `pacmyproduct/${folder}`,
      public_id: publicId,
      overwrite: true,
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`Failed to upload ${localPath} to Cloudinary:`, error);
    return null;
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ success: false, message: "MONGODB_URI is not configured" }, { status: 500 });
  }

  await connectMongoDB();

  // 1. Sync Corporate Kits and Festive Hampers main categories
  const corporateCategory = await CategoryModel.findOneAndUpdate(
    { slug: "corporate-kits" },
    { 
      $set: { 
        name: "Corporate Kits", 
        slug: "corporate-kits", 
        description: "Corporate, industry, onboarding, partner, and field kits.", 
        parentGroup: "Kits & Hampers", 
        active: true,
        order: 11
      } 
    },
    { new: true, upsert: true }
  );

  const hamperCategory = await CategoryModel.findOneAndUpdate(
    { slug: "festive-hampers" },
    { 
      $set: { 
        name: "Festive Hampers", 
        slug: "festive-hampers", 
        description: "Festive, welcome, celebration, appreciation, and occasion hampers.", 
        parentGroup: "Kits & Hampers", 
        active: true,
        order: 12
      } 
    },
    { new: true, upsert: true }
  );

  // 2. Sync Flat Promotional Categories
  const promotionalCategories = await Promise.all(
    PROMOTIONAL_CATEGORIES.map(async ([name, slug, description], index) => {
      const defaultImg = CATEGORY_DEFAULT_IMAGES[slug] || "/images/joiningkit.png";
      const cloudUpload = await uploadToCloudinary(defaultImg, "categories", slug);
      
      return CategoryModel.findOneAndUpdate(
        { slug },
        { 
          $set: { 
            name, 
            slug, 
            description, 
            parentGroup: "Promotional Products", 
            active: true,
            order: index + 1,
            image: cloudUpload?.url || defaultImg,
            cloudinaryPublicId: cloudUpload?.publicId || ""
          } 
        },
        { new: true, upsert: true }
      );
    })
  );
  const promotionalCategoryBySlug = new Map(promotionalCategories.map((category) => [category.slug, category]));

  // 3. Sync Promotional Subcategories
  const promotionalSubcategories = await Promise.all(
    PROMOTIONAL_SUBCATEGORIES.map(async ([name, slug, categorySlug, description], index) => {
      const category = promotionalCategoryBySlug.get(categorySlug);
      const defaultImg = CATEGORY_DEFAULT_IMAGES[categorySlug] || "/images/joiningkit.png";
      const cloudUpload = await uploadToCloudinary(defaultImg, "subcategories", slug);

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
            order: index + 1,
            image: cloudUpload?.url || defaultImg,
            cloudinaryPublicId: cloudUpload?.publicId || ""
          },
        },
        { new: true, upsert: true }
      );
    })
  );

  // 4. Sync Corporate Kits Subcategories with exact requested ordering
  const kitSubcategories = await Promise.all(
    CORPORATE_KIT_SUBCATEGORIES.map(async ([name, slug, description], index) => {
      const defaultImg = localCatalogImage(name) || "/images/joiningkit.png";
      const cloudUpload = await uploadToCloudinary(defaultImg, "subcategories", slug);

      return SubcategoryModel.findOneAndUpdate(
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
            order: index + 1,
            image: cloudUpload?.url || defaultImg,
            cloudinaryPublicId: cloudUpload?.publicId || ""
          },
        },
        { new: true, upsert: true }
      );
    })
  );

  // 5. Sync Festive Hampers Subcategories
  const hamperSubcategories = await Promise.all(
    HAMPER_SUBCATEGORIES.map(async ([name, slug, description], index) => {
      const defaultImg = localCatalogImage(name) || "/images/diwalihampers.png";
      const cloudUpload = await uploadToCloudinary(defaultImg, "subcategories", slug);

      return SubcategoryModel.findOneAndUpdate(
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
            order: index + 1,
            image: cloudUpload?.url || defaultImg,
            cloudinaryPublicId: cloudUpload?.publicId || ""
          },
        },
        { new: true, upsert: true }
      );
    })
  );

  // 6. Sync Brands with Cloudinary logo uploading
  const brandResults = await Promise.all(
    BRAND_PARTNERS.map(async ([name, slug, industry, category], index) => {
      const localLogo = BRAND_LOGO_PATHS[slug] || "/logos/fallback.png";
      const cloudUpload = await uploadToCloudinary(localLogo, "brands", slug);

      return BrandModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            name,
            slug,
            logo: cloudUpload?.url || localLogo,
            cloudinaryPublicId: cloudUpload?.publicId || "",
            industry,
            category,
            description: `${name} brand partner for premium custom-branded ${category.toLowerCase()} and corporate gifting options.`,
            active: true,
            order: index + 1,
          },
        },
        { new: true, upsert: true }
      );
    })
  );

  // 7. Sync Products dynamically for promotional subcategories
  const managedProductSlugs = PROMOTIONAL_SUBCATEGORIES.flatMap(([subcategoryName, subcategorySlug, categorySlug]) =>
    PRODUCT_VARIANTS.map((variant) => `pmp-${subcategorySlug}-${slugify(variant)}`)
  );

  const productResults = await Promise.all(
    PROMOTIONAL_SUBCATEGORIES.flatMap(([subcategoryName, subcategorySlug, categorySlug, subcategoryDescription]) => {
      const category = promotionalCategoryBySlug.get(categorySlug);
      const subcategory = promotionalSubcategories.find((item) => item.slug === subcategorySlug);
      const images = PRODUCT_IMAGE_BY_CATEGORY[categorySlug] || PRODUCT_IMAGE_BY_CATEGORY.pens;

      return PRODUCT_VARIANTS.map(async (variant, index) => {
        const title = `${variant} ${subcategoryName}`;
        const slug = `pmp-${subcategorySlug}-${slugify(variant)}`;
        const localImg = localCatalogImage(title) || images[index % images.length];
        
        let imageUrl = localImg;
        let cloudPublicId = "";
        
        if (localImg.startsWith("/")) {
          const cloudUpload = await uploadToCloudinary(localImg, "products", slug);
          if (cloudUpload) {
            imageUrl = cloudUpload.url;
            cloudPublicId = cloudUpload.publicId;
          }
        }

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
              featuredImage: imageUrl,
              galleryImages: [imageUrl],
              images: [imageUrl],
              cloudinaryPublicId: cloudPublicId,
              features: ["Logo Branding", "Bulk Packaging", "Corporate Customization"],
              tags: ["managed-promotional-sync", categorySlug, subcategorySlug],
              moq: (categorySlug as string) === "bags" ? 50 : (categorySlug as string) === "pens" ? 250 : 100,
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

  // 8. Deactivate items not included in the sync lists
  const activeCategorySlugs = [
    "corporate-kits",
    "festive-hampers",
    ...PROMOTIONAL_CATEGORIES.map(([, slug]) => slug),
  ];
  const activeSubcategorySlugs = [
    ...PROMOTIONAL_SUBCATEGORIES.map(([, slug]) => slug),
    ...CORPORATE_KIT_SUBCATEGORIES.map(([, slug]) => slug),
    ...HAMPER_SUBCATEGORIES.map(([, slug]) => slug),
  ];
  const activeBrandSlugs = BRAND_PARTNERS.map(([, slug]) => slug);

  await Promise.all([
    CategoryModel.updateMany(
      { slug: { $nin: activeCategorySlugs } },
      { $set: { active: false } }
    ),
    SubcategoryModel.updateMany(
      { slug: { $nin: activeSubcategorySlugs } },
      { $set: { active: false } }
    ),
    BrandModel.updateMany(
      { slug: { $nin: activeBrandSlugs } },
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
      corporateKitSubcategories: kitSubcategories.length,
      hamperSubcategories: hamperSubcategories.length,
      promotionalCategories: promotionalCategories.length,
      promotionalSubcategories: promotionalSubcategories.length,
      promotionalProducts: productResults.length,
      brands: brandResults.length,
      cloudinaryStatus: "fully_synchronized",
    },
  });
}
