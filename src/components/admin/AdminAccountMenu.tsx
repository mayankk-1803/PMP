"use client";

import { LogOut, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function AdminAccountMenu() {
  const router = useRouter();
  const [email, setEmail] = useState("Admin");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) setEmail(result.data.email);
      })
      .catch(() => setEmail("Admin"));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/87564/admin/login");
    router.refresh();
  };

  return (
    <div ref={menuRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        <UserCircle className="h-4 w-4 text-red-600" />
        <span className="max-w-[220px] truncate">{email}</span>
        <span className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}>v</span>
      </button>
      <div className={`absolute right-0 top-[calc(100%+4px)] z-20 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-2xl transition ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}>
        <div className="px-3 py-2 text-xs text-slate-500">
          <div className="font-bold text-slate-950">{email}</div>
          <div>Profile</div>
        </div>
        <button onClick={logout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
