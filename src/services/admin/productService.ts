import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { ProductRecord } from "@/lib/admin/types";
import { realCatalogImage } from "@/lib/catalogImages";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel } from "@/models/cmsModels";

const SUPPLEMENTAL_CATALOG_PRODUCTS: ProductRecord[] = [
  {
    id: "supp_christmas_kits",
    title: "Christmas Kits",
    slug: "christmas-kits",
    description: "Christmas gourmet hamper with cookies, cocoa, candles, ornaments, greeting card, and winter-themed premium packaging for corporate gifting.",
    shortDescription: "Christmas kits for branded festive corporate gifting.",
    category: "festive-hampers",
    subcategory: "christmas-kits",
    brand: "PacMyProduct",
    featuredImage: "/images/christmaskit.png",
    galleryImages: ["/images/christmaskit.png"],
    images: ["/images/christmaskit.png"],
    features: ["Logo Branding", "Bulk Packaging", "Corporate Customization"],
    specifications: {},
    tags: ["festive-hampers", "christmas-kits"],
    moq: 50,
    featured: true,
    active: true,
    createdAt: "2026-06-08T00:00:00.000Z",
    updatedAt: "2026-06-08T00:00:00.000Z",
  },
];

const withSupplementalProducts = (products: ProductRecord[]) => {
  const existingSlugs = new Set(products.map((product) => product.slug));
  return [
    ...SUPPLEMENTAL_CATALOG_PRODUCTS.filter((product) => !existingSlugs.has(product.slug)),
    ...products,
  ];
};

export function listProducts(): ProductRecord[] {
  return withSupplementalProducts(listRecords("products").filter((product) => product.active));
}

export async function listAllProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listRecords("products");
  await connectMongoDB();
  const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export function getProductBySlug(slug: string): ProductRecord | null {
  return listRecords("products").find((product) => product.slug === slug) ?? null;
}

const normalizeSpecifications = (specifications: any) => {
  if (!specifications) return {};
  if (specifications instanceof Map) return Object.fromEntries(specifications);
  if (Array.isArray(specifications)) return Object.fromEntries(specifications);
  return specifications;
};

const mapMongoProduct = (product: any): ProductRecord => {
  const title = product.name || product.title || "";
  const category = product.category || "";
  const subcategory = product.subcategory || "";
  const matchedImage = localCatalogImage(title) || realCatalogImage(title, category, subcategory, product.slug || title);
  const sourceImages = product.galleryImages?.length
    ? product.galleryImages
    : product.images?.length
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : [];
  const images = [matchedImage, ...sourceImages].filter((image, index, self) => self.indexOf(image) === index);

  return {
    id: String(product._id),
    title,
    slug: product.slug,
    description: product.description || "",
    shortDescription: product.shortDescription,
    category,
    subcategory,
    brand: product.brand,
    featuredImage: matchedImage,
    galleryImages: images,
    images,
    features: product.features || [],
    specifications: normalizeSpecifications(product.specifications),
    tags: product.tags || [],
    moq: product.moq || 1,
    featured: Boolean(product.featured),
    active: product.status !== "HIDDEN",
    createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
};

export async function getCatalogProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ status: "PUBLISHED" }).sort({ createdAt: -1 }).lean<any[]>();
  return withSupplementalProducts(products.map(mapMongoProduct));
}

export async function getCatalogProductBySlug(slug: string): Promise<ProductRecord | null> {
  const supplementalProduct = SUPPLEMENTAL_CATALOG_PRODUCTS.find((product) => product.slug === slug);
  if (!process.env.MONGODB_URI) return getProductBySlug(slug) ?? supplementalProduct ?? null;
  await connectMongoDB();
  const product = await ProductModel.findOne({ slug, status: "PUBLISHED" }).lean<any>();
  return product ? mapMongoProduct(product) : supplementalProduct ?? null;
}

export async function createProduct(input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = input.galleryImages?.length ? input.galleryImages : input.images ?? [];
    const product = await ProductModel.create({
      name: input.title,
      title: input.title,
      slug: input.slug,
      description: input.description,
      shortDescription: input.shortDescription,
      category: input.category,
      subcategory: input.subcategory,
      brand: input.brand,
      featuredImage: input.featuredImage || images[0],
      galleryImages: images,
      images,
      features: input.features,
      specifications: input.specifications,
      tags: input.tags,
      moq: input.moq,
      featured: input.featured,
      status: input.active ? "PUBLISHED" : "HIDDEN",
      active: input.active,
    });
    return mapMongoProduct(product.toObject());
  }

  return createRecord("products", input);
}

export async function updateProduct(id: string, patch: Partial<ProductRecord> & { status?: string }) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = patch.galleryImages?.length ? patch.galleryImages : patch.images;
    const update: Record<string, unknown> = {
      ...patch,
      name: patch.title,
      featuredImage: patch.featuredImage || images?.[0],
      galleryImages: images,
      status: patch.status ?? (patch.active === false ? "HIDDEN" : patch.active === true ? "PUBLISHED" : undefined),
    };

    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const product = await ProductModel.findByIdAndUpdate(id, { $set: update }, { new: true }).lean<any>();
    return product ? mapMongoProduct(product) : null;
  }

  return updateRecord("products", id, patch);
}

export async function deleteProduct(id: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const result = await ProductModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  return deleteRecord("products", id);
}
