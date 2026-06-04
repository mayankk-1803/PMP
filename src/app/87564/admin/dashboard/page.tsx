import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { MetricCard } from "@/components/admin/MetricCard";
import { getAnalyticsSummary } from "@/services/admin/analyticsService";
import { listQuotes } from "@/services/admin/quoteService";

export default async function AdminDashboardPage() {
  const analytics = await getAnalyticsSummary();
  const quotes = await listQuotes();

  return (
    <AdminShell title="Dashboard" subtitle="Real-time CMS, quote, order, enquiry, and catalog health overview.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <MetricCard label="Products" value={analytics.totalProducts} note="Published and hidden catalog items" />
        <MetricCard label="Categories" value={analytics.totalCategories} note="Primary catalog categories" />
        <MetricCard label="Subcategories" value={analytics.totalSubcategories} note="Product hierarchy nodes" />
        <MetricCard label="Brands" value={analytics.totalBrands} note="Managed brand records" />
        <MetricCard label="Quotes" value={analytics.totalQuotes} note="Customer quote requests" />
        <MetricCard label="Orders" value={analytics.totalOrders} note="Order records" />
        <MetricCard label="Enquiries" value={analytics.totalEnquiries} note="General enquiries" />
      </div>
      <div className="mt-6">
        <DataTable columns={["Customer", "Company", "Products", "Quantity", "Status"]} rows={quotes.slice(0, 8).map((quote) => [quote.customerName, quote.company, quote.products.join(", "), quote.quantity, quote.status])} />
      </div>
    </AdminShell>
  );
}
