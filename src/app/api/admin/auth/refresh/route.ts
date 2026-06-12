import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const body = await req.json().catch(() => ({ refreshToken: "" }));
  const refreshToken = body.refreshToken || cookieStore.get("pmp_admin_refresh")?.value || "";
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "development-refresh-secret";
  const jwtSecret = process.env.JWT_SECRET || "development-access-secret";

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret) as { sub: string; role: string; email?: string; type?: string };
    if (decoded.type !== "refresh") {
      return NextResponse.json({ success: false, message: "Invalid refresh token" }, { status: 401 });
    }

    const accessToken = jwt.sign({ sub: decoded.sub, role: decoded.role, email: decoded.email, type: "access" }, jwtSecret, { expiresIn: "15m" });
    const response = NextResponse.json({ success: true, data: { accessToken } });
    response.cookies.set("pmp_admin_access", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid refresh token" }, { status: 401 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { endpoint: "/api/admin/auth/refresh", method: "POST" },
  });
}
