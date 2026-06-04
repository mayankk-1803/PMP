import { NextResponse } from "next/server";
import { createQuote, listQuotes } from "@/services/admin/quoteService";
import { sendQuoteWorkflow } from "@/services/email/emailService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listQuotes() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const quote = await createQuote({
    customerName: data.customerName ?? data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    city: data.city,
    products: data.products ?? [],
    quantity: data.quantity,
    message: data.message,
  });
  await sendQuoteWorkflow({
    name: quote.customerName,
    email: quote.email,
    phone: quote.phone,
    company: quote.company,
    product: quote.products.join(", "),
    quantity: quote.quantity,
    message: quote.message,
  });
  return NextResponse.json({ success: true, data: quote }, { status: 201 });
}
