"use client";

import React, { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RotateCcw, Trash2, Loader2, ImagePlus, ShieldAlert } from "lucide-react";

type TabName = "products" | "categories" | "subcategories" | "brands" | "orders" | "quotes";

interface TrashItem {
  id: string;
  name?: string;
  title?: string;
  customerName?: string;
  slug?: string;
  email?: string;
  logo?: string;
  image?: string;
  deletedAt?: string;
}

export default function TrashPage() {
  const [activeTab, setActiveTab] = useState<TabName>("products");
  const [trashData, setTrashData] = useState<Record<TabName, TrashItem[]>>({
    products: [],
    categories: [],
    subcategories: [],
    brands: [],
    orders: [],
    quotes: [],
  });

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("VIEWER");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const [trashRes, userRes] = await Promise.all([
        fetch("/api/admin/trash"),
        fetch("/api/admin/auth/me"),
      ]);
      const [trashResult, userResult] = await Promise.all([
        trashRes.json(),
        userRes.json(),
      ]);

      if (trashResult.success && trashResult.data) {
        setTrashData(trashResult.data);
      }
      if (userResult.success && userResult.data) {
        setRole(userResult.data.role);
      }
    } catch (error) {
      console.error("Failed to load trash:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id: string) => {
    const entityTypeMap: Record<TabName, string> = {
      products: "Product",
      categories: "Category",
      subcategories: "Subcategory",
      brands: "Brand",
      orders: "Order",
      quotes: "Quote",
    };

    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType: entityTypeMap[activeTab], id }),
      });
      const result = await res.json();
      if (result.success) {
        // Refresh records
        await fetchTrash();
      } else {
        alert(result.message || "Failed to restore record");
      }
    } catch (error) {
      console.error("Error restoring:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this item? This action is irreversible.")) {
      return;
    }

    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}?permanent=true`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        await fetchTrash();
      } else {
        alert(result.message || "Failed to purge record");
      }
    } catch (error) {
      console.error("Error deleting permanently:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const getTabLabel = (tab: TabName) => {
    const counts = trashData[tab]?.length || 0;
    return `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${counts})`;
  };

  const items = trashData[activeTab] || [];
  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <AdminShell title="Trash & Archive Management" subtitle="Manage soft-deleted entries. Restore items to frontend immediately or permanently delete them (Super Admins only).">
      <div className="space-y-6">
        
        {/* Role Warning for Non-Super Admin */}
        {!isSuperAdmin && (
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            <ShieldAlert className="h-5 w-5 flex-shrink-0 text-amber-600" />
            <span>You are logged in as a <strong>{role}</strong>. You have permissions to restore items, but only a <strong>SUPER_ADMIN</strong> can permanently purge data.</span>
          </div>
        )}

        {/* Tab Headers */}
        <div className="border-b border-[#DDD5C8] bg-[#FFFDF8] p-2 rounded-t-xl flex flex-wrap gap-1">
          {(["products", "categories", "subcategories", "brands", "orders", "quotes"] as TabName[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#4E583F] text-white shadow-md"
                  : "text-[#5F6752] hover:bg-[#EFE7DB] hover:text-[#2B2B2B]"
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Trash Content Table */}
        <div className="overflow-hidden rounded-b-xl border border-t-0 border-[#DDD5C8] bg-[#FFFDF8] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead className="bg-[#F8F5EF] text-xs uppercase tracking-wider text-[#6B6B63]">
                <tr>
                  {(activeTab === "products" || activeTab === "categories" || activeTab === "subcategories" || activeTab === "brands") && (
                    <th className="px-5 py-3.5 font-bold">Media</th>
                  )}
                  <th className="px-5 py-3.5 font-bold">Record Title / Identity</th>
                  <th className="px-5 py-3.5 font-bold">Slug/Email</th>
                  <th className="px-5 py-3.5 font-bold">Soft Deleted At</th>
                  <th className="px-5 py-3.5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E1D5]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-[#9A9387]">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-[#6E7757]" />
                        <span>Querying archived collection records...</span>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-[#9A9387]">
                      No deleted {activeTab} found in the trash.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const title = item.title || item.name || item.customerName || `Record ID: ${item.id}`;
                    const thumb = item.logo || item.image || "";

                    return (
                      <tr key={item.id} className="hover:bg-[#F8F5EF]/70 transition-colors">
                        {(activeTab === "products" || activeTab === "categories" || activeTab === "subcategories" || activeTab === "brands") && (
                          <td className="px-5 py-3">
                            {thumb ? (
                              <img src={thumb} alt={title} className="h-10 w-10 rounded-md object-cover border border-[#E5DED2]" />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EFE7DB] text-[#9A9387]">
                                <ImagePlus className="h-4 w-4" />
                              </div>
                            )}
                          </td>
                        )}
                        <td className="px-5 py-4 font-bold text-[#2B2B2B]">{title}</td>
                        <td className="px-5 py-4 text-[#6B6B63]">{item.slug || item.email || "-"}</td>
                        <td className="px-5 py-4 text-xs text-[#6B6B63]">
                          {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : "-"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              disabled={processingId !== null}
                              onClick={() => handleRestore(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] px-2.5 py-1.5 text-xs font-bold text-[#4E583F] shadow-sm hover:bg-[#F8F5EF] disabled:opacity-50"
                            >
                              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" /> Restore
                            </button>
                            <button
                              disabled={!isSuperAdmin || processingId !== null}
                              onClick={() => handlePermanentDelete(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6C8B4] bg-[#FFFDF8] px-2.5 py-1.5 text-xs font-bold text-[#6E7757] shadow-sm hover:bg-[#EFE7DB] disabled:opacity-40"
                              title={isSuperAdmin ? "Purge permanently" : "Super Admin only"}
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Purge
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
