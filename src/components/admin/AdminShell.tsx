"use client";

import Link from "next/link";
import { Activity, BarChart3, Boxes, Building2, Gauge, Inbox, Layers3, PackageCheck, Shield, ShoppingBag, Trash2 } from "lucide-react";
import { AdminAccountMenu } from "./AdminAccountMenu";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/87564/admin/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/87564/admin/products", label: "Products", icon: Boxes },
  { href: "/87564/admin/categories", label: "Categories", icon: Layers3 },
  { href: "/87564/admin/subcategories", label: "Subcategories", icon: Layers3 },
  { href: "/87564/admin/brands", label: "Brands", icon: Building2 },
  { href: "/87564/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/87564/admin/quotes", label: "Quotes", icon: PackageCheck },
  { href: "/87564/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/87564/admin/activity-logs", label: "Audit Logs", icon: Activity },
  { href: "/87564/admin/trash", label: "Trash Bin", icon: Trash2 },
  { href: "/87564/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [role, setRole] = useState("VIEWER");

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setRole(res.data.role);
        }
      })
      .catch(() => setRole("VIEWER"));
  }, []);

  // Filter sidebar navigation depending on RBAC role
  const visibleNavItems = navItems.filter((item) => {
    if (role === "EDITOR" || role === "VIEWER") {
      return !["Audit Logs", "Trash Bin"].includes(item.label);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2B2B2B]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-[#DDD5C8] bg-[#FFFDF8] px-4 py-6 shadow-sm">
          <Link href="/87564/admin/dashboard" className="mb-8 flex items-center gap-3 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6E7757]">
              <Shield className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-wider">PacMyProduct</span>
              <span className="block text-xs text-[#6B6B63]">Enterprise Admin</span>
            </span>
          </Link>
          <nav className="space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[#5F6752] transition hover:bg-[#EFE7DB] hover:text-[#2B2B2B]">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="min-w-0 px-4 py-6 md:px-8">
          <header className="mb-6 flex flex-col gap-3 border-b border-[#DDD5C8] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6E7757]">Admin Console</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm text-[#6B6B63]">{subtitle}</p>
            </div>
            <AdminAccountMenu />
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
