import { NextResponse } from "next/server";
import { loginAdmin } from "@/services/admin/authService";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const session = await loginAdmin(email, password);

  if (!session) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, data: session });
  response.cookies.set("pmp_admin_access", session.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15,
  });
  response.cookies.set("pmp_admin_refresh", session.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
