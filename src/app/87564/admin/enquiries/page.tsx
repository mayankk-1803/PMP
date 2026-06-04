import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ENQUIRY_STATUSES } from "@/lib/admin/types";
import { listEnquiries } from "@/services/admin/enquiryService";

export default async function AdminEnquiriesPage() {
  const enquiries = await listEnquiries();
  return (
    <AdminShell title="Enquiries" subtitle={`Enquiry actions: ${ENQUIRY_STATUSES.join(", ")}. Contact and non-quote messages land here.`}>
      <DataTable columns={["Name", "Email", "Phone", "Company", "Source", "Status"]} rows={enquiries.map((enquiry) => [enquiry.name, enquiry.email, enquiry.phone, enquiry.company, enquiry.source, enquiry.status])} />
    </AdminShell>
  );
}
