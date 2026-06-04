import { emailShell, summaryTable } from "./baseEmail";

interface QuoteEmailInput {
  name: string;
  company?: string;
  product?: string;
  quantity?: string;
  submittedDate: string;
}

export function QuoteReceivedEmail(input: QuoteEmailInput) {
  return emailShell(
    "Thank You For Your Quote Request",
    `
      <p>Hello ${input.name},</p>
      <p>Thank you for contacting PacMyProduct. We have received your quotation request successfully.</p>
      <p>Our team will review your requirements and contact you shortly.</p>
      <h2 style="font-size:16px;margin-top:20px;">Request Summary</h2>
      ${summaryTable([
        ["Name", input.name],
        ["Company", input.company],
        ["Product", input.product],
        ["Quantity", input.quantity],
        ["Submitted Date", input.submittedDate],
      ])}
      <p>Regards,<br/>PacMyProduct Team</p>
    `
  );
}
