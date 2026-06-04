import { emailShell, summaryTable } from "./baseEmail";

interface AdminQuoteAlertInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

export function AdminQuoteAlertEmail(input: AdminQuoteAlertInput) {
  return emailShell(
    "New Quote Request Received",
    `
      <p>A new quote request has been submitted.</p>
      ${summaryTable([
        ["Name", input.name],
        ["Email", input.email],
        ["Phone", input.phone],
        ["Company", input.company],
        ["Product", input.product],
        ["Quantity", input.quantity],
        ["Message", input.message],
      ])}
    `
  );
}
