import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminAccessToken } from "@/lib/admin/apiAuth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("pmp_admin_access")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  const decoded = verifyAdminAccessToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      id: decoded.sub,
      email: decoded.email || "pmpadmin@gmail.com",
      role: decoded.role,
    },
  });
}
