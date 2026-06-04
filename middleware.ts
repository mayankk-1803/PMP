import { NextRequest, NextResponse } from "next/server";

const base64UrlToBytes = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const base64UrlEncode = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

async function verifyJwt(token: string) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return false;

  const data = new TextEncoder().encode(`${header}.${payload}`);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.JWT_SECRET || "development-access-secret"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));
  if (base64UrlEncode(expected) !== signature) return false;

  const decodedPayload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp?: number };
  return !decodedPayload.exp || decodedPayload.exp * 1000 > Date.now();
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (pathname.startsWith("/87564/admin") && pathname !== "/87564/admin/login") {
    const token = req.cookies.get("pmp_admin_access")?.value;
    const loginUrl = new URL("/87564/admin/login", req.url);

    if (!token || !(await verifyJwt(token))) {
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/87564/admin") {
      return NextResponse.redirect(new URL("/87564/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/87564/admin/:path*"],
};
