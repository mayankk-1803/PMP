import { NextResponse } from "next/server";
import { createEnquiry, listEnquiries } from "@/services/admin/enquiryService";
import { sendContactWorkflow } from "@/services/email/emailService";

export async function GET() {
  return NextResponse.json({ success: true, data: await listEnquiries() });
}

export async function POST(req: Request) {
  const data = await req.json();
  const enquiry = await createEnquiry({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    source: data.source ?? "admin",
    message: data.message,
  });
  await sendContactWorkflow(enquiry);
  return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
}
