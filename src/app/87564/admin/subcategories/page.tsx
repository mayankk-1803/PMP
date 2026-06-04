import { AdminShell } from "@/components/admin/AdminShell";
import { TaxonomyManager } from "@/components/admin/TaxonomyManager";

export default function AdminSubcategoriesPage() {
  return (
    <AdminShell title="Subcategories" subtitle="Complete hierarchy for promotional products, kits, hampers, and packaging subcategories.">
      <TaxonomyManager mode="subcategories" />
    </AdminShell>
  );
}
