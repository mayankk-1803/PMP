import { emailShell, summaryTable } from "./baseEmail";

export function ContactReceivedEmail(input: { name: string; company?: string; message?: string }) {
  return emailShell(
    "We Have Received Your Message",
    `
      <p>Hello ${input.name},</p>
      <p>Thank you for contacting PacMyProduct. Your message is with our team, and we will respond shortly.</p>
      ${summaryTable([
        ["Name", input.name],
        ["Company", input.company],
        ["Message", input.message],
      ])}
    `
  );
}
