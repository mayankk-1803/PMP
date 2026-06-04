import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("pmp_admin_access", "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set("pmp_admin_refresh", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
