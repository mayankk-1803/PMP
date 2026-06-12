import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel, BrandModel, OrderModel, QuoteModel } from "@/models/cmsModels";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();

    const [products, categories, subcategories, brands, orders, quotes] = await Promise.all([
      ProductModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
      CategoryModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
      SubcategoryModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
      BrandModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
      OrderModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
      QuoteModel.find({ isDeleted: true }).sort({ deletedAt: -1 }).lean(),
    ]);

    const mapper = (item: any) => ({
      ...item,
      id: String(item._id),
      _id: undefined,
    });

    return NextResponse.json({
      success: true,
      data: {
        products: products.map(mapper),
        categories: categories.map(mapper),
        subcategories: subcategories.map(mapper),
        brands: brands.map(mapper),
        orders: orders.map(mapper),
        quotes: quotes.map(mapper),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
