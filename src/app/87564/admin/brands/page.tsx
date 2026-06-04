import { AdminShell } from "@/components/admin/AdminShell";
import { TaxonomyManager } from "@/components/admin/TaxonomyManager";

export default function AdminBrandsPage() {
  return (
    <AdminShell title="Brands" subtitle="Manage brand records, logo assets, publication state, and partner catalog visibility.">
      <TaxonomyManager mode="brands" />
    </AdminShell>
  );
}
