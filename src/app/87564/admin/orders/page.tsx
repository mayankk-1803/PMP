import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ORDER_STATUSES } from "@/lib/admin/types";
import { listOrders } from "@/services/admin/orderService";

export default async function AdminOrdersPage() {
  const orders = await listOrders();
  return (
    <AdminShell title="Orders" subtitle={`Order lifecycle: ${ORDER_STATUSES.join(", ")}.`}>
      <DataTable columns={["Customer", "Company", "Products", "Total", "Status", "Created"]} rows={orders.map((order) => [order.customerName, order.company, order.products.join(", "), order.total, order.status, order.createdAt.slice(0, 10)])} />
    </AdminShell>
  );
}
