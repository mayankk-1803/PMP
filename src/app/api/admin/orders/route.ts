import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/services/admin/orderService";
import { sendOrderWorkflow } from "@/services/email/emailService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listOrders() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const order = await createOrder({
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    products: data.products ?? [],
    total: data.total,
    status: data.status ?? "NEW",
    notes: data.notes,
  });
  await sendOrderWorkflow({ name: order.customerName, email: order.email, orderId: order.id, products: order.products, status: order.status });
  return NextResponse.json({ success: true, data: order }, { status: 201 });
}
