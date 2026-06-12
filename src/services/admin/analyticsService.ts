import { connectMongoDB } from "@/lib/mongodb";
import { BrandModel, CategoryModel, EnquiryModel, OrderModel, ProductModel, QuoteModel, SubcategoryModel } from "@/models/cmsModels";

export interface DashboardAnalytics {
  totalProducts: number;
  totalCategories: number;
  totalSubcategories: number;
  totalOrders: number;
  totalQuotes: number;
  totalEnquiries: number;
  totalBrands: number;
  totalDeleted: number;
  monthlyOrders: { month: string; orders: number }[];
  monthlyQuotes: { month: string; quotes: number }[];
  dailyQuotes: { date: string; quotes: number }[];
  topCategories: { category: string; requests: number }[];
  topCategoriesAlloc: { name: string; count: number }[];
  topProducts: { product: string; requests: number }[];
  topBrands: { name: string; count: number }[];
}

export async function getAnalyticsSummary(): Promise<DashboardAnalytics> {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();

    const [
      totalProducts,
      totalCategories,
      totalSubcategories,
      totalOrders,
      totalQuotes,
      totalEnquiries,
      totalBrands,
      deletedProducts,
      deletedCategories,
      deletedSubcategories,
      deletedBrands,
      deletedOrders,
      deletedQuotes,
      categories,
      brands,
    ] = await Promise.all([
      ProductModel.countDocuments({ isDeleted: { $ne: true } }),
      CategoryModel.countDocuments({ isDeleted: { $ne: true } }),
      SubcategoryModel.countDocuments({ isDeleted: { $ne: true } }),
      OrderModel.countDocuments({ isDeleted: { $ne: true } }),
      QuoteModel.countDocuments({ isDeleted: { $ne: true } }),
      EnquiryModel.countDocuments({}),
      BrandModel.countDocuments({ isDeleted: { $ne: true } }),
      ProductModel.countDocuments({ isDeleted: true }),
      CategoryModel.countDocuments({ isDeleted: true }),
      SubcategoryModel.countDocuments({ isDeleted: true }),
      BrandModel.countDocuments({ isDeleted: true }),
      OrderModel.countDocuments({ isDeleted: true }),
      QuoteModel.countDocuments({ isDeleted: true }),
      CategoryModel.find({ isDeleted: { $ne: true } }).lean<any[]>(),
      BrandModel.find({ isDeleted: { $ne: true } }).lean<any[]>(),
    ]);

    const totalDeleted = deletedProducts + deletedCategories + deletedSubcategories + deletedBrands + deletedOrders + deletedQuotes;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const pastOrders = await OrderModel.find({ isDeleted: { $ne: true }, createdAt: { $gte: sixMonthsAgo } }).lean<any[]>();
    const pastQuotes = await QuoteModel.find({ isDeleted: { $ne: true }, createdAt: { $gte: sixMonthsAgo } }).lean<any[]>();

    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        num: d.getMonth(),
      };
    }).reverse();

    const monthlyOrders = last6Months.map((m) => {
      const count = pastOrders.filter((o) => {
        const od = new Date(o.createdAt);
        return od.getMonth() === m.num && od.getFullYear() === m.year;
      }).length;
      return { month: m.month, orders: count };
    });

    const monthlyQuotes = last6Months.map((m) => {
      const count = pastQuotes.filter((q) => {
        const qd = new Date(q.createdAt);
        return qd.getMonth() === m.num && qd.getFullYear() === m.year;
      }).length;
      return { month: m.month, quotes: count };
    });

    // Legacies (DailyQuotes / TopProducts)
    const today = new Date().toISOString().slice(0, 10);
    const dailyQuotes = [
      {
        date: today,
        quotes: pastQuotes.filter((quote) => quote.createdAt?.toISOString?.().slice(0, 10) === today).length,
      },
    ];

    const products = await ProductModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).limit(5).lean<any[]>();
    const topProducts = products.map((product) => ({
      product: product.name || product.title,
      requests: pastQuotes.filter((quote) =>
        (quote.products || []).some((item: string) =>
          item.toLowerCase().includes((product.name || product.title || "").toLowerCase())
        )
      ).length,
    }));

    // Calculate product count per category (legacy category/requests shape)
    const topCategories = await Promise.all(
      categories.slice(0, 5).map(async (cat) => {
        const count = await ProductModel.countDocuments({ category: cat.slug, isDeleted: { $ne: true } });
        return { category: cat.name, requests: count };
      })
    );

    const topCategoriesAlloc = topCategories.map((c) => ({
      name: c.category,
      count: c.requests,
    }));

    // Calculate product count per brand
    const topBrands = await Promise.all(
      brands.slice(0, 5).map(async (brand) => {
        const count = await ProductModel.countDocuments({ brand: brand.name, isDeleted: { $ne: true } });
        return { name: brand.name, count };
      })
    );

    return {
      totalProducts,
      totalCategories,
      totalSubcategories,
      totalOrders,
      totalQuotes,
      totalEnquiries,
      totalBrands,
      totalDeleted,
      monthlyOrders,
      monthlyQuotes,
      dailyQuotes,
      topCategories,
      topCategoriesAlloc,
      topProducts,
      topBrands,
    };
  }

  // MongoDB is the analytics source of truth. Without it, return empty metrics rather than demo data.
  return {
    totalProducts: 0,
    totalCategories: 0,
    totalSubcategories: 0,
    totalOrders: 0,
    totalQuotes: 0,
    totalEnquiries: 0,
    totalBrands: 0,
    totalDeleted: 0,
    monthlyOrders: [],
    monthlyQuotes: [],
    dailyQuotes: [],
    topCategories: [],
    topCategoriesAlloc: [],
    topProducts: [],
    topBrands: [],
  };
}
