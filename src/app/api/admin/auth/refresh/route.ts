import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { refreshToken } = await req.json().catch(() => ({ refreshToken: "" }));
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "development-refresh-secret";
  const jwtSecret = process.env.JWT_SECRET || "development-access-secret";

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret) as { sub: string; role: string; email?: string };
    const accessToken = jwt.sign({ sub: decoded.sub, role: decoded.role, email: decoded.email, type: "access" }, jwtSecret, { expiresIn: "15m" });
    return NextResponse.json({ success: true, data: { accessToken } });
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
