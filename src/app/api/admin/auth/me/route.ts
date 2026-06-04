import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("pmp_admin_access")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-access-secret") as {
      sub: string;
      role: string;
      email?: string;
    };

    return NextResponse.json({
      success: true,
      data: {
        id: decoded.sub,
        email: decoded.email || "pmpadmin@gmail.com",
        role: decoded.role,
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
  }
}
