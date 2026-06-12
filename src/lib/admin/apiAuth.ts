import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

export interface AdminAccessPayload {
  sub: string;
  role: AdminRole;
  email?: string;
  type?: string;
}

const getCookieValue = (cookieHeader: string | null, name: string) => {
  if (!cookieHeader) return "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
};

export const canAccessAdminApi = (role: string, pathname: string, method: string) => {
  if (role === "SUPER_ADMIN") return true;

  const isRead = method === "GET";
  const isPermanentDelete = method === "DELETE" && new URLSearchParams(pathname.split("?")[1] || "").get("permanent") === "true";

  if (role === "VIEWER") {
    return isRead && !pathname.startsWith("/api/admin/activity-logs");
  }

  if (role === "EDITOR") {
    if (pathname.startsWith("/api/admin/activity-logs") || pathname.startsWith("/api/admin/trash") || pathname.startsWith("/api/admin/restore")) {
      return false;
    }
    if (pathname.startsWith("/api/admin/orders") || pathname.startsWith("/api/admin/enquiries")) {
      return isRead;
    }
    if (pathname.startsWith("/api/admin/quotes")) {
      return isRead || method === "PATCH";
    }
    if (isPermanentDelete) return false;
    return true;
  }

  if (role === "ADMIN") {
    if (pathname.startsWith("/api/admin/users") || pathname.startsWith("/api/admin/settings")) {
      return false;
    }
    if (isPermanentDelete) return false;
    return true;
  }

  return false;
};

export function verifyAdminAccessToken(token: string): AdminAccessPayload | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-access-secret") as AdminAccessPayload;
    if (decoded.type !== "access") return null;
    if (!["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"].includes(decoded.role)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdminRequest(req: Request) {
  const token = getCookieValue(req.headers.get("cookie"), "pmp_admin_access");
  const payload = verifyAdminAccessToken(token);

  if (!payload) {
    return {
      admin: null,
      response: NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 }),
    };
  }

  const url = new URL(req.url);
  if (!canAccessAdminApi(payload.role, `${url.pathname}${url.search}`, req.method)) {
    return {
      admin: payload,
      response: NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 }),
    };
  }

  return { admin: payload, response: null };
}
