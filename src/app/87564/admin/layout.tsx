"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/87564/admin/login";
  const [authorized, setAuthorized] = useState(isLogin);

  useEffect(() => {
    if (isLogin) {
      setAuthorized(true);
      return;
    }

    let active = true;
    fetch("/api/admin/auth/me")
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((result) => {
        if (!active) return;
        if (result.success) {
          setAuthorized(true);
        } else {
          router.replace("/87564/admin/login");
        }
      })
      .catch(() => {
        if (active) router.replace("/87564/admin/login");
      });

    return () => {
      active = false;
    };
  }, [isLogin, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
          <Loader2 className="h-5 w-5 animate-spin text-red-600" />
          Checking admin session...
        </div>
      </div>
    );
  }

  return children;
}
