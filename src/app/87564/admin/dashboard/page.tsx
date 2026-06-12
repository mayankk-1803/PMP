"use client";

import React, { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { MetricCard } from "@/components/admin/MetricCard";
import { Loader2, Boxes, ShoppingBag, PackageCheck, Layers, Building2, Trash, ClipboardList, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts";

interface AnalyticsData {
  totalProducts: number;
  totalCategories: number;
  totalSubcategories: number;
  totalOrders: number;
  totalQuotes: number;
  totalEnquiries: number;
  totalBrands: number;
  totalDeleted: number;
  monthlyOrders: { month: string; orders: number }[];
  monthlyQuotes: { month: string; quotes: number }[];
  topCategories: { category: string; requests: number }[];
  topCategoriesAlloc: { name: string; count: number }[];
  topBrands: { name: string; count: number }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [recentBrands, setRecentBrands] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeListTab, setActiveListTab] = useState<"orders" | "quotes" | "products" | "brands" | "logs">("orders");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          analyticsRes,
          productsRes,
          brandsRes,
          ordersRes,
          quotesRes,
          logsRes
        ] = await Promise.all([
          fetch("/api/admin/analytics"),
          fetch("/api/admin/products"),
          fetch("/api/admin/brands"),
          fetch("/api/admin/orders"),
          fetch("/api/admin/quotes"),
          fetch("/api/admin/activity-logs?limit=10")
        ]);

        const [
          analyticsVal,
          productsVal,
          brandsVal,
          ordersVal,
          quotesVal,
          logsVal
        ] = await Promise.all([
          analyticsRes.json(),
          productsRes.json(),
          brandsRes.json(),
          ordersRes.json(),
          quotesRes.json(),
          logsRes.json()
        ]);

        if (analyticsVal.success) setData(analyticsVal.data);
        if (productsVal.success) setRecentProducts((productsVal.data || []).slice(0, 10));
        if (brandsVal.success) setRecentBrands((brandsVal.data || []).slice(0, 10));
        if (ordersVal.success) setRecentOrders((ordersVal.data || []).slice(0, 10));
        if (quotesVal.success) setRecentQuotes((quotesVal.data || []).slice(0, 10));
        if (logsVal.success) setRecentLogs(logsVal.data.logs || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          <span className="text-sm font-black text-slate-600 uppercase tracking-widest animate-pulse">Assembling Enterprise Dashboard...</span>
        </div>
      </div>
    );
  }

  const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#6366f1"];

  return (
    <AdminShell title="Dashboard Overview" subtitle="Real-time business performance summaries, client quotation pipelines, catalog weights, and system logs.">
      <div className="space-y-6">
        
        {/* Metric Widgets */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <MetricCard icon={<Boxes className="h-5 w-5 text-red-600" />} label="Products" value={data.totalProducts} note="Catalog items available" />
          <MetricCard icon={<Layers className="h-5 w-5 text-amber-500" />} label="Categories" value={data.totalCategories} note="Parent classifications" />
          <MetricCard icon={<Building2 className="h-5 w-5 text-emerald-500" />} label="Brands" value={data.totalBrands} note="Partner brands" />
          <MetricCard icon={<ShoppingBag className="h-5 w-5 text-blue-500" />} label="Orders" value={data.totalOrders} note="Total transactions" />
          <MetricCard icon={<PackageCheck className="h-5 w-5 text-indigo-500" />} label="Quotes" value={data.totalQuotes} note="Bulk gifting requests" />
          <MetricCard icon={<Trash className="h-5 w-5 text-slate-500" />} label="Archived (Trash)" value={data.totalDeleted} note="Soft deleted items" />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Order/Quote Activity */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-600" /> Orders & Quotes Trend (6 Months)
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyOrders.map((o, idx) => ({ month: o.month, orders: o.orders, quotes: data.monthlyQuotes[idx]?.quotes || 0 }))}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#e2e8f0" }} />
                  <Legend wrapperStyle={{ fontSize: 11, fontWeight: "bold" }} />
                  <Area type="monotone" dataKey="orders" name="Orders" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOrders)" />
                  <Area type="monotone" dataKey="quotes" name="Quotes" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorQuotes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Allocation charts */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Top Categories allocation */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Top Categories Distribution</h3>
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.topCategoriesAlloc} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={65} fill="#8884d8" label={({ name }) => (name || "").slice(0, 8)}>
                      {data.topCategoriesAlloc.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Brands allocation */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Top Brands Allocation</h3>
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.topBrands}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Bar dataKey="count" name="Products" radius={[4, 4, 0, 0]}>
                      {data.topBrands.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Activity lists */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* List header tabs */}
          <div className="border-b border-slate-200 bg-slate-50 p-2.5 flex flex-wrap gap-1">
            <button onClick={() => setActiveListTab("orders")} className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeListTab === "orders" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              Recent Orders ({recentOrders.length})
            </button>
            <button onClick={() => setActiveListTab("quotes")} className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeListTab === "quotes" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              Recent Quotes ({recentQuotes.length})
            </button>
            <button onClick={() => setActiveListTab("products")} className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeListTab === "products" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              Recent Products ({recentProducts.length})
            </button>
            <button onClick={() => setActiveListTab("brands")} className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeListTab === "brands" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              Recent Brands ({recentBrands.length})
            </button>
            <button onClick={() => setActiveListTab("logs")} className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeListTab === "logs" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>
              System Logs ({recentLogs.length})
            </button>
          </div>

          {/* List display */}
          <div className="p-4 overflow-x-auto">
            {activeListTab === "orders" && (
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-900">{o.customerName}</td>
                      <td className="py-3">{o.email}</td>
                      <td className="py-3 font-black">₹{o.total}</td>
                      <td className="py-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">{o.status}</span></td>
                      <td className="py-3 text-xs text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeListTab === "quotes" && (
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Product(s)</th>
                    <th className="pb-3">Qty</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-900">{q.customerName}</td>
                      <td className="py-3">{q.company || "-"}</td>
                      <td className="py-3 truncate max-w-[240px]">{q.products.join(", ")}</td>
                      <td className="py-3 font-bold">{q.quantity}</td>
                      <td className="py-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">{q.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeListTab === "products" && (
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3">Slug</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">MOQ</th>
                    <th className="pb-3">Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-900">{p.title}</td>
                      <td className="py-3 text-xs font-mono">{p.slug}</td>
                      <td className="py-3">{p.category}</td>
                      <td className="py-3 font-bold">{p.moq}</td>
                      <td className="py-3 text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeListTab === "brands" && (
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Brand Name</th>
                    <th className="pb-3">Industry</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentBrands.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-900">{b.name}</td>
                      <td className="py-3">{b.industry || "-"}</td>
                      <td className="py-3">{b.category || "-"}</td>
                      <td className="py-3 text-xs text-slate-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeListTab === "logs" && (
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Time</th>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Action</th>
                    <th className="pb-3">Entity Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {recentLogs.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50">
                      <td className="py-3 text-xs text-slate-500">{new Date(l.createdAt).toLocaleTimeString()}</td>
                      <td className="py-3 font-semibold text-slate-900">{l.userName}</td>
                      <td className="py-3"><span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">{l.action}</span></td>
                      <td className="py-3 text-xs truncate max-w-[280px]">{l.entityName || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
