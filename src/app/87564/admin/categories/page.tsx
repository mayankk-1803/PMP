import { AdminShell } from "@/components/admin/AdminShell";
import { TaxonomyManager } from "@/components/admin/TaxonomyManager";

export default function AdminCategoriesPage() {
  return (
    <AdminShell title="Categories" subtitle="CRUD category management for promotional products, kits, hampers, and packaging.">
      <TaxonomyManager mode="categories" />
    </AdminShell>
  );
}
