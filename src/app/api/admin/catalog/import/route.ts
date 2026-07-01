import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel, BrandModel } from "@/models/cmsModels";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import * as XLSX from "xlsx";
import { getCanonicalCategorySlug } from "@/lib/slugResolver";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  const { searchParams } = new URL(req.url);
  const template = searchParams.get("template");

  if (template) {
    let csvContent = "";
    if (template === "products") {
      csvContent = "title,slug,description,shortDescription,category,subcategory,brand,moq,price,status\nSample Backpack,sample-backpack,Premium heavy canvas backpack with laptop sleeve,Water-resistant business backpack,bags,backpacks,Puma,50,1200,PUBLISHED";
    } else if (template === "brands") {
      csvContent = "name,slug,logo,industry,category,description,order\nSample Brand,sample-brand,https://res.cloudinary.com/dncupx9ul/image/upload/v1/brands/sample.png,Wearables,Smartwatches,Curated tech wearables,1";
    } else if (template === "categories") {
      csvContent = "name,slug,description,parentGroup,image,order\nSample Category,sample-category,Custom branded promotional handouts,Promotional Products,https://res.cloudinary.com/dncupx9ul/image/upload/v1/categories/sample.png,1";
    } else if (template === "subcategories") {
      csvContent = "name,slug,category,parentGroup,image,order\nSample Subcategory,sample-subcategory,bags,Corporate Kits,https://res.cloudinary.com/dncupx9ul/image/upload/v1/subcategories/sample.png,1";
    }

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${template}_template.csv"`,
      },
    });
  }

  return NextResponse.json({ success: false, message: "Template parameter required" }, { status: 400 });
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const entityType = formData.get("entityType") as string; // 'products', 'brands', 'categories', 'subcategories'

    if (!file || !entityType) {
      return NextResponse.json({ success: false, message: "Missing file or entityType" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<any>(worksheet);

    const summary = { created: 0, updated: 0, skipped: 0, failed: 0 };
    const errors: string[] = [];

    // Pre-cache categories and brands for validation
    const [allCategories, allBrands] = await Promise.all([
      CategoryModel.find({ isDeleted: { $ne: true } }).lean(),
      BrandModel.find({ isDeleted: { $ne: true } }).lean(),
    ]);

    const categorySlugs = new Set(allCategories.map((c) => getCanonicalCategorySlug(c.slug)));
    const brandNames = new Set(allBrands.map((b) => b.name.toLowerCase()));

    for (let index = 0; index < rawRows.length; index++) {
      const row = rawRows[index];
      const rowNum = index + 2; // Row number in spreadsheet (1-indexed header is row 1)

      try {
        if (entityType === "products") {
          const title = row.title || row.name;
          if (!title) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Title is required`);
            continue;
          }

          const slug = row.slug || slugify(title);
          const category = row.category;
          const subcategory = row.subcategory || category;

          // Validate category
          if (!categorySlugs.has(getCanonicalCategorySlug(category))) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Invalid category slug "${category}"`);
            continue;
          }

          // Validate brand if provided
          if (row.brand && !brandNames.has(row.brand.toLowerCase()) && row.brand !== "PacMyProduct") {
            summary.failed++;
            errors.push(`Row ${rowNum}: Invalid brand "${row.brand}"`);
            continue;
          }

          const existingProduct = await ProductModel.findOne({ slug });
          if (existingProduct) {
            if (existingProduct.isDeleted) {
              // Reactivate soft-deleted product and update fields
              await ProductModel.updateOne(
                { _id: existingProduct._id },
                {
                  $set: {
                    title,
                    name: title,
                    description: row.description || "",
                    shortDescription: row.shortDescription || "",
                    category,
                    subcategory,
                    brand: row.brand || "PacMyProduct",
                    moq: Number(row.moq) || 50,
                    price: Number(row.price) || 0,
                    status: row.status || "PUBLISHED",
                    active: row.status !== "HIDDEN",
                    isDeleted: false,
                    deletedAt: null,
                    deletedBy: null,
                  },
                }
              );
              summary.updated++;
            } else {
              // Regular update
              await ProductModel.updateOne(
                { _id: existingProduct._id },
                {
                  $set: {
                    title,
                    name: title,
                    description: row.description || "",
                    shortDescription: row.shortDescription || "",
                    category,
                    subcategory,
                    brand: row.brand || "PacMyProduct",
                    moq: Number(row.moq) || 50,
                    price: Number(row.price) || 0,
                    status: row.status || "PUBLISHED",
                    active: row.status !== "HIDDEN",
                  },
                }
              );
              summary.updated++;
            }
          } else {
            // Create new
            await ProductModel.create({
              title,
              name: title,
              slug,
              description: row.description || "",
              shortDescription: row.shortDescription || "",
              category,
              subcategory,
              brand: row.brand || "PacMyProduct",
              moq: Number(row.moq) || 50,
              price: Number(row.price) || 0,
              status: row.status || "PUBLISHED",
              active: row.status !== "HIDDEN",
              images: ["/images/joiningkit.png"],
              featuredImage: "/images/joiningkit.png",
            });
            summary.created++;
          }
        } 
        else if (entityType === "brands") {
          const name = row.name;
          if (!name) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Brand name is required`);
            continue;
          }

          const slug = row.slug || slugify(name);
          const existingBrand = await BrandModel.findOne({ slug });

          if (existingBrand) {
            await BrandModel.updateOne(
              { _id: existingBrand._id },
              {
                $set: {
                  name,
                  logo: row.logo || "",
                  industry: row.industry || "",
                  category: row.category || "",
                  description: row.description || "",
                  order: Number(row.order) || 0,
                  isDeleted: false,
                  deletedAt: null,
                  deletedBy: null,
                },
              }
            );
            summary.updated++;
          } else {
            await BrandModel.create({
              name,
              slug,
              logo: row.logo || "",
              industry: row.industry || "",
              category: row.category || "",
              description: row.description || "",
              order: Number(row.order) || 0,
            });
            summary.created++;
          }
        }
        else if (entityType === "categories") {
          const name = row.name;
          if (!name) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Category name is required`);
            continue;
          }

          const slug = row.slug || slugify(name);
          const existingCategory = await CategoryModel.findOne({ slug });

          if (existingCategory) {
            await CategoryModel.updateOne(
              { _id: existingCategory._id },
              {
                $set: {
                  name,
                  description: row.description || "",
                  parentGroup: row.parentGroup || "",
                  image: row.image || "",
                  order: Number(row.order) || 0,
                  isDeleted: false,
                  deletedAt: null,
                  deletedBy: null,
                },
              }
            );
            summary.updated++;
          } else {
            await CategoryModel.create({
              name,
              slug,
              description: row.description || "",
              parentGroup: row.parentGroup || "",
              image: row.image || "",
              order: Number(row.order) || 0,
            });
            summary.created++;
          }
        }
        else if (entityType === "subcategories") {
          const name = row.name;
          if (!name) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Subcategory name is required`);
            continue;
          }

          const slug = row.slug || slugify(name);
          const category = row.category;

          // Check if parent category exists
          if (!categorySlugs.has(getCanonicalCategorySlug(category))) {
            summary.failed++;
            errors.push(`Row ${rowNum}: Invalid parent category slug "${category}"`);
            continue;
          }

          const existingSub = await SubcategoryModel.findOne({ slug });

          if (existingSub) {
            await SubcategoryModel.updateOne(
              { _id: existingSub._id },
              {
                $set: {
                  name,
                  category,
                  parentGroup: row.parentGroup || "",
                  image: row.image || "",
                  order: Number(row.order) || 0,
                  isDeleted: false,
                  deletedAt: null,
                  deletedBy: null,
                },
              }
            );
            summary.updated++;
          } else {
            await SubcategoryModel.create({
              name,
              slug,
              category,
              parentGroup: row.parentGroup || "",
              image: row.image || "",
              order: Number(row.order) || 0,
            });
            summary.created++;
          }
        }
      } catch (err: any) {
        summary.failed++;
        errors.push(`Row ${rowNum}: Database error: ${err.message}`);
      }
    }

    // Log the import activity
    if (summary.created > 0 || summary.updated > 0) {
      await logActivity({
        action: `IMPORT_${entityType.toUpperCase()}`,
        entityType: entityType.slice(0, -1), // singular
        entityName: `Spreadsheet Import (${file.name})`,
        newValue: { summary, errorsCount: errors.length },
        req,
      });

      await revalidatePathsAndTags();
    }

    return NextResponse.json({
      success: true,
      summary,
      errors,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
