import { AdminShell } from "@/components/admin/AdminShell";
import { ProductManager } from "@/components/admin/ProductManager";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Products" subtitle="Create, edit, delete, publish, unpublish, and manage product images, category, subcategory, specifications, MOQ, tags, and featured status.">
      <ProductManager />
    </AdminShell>
  );
}
