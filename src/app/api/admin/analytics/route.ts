import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/services/admin/analyticsService";

export async function GET() {
  return NextResponse.json({ success: true, data: await getAnalyticsSummary() });
}
