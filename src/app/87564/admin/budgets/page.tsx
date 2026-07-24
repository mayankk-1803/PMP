"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getBudgetsConfig } from "./actions";
import type { BudgetConfigItem } from "@/services/admin/budgetCollectionService";
import { Pencil, Loader2, ImagePlus, Eye, EyeOff, Package } from "lucide-react";

export default function BudgetManagementPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState<BudgetConfigItem[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const configData = await getBudgetsConfig();
      setBudgets(configData.sort((a, b) => a.displayOrder - b.displayOrder));
    } catch (err) {
      console.error("Failed to load budget collection config list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  if (!mounted) return null;

  return (
    <AdminShell 
      title="Budget Collections" 
      subtitle="Manage independent price collection banners, metadata, and custom B2B showcase products."
    >
      <div className="space-y-6">
        {loading ? (
          <div className="flex h-60 items-center justify-center rounded-xl border border-[#F5C2C2] bg-[#FFFDF8]">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#5F6752]">
              <Loader2 className="h-5 w-5 animate-spin text-[#D32F2F]" />
              Loading configuration file...
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                <thead className="bg-[#FAF9F6] text-xs uppercase tracking-wider text-[#6B6B63] border-b border-[#F5C2C2]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Image</th>
                    <th className="px-6 py-4 font-bold">Title (Admin Label)</th>
                    <th className="px-6 py-4 font-bold">Value Mapping</th>
                    <th className="px-6 py-4 font-bold">Description</th>
                    <th className="px-6 py-4 font-bold text-center">Order</th>
                    <th className="px-6 py-4 font-bold text-center">Products</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5C2C2]">
                  {budgets.map((item) => {
                    const productsCount = (item.products || []).length;
                    return (
                      <tr key={item.id} className="hover:bg-[#FAF9F6] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="h-10 w-16 object-cover rounded border border-[#F5C2C2]" />
                          ) : (
                            <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center text-[#6B6B63] border border-dashed border-gray-300">
                              <ImagePlus className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-[#2B2B2B]">{item.title}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-[#8A6A3B] bg-[#FAF9F6] rounded px-2 py-1 max-w-[120px] truncate">{item.value}</td>
                        <td className="px-6 py-4 text-xs text-[#6B6B63] max-w-[200px] truncate">{item.description || "—"}</td>
                        <td className="px-6 py-4 font-bold text-center text-gray-700">{item.displayOrder}</td>
                        <td className="px-6 py-4 font-bold text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 font-bold">
                            <Package className="w-3.5 h-3.5" /> {productsCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.active ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                              <Eye className="w-3.5 h-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-500">
                              <EyeOff className="w-3.5 h-3.5" /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button 
                            onClick={() => router.push(`/87564/admin/budgets/${item.id}`)} 
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#C62828] hover:text-[#D32F2F] hover:bg-[#FDECEC] px-3 py-1.5 rounded-lg border border-[#F5C2C2] transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
