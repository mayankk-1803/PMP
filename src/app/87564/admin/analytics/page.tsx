import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { MetricCard } from "@/components/admin/MetricCard";
import { getAnalyticsSummary } from "@/services/admin/analyticsService";

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalyticsSummary();
  return (
    <AdminShell title="Analytics" subtitle="Real counts for products, categories, subcategories, brands, quotes, orders, enquiries, top categories, requested products, and monthly trends.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <MetricCard label="Products" value={analytics.totalProducts} note="Total catalog items" />
        <MetricCard label="Categories" value={analytics.totalCategories} note="Primary categories" />
        <MetricCard label="Subcategories" value={analytics.totalSubcategories} note="Hierarchy nodes" />
        <MetricCard label="Brands" value={analytics.totalBrands} note="Brand records" />
        <MetricCard label="Orders" value={analytics.totalOrders} note="Orders created" />
        <MetricCard label="Quotes" value={analytics.totalQuotes} note="Quote requests" />
        <MetricCard label="Enquiries" value={analytics.totalEnquiries} note="General enquiries" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <DataTable columns={["Category", "Requests"]} rows={analytics.topCategories.map((item) => [item.category, item.requests])} />
        <DataTable columns={["Product", "Requests"]} rows={analytics.topProducts.map((item) => [item.product, item.requests])} />
        <DataTable columns={["Month", "Orders"]} rows={analytics.monthlyOrders.map((item) => [item.month, item.orders])} />
        <DataTable columns={["Date", "Quotes"]} rows={analytics.dailyQuotes.map((item) => [item.date, item.quotes])} />
      </div>
    </AdminShell>
  );
}
