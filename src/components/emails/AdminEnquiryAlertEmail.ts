import { emailShell, summaryTable } from "./baseEmail";

export function AdminEnquiryAlertEmail(input: { name: string; email: string; phone?: string; company?: string; source?: string; message?: string }) {
  return emailShell(
    "New Enquiry Received",
    `
      <p>A new enquiry has been submitted.</p>
      ${summaryTable([
        ["Name", input.name],
        ["Email", input.email],
        ["Phone", input.phone],
        ["Company", input.company],
        ["Source", input.source],
        ["Message", input.message],
      ])}
    `
  );
}
