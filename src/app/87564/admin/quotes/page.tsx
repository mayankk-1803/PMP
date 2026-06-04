import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { QUOTE_STATUSES } from "@/lib/admin/types";
import { listQuotes } from "@/services/admin/quoteService";

export default async function AdminQuotesPage() {
  const quotes = await listQuotes();
  return (
    <AdminShell title="Quotes" subtitle={`Quote workflow: ${QUOTE_STATUSES.join(", ")}. Customer quote forms create records automatically.`}>
      <DataTable columns={["Customer", "Email", "Phone", "Company", "Products", "Quantity", "Status"]} rows={quotes.map((quote) => [quote.customerName, quote.email, quote.phone, quote.company, quote.products.join(", "), quote.quantity, quote.status])} />
    </AdminShell>
  );
}
