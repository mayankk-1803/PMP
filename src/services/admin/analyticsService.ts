import { listRecords } from "@/repositories/adminRepository";
import type { AnalyticsSummary } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel, CategoryModel, EnquiryModel, OrderModel, ProductModel, QuoteModel, SubcategoryModel } from "@/models/cmsModels";

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const [totalProducts, totalCategories, totalSubcategories, totalOrders, totalQuotes, totalEnquiries, totalBrands, categories, products, quotes, orders] = await Promise.all([
      ProductModel.countDocuments({}),
      CategoryModel.countDocuments({}),
      SubcategoryModel.countDocuments({}),
      OrderModel.countDocuments({}),
      QuoteModel.countDocuments({}),
      EnquiryModel.countDocuments({}),
      BrandModel.countDocuments({}),
      CategoryModel.find({}).sort({ name: 1 }).lean<any[]>(),
      ProductModel.find({}).sort({ createdAt: -1 }).limit(5).lean<any[]>(),
      QuoteModel.find({}).sort({ createdAt: -1 }).limit(200).lean<any[]>(),
      OrderModel.find({}).sort({ createdAt: -1 }).limit(200).lean<any[]>(),
    ]);

    const today = new Date().toISOString().slice(0, 10);
    const month = new Date().toLocaleString("en", { month: "short" });

    return {
      totalProducts,
      totalCategories,
      totalSubcategories,
      totalOrders,
      totalQuotes,
      totalEnquiries,
      totalBrands,
      dailyQuotes: [{ date: today, quotes: quotes.filter((quote) => quote.createdAt?.toISOString?.().slice(0, 10) === today).length }],
      monthlyOrders: [{ month, orders: orders.length }],
      enquiriesByCategory: [{ category: "General", enquiries: totalEnquiries }],
      topCategories: categories.map((category) => ({
        category: category.name,
        requests: quotes.filter((quote) => (quote.products || []).some((product: string) => product.toLowerCase().includes(category.name.toLowerCase()))).length,
      })),
      topProducts: products.map((product) => ({
        product: product.name || product.title,
        requests: quotes.filter((quote) => (quote.products || []).some((item: string) => item.toLowerCase().includes((product.name || product.title || "").toLowerCase()))).length,
      })),
    };
  }

  const products = listRecords("products");
  const categories = listRecords("categories");
  const subcategories = listRecords("subcategories");
  const orders = listRecords("orders");
  const quotes = listRecords("quotes");
  const enquiries = listRecords("enquiries");
  const brands = listRecords("brands");
  const topCategories = categories.map((category) => ({
    category: category.name,
    requests: Math.max(1, quotes.filter((quote) => quote.products.some((product) => product.toLowerCase().includes(category.name.toLowerCase()))).length),
  }));

  return {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalSubcategories: subcategories.length,
    totalOrders: orders.length,
    totalQuotes: quotes.length,
    totalEnquiries: enquiries.length,
    totalBrands: brands.length,
    dailyQuotes: [{ date: new Date().toISOString().slice(0, 10), quotes: quotes.length }],
    monthlyOrders: [{ month: new Date().toLocaleString("en", { month: "short" }), orders: orders.length }],
    enquiriesByCategory: [{ category: "General", enquiries: enquiries.length }],
    topCategories,
    topProducts: products.slice(0, 5).map((product) => ({ product: product.title, requests: Math.max(1, quotes.length) })),
  };
}
