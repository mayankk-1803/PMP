import { emailShell, summaryTable } from "./baseEmail";

export function OrderCreatedEmail(input: { name: string; orderId: string; products: string[]; status: string }) {
  return emailShell(
    "Order Received",
    `
      <p>Hello ${input.name},</p>
      <p>Your order has been created successfully. Our team will keep you updated as it progresses.</p>
      ${summaryTable([
        ["Order ID", input.orderId],
        ["Products", input.products.join(", ")],
        ["Status", input.status],
      ])}
    `
  );
}
