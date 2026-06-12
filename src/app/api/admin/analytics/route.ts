import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { getAnalyticsSummary } from "@/services/admin/analyticsService";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  return NextResponse.json({ success: true, data: await getAnalyticsSummary() });
}
