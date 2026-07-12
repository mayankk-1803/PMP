import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { ProductRecord } from "@/lib/admin/types";
import { realCatalogImage } from "@/lib/catalogImages";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { connectMongoDB } from "@/lib/mongodb";
import { destroyCloudinaryAssets, uniquePublicIds } from "@/lib/admin/cloudinaryLifecycle";
import { ProductModel } from "@/models/cmsModels";
import { resolveProductImage } from "@/lib/imageResolver";
import { getCanonicalCategorySlug, getCanonicalSubcategorySlug, getCategorySlugAliases, getSubcategorySlugAliases, cleanProductTitle } from "@/lib/slugResolver";

export function listProducts(): ProductRecord[] {
  return listRecords("products").filter((product) => product.active).map(p => ({
    ...p,
    title: cleanProductTitle(p.title),
    category: getCanonicalCategorySlug(p.category) || p.category || "",
    subcategory: getCanonicalSubcategorySlug(p.subcategory) || p.subcategory || "",
  }));
}

export async function listAllProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export async function searchProducts(options: {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  active?: string;
  featured?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) {
  await connectMongoDB();

  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
  const query: Record<string, any> = { isDeleted: { $ne: true } };

  if (options.search) {
    const cleanSearch = options.search.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isPenQuery = cleanSearch.includes("pen") || cleanSearch === "pens" || cleanSearch === "pen";
    const isCapQuery = cleanSearch.includes("cap") || cleanSearch === "caps" || cleanSearch === "cap";
    const isTableTopQuery = cleanSearch.includes("table") || cleanSearch.includes("mousepad") || cleanSearch.includes("paperweight") || cleanSearch.includes("organiser") || cleanSearch.includes("organizer") || cleanSearch.includes("tablemat") || cleanSearch.includes("tabletop");
    const isDiaryQuery = cleanSearch.includes("diar") || cleanSearch.includes("notebook") || cleanSearch.includes("diary") || cleanSearch.includes("diaries");

    if (isPenQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("pens") } },
        { subcategory: { $in: getSubcategorySlugAliases("pens") } }
      ];
    } else if (isCapQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("caps") } },
        { subcategory: { $in: getSubcategorySlugAliases("caps") } }
      ];
    } else if (isTableTopQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("table-top") } },
        { subcategory: { $in: getSubcategorySlugAliases("table-top") } }
      ];
    } else if (isDiaryQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("diaries-notebooks") } },
        { subcategory: { $in: getSubcategorySlugAliases("diaries-notebooks") } }
      ];
    } else {
      query.$text = { $search: options.search };
    }
  }
  if (options.category) query.category = { $in: getCategorySlugAliases(options.category) };
  if (options.subcategory) query.subcategory = { $in: getSubcategorySlugAliases(options.subcategory) };
  if (options.brand) query.brand = options.brand;
  if (options.active === "true") query.status = { $ne: "HIDDEN" };
  if (options.active === "false") query.status = "HIDDEN";
  if (options.featured === "true") query.featured = true;
  if (options.featured === "false") query.featured = { $ne: true };

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    name: { title: 1, name: 1 },
    oldest: { createdAt: 1 },
    moq: { moq: 1 },
    price: { price: 1 },
    order: { order: 1, createdAt: -1 },
    newest: { createdAt: -1 },
  };
  const sort = sortMap[options.sortBy || "newest"] || sortMap.newest;
  const projection = options.search ? { score: { $meta: "textScore" } } : undefined;
  const mongoSort: any = options.search && !options.sortBy ? { score: { $meta: "textScore" }, createdAt: -1 } : sort;

  const [products, total] = await Promise.all([
    ProductModel.find(query, projection)
      .sort(mongoSort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<any[]>(),
    ProductModel.countDocuments(query),
  ]);

  return {
    data: products.map(mapMongoProduct),
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

export async function searchCatalogProducts(options: {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  featured?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) {
  await connectMongoDB();

  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(1000, Math.max(1, Number(options.limit) || 1000));
  const query: Record<string, any> = { status: "PUBLISHED", isDeleted: { $ne: true } };
  
  if (options.search) {
    const cleanSearch = options.search.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isPenQuery = cleanSearch.includes("pen") || cleanSearch === "pens" || cleanSearch === "pen";
    const isCapQuery = cleanSearch.includes("cap") || cleanSearch === "caps" || cleanSearch === "cap";
    const isTableTopQuery = cleanSearch.includes("table") || cleanSearch.includes("mousepad") || cleanSearch.includes("paperweight") || cleanSearch.includes("organiser") || cleanSearch.includes("organizer") || cleanSearch.includes("tablemat") || cleanSearch.includes("tabletop");
    const isDiaryQuery = cleanSearch.includes("diar") || cleanSearch.includes("notebook") || cleanSearch.includes("diary") || cleanSearch.includes("diaries");

    if (isPenQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("pens") } },
        { subcategory: { $in: getSubcategorySlugAliases("pens") } }
      ];
    } else if (isCapQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("caps") } },
        { subcategory: { $in: getSubcategorySlugAliases("caps") } }
      ];
    } else if (isTableTopQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("table-top") } },
        { subcategory: { $in: getSubcategorySlugAliases("table-top") } }
      ];
    } else if (isDiaryQuery) {
      query.$or = [
        { $text: { $search: options.search } },
        { category: { $in: getCategorySlugAliases("diaries-notebooks") } },
        { subcategory: { $in: getSubcategorySlugAliases("diaries-notebooks") } }
      ];
    } else {
      query.$text = { $search: options.search };
    }
  }
  
  if (options.subcategory && options.subcategory !== "all") {
    query.subcategory = { $in: getSubcategorySlugAliases(options.subcategory) };
  } else if (options.category && options.category !== "all") {
    const categoryFilters = getCategorySlugAliases(options.category);
    query.$and = [{ $or: [{ category: { $in: categoryFilters } }, { subcategory: { $in: categoryFilters } }] }];
  }
  if (options.brand) query.brand = options.brand;
  if (options.featured === "true") query.featured = true;
  if (options.featured === "false") query.featured = { $ne: true };

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    name: { title: 1, name: 1 },
    oldest: { createdAt: 1 },
    moq: { moq: 1 },
    price: { price: 1 },
    order: { order: 1, createdAt: -1 },
    newest: { createdAt: -1 },
  };
  const projection = options.search ? { score: { $meta: "textScore" } } : undefined;
  const sort: any = options.search && !options.sortBy ? { score: { $meta: "textScore" }, createdAt: -1 } : sortMap[options.sortBy || "order"] || sortMap.order;

  const [products, total] = await Promise.all([
    ProductModel.find(query, projection)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<any[]>(),
    ProductModel.countDocuments(query),
  ]);

  return {
    data: products.map(mapMongoProduct),
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
}

export function getProductBySlug(slug: string): ProductRecord | null {
  const product = listRecords("products").find((product) => product.slug === slug) ?? null;
  if (!product) return null;
  return {
    ...product,
    title: cleanProductTitle(product.title),
    category: getCanonicalCategorySlug(product.category) || product.category || "",
    subcategory: getCanonicalSubcategorySlug(product.subcategory) || product.subcategory || "",
  };
}

const normalizeSpecifications = (specifications: any) => {
  if (!specifications) return {};
  if (specifications instanceof Map) return Object.fromEntries(specifications);
  if (Array.isArray(specifications)) return Object.fromEntries(specifications);
  return specifications;
};

const normalizeForLookup = (str: string) => {
  if (!str) return "";
  const words = str.toLowerCase().split(/[^a-z0-9]+/);
  const filtered = words.filter((w) => w && w !== "pmp");
  const unique = Array.from(new Set(filtered));
  unique.sort();
  return unique.join("");
};

const mapMongoProduct = (product: any): ProductRecord => {
  const title = product.name || product.title || "";
  const category = getCanonicalCategorySlug(product.category) || product.category || "";
  const subcategory = getCanonicalSubcategorySlug(product.subcategory) || product.subcategory || "";
  
  // Resolve primary image via database-first centralized resolver
  const matchedImage = resolveProductImage({
    title,
    name: product.name,
    featuredImage: product.featuredImage,
    featuredImageUrl: product.featuredImageUrl,
    image: product.image,
    images: product.images,
    galleryImages: product.galleryImages,
    category,
    subcategory,
    slug: product.slug
  });

  const sourceImages = (product.galleryImages?.length
    ? product.galleryImages
    : product.images?.length
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : []
  ).filter(Boolean);
  const images = [matchedImage, ...sourceImages].filter((image, index, self) => image && self.indexOf(image) === index);
  const finalFeaturedImage = matchedImage || images[0] || "";

  return {
    id: String(product._id),
    title: cleanProductTitle(title),
    slug: product.slug,
    description: product.description || "",
    shortDescription: product.shortDescription,
    category,
    subcategory,
    brand: product.brand,
    featuredImage: finalFeaturedImage,
    galleryImages: images,
    cloudinaryPublicId: product.cloudinaryPublicId,
    galleryPublicIds: product.galleryPublicIds || [],
    images,
    features: product.features || [],
    specifications: normalizeSpecifications(product.specifications),
    tags: product.tags || [],
    moq: product.moq || 1,
    price: product.price,
    featured: Boolean(product.featured),
    active: product.status !== "HIDDEN",
    status: product.status,
    order: product.order || 0,
    createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
};

export async function getCatalogProducts(): Promise<ProductRecord[]> {
  if (!process.env.MONGODB_URI) return listProducts();
  await connectMongoDB();
  const products = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).sort({ order: 1, createdAt: -1 }).lean<any[]>();
  return products.map(mapMongoProduct);
}

export async function getCatalogProductBySlug(slug: string): Promise<ProductRecord | null> {
  if (!process.env.MONGODB_URI) return getProductBySlug(slug);
  await connectMongoDB();
  
  // 1. Try exact match
  let product = await ProductModel.findOne({ slug, status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any>();
  if (product) return mapMongoProduct(product);

  // 2. Try match with "pmp-" prefix adjustment if missing or added
  const normalizedSlug = slug.startsWith("pmp-") ? slug : `pmp-${slug}`;
  product = await ProductModel.findOne({ slug: normalizedSlug, status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any>();
  if (product) return mapMongoProduct(product);

  // 3. Try fallback match by normalized word composition (handles duplicate slug words, etc.)
  const reqNorm = normalizeForLookup(slug);
  const allProducts = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).lean<any[]>();
  const match = allProducts.find((p) => normalizeForLookup(p.slug) === reqNorm);
  if (match) return mapMongoProduct(match);

  // 4. Try legacy JSON list lookup fallback
  return getProductBySlug(slug);
}

export async function createProduct(input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = input.galleryImages?.length ? input.galleryImages : input.images ?? [];
    const galleryPublicIds = input.galleryPublicIds?.length
      ? input.galleryPublicIds
      : input.cloudinaryPublicId
        ? [input.cloudinaryPublicId]
        : [];
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
      cloudinaryPublicId: input.cloudinaryPublicId || galleryPublicIds[0],
      galleryPublicIds,
      images,
      features: input.features,
      specifications: input.specifications,
      tags: input.tags,
      moq: input.moq,
      price: input.price,
      featured: input.featured,
      status: input.active ? "PUBLISHED" : "HIDDEN",
      active: input.active,
      order: input.order || 0,
    });
    return mapMongoProduct(product.toObject());
  }

  return createRecord("products", input);
}

export async function updateProduct(id: string, patch: Partial<ProductRecord> & { status?: string }) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const images = patch.galleryImages?.length ? patch.galleryImages : patch.images;
    const galleryPublicIds = patch.galleryPublicIds?.length
      ? patch.galleryPublicIds
      : patch.cloudinaryPublicId
        ? [patch.cloudinaryPublicId]
        : undefined;
    const update: Record<string, unknown> = {
      ...patch,
      name: patch.title,
      featuredImage: patch.featuredImage || images?.[0],
      galleryImages: images,
      cloudinaryPublicId: patch.cloudinaryPublicId || galleryPublicIds?.[0],
      galleryPublicIds,
      status: patch.status ?? (patch.active === false ? "HIDDEN" : patch.active === true ? "PUBLISHED" : undefined),
    };

    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);
    const product = await ProductModel.findByIdAndUpdate(id, { $set: update }, { new: true }).lean<any>();
    return product ? mapMongoProduct(product) : null;
  }

  return updateRecord("products", id, patch);
}

export async function deleteProduct(id: string, permanent: boolean = false, adminId?: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    if (permanent) {
      const product = await ProductModel.findById(id).lean<any>();
      if (product) {
        await destroyCloudinaryAssets(uniquePublicIds([product.cloudinaryPublicId, ...(product.galleryPublicIds || [])]));
      }
      const result = await ProductModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } else {
      const result = await ProductModel.findByIdAndUpdate(id, {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: adminId,
        },
      });
      return !!result;
    }
  }

  return deleteRecord("products", id);
}
