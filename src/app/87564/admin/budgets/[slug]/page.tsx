"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getBudgetsConfig, saveBudgetsConfig, BudgetConfigItem, BudgetProduct } from "../actions";
import { ArrowLeft, Coins, Plus, Trash2, Pencil, Loader2, Check, X, ImagePlus, Eye, EyeOff, Settings } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the heavy ImageUploader component client-side (ssr: false)
const ImageUploader = dynamic(() => import("@/components/admin/ImageUploader").then((mod) => mod.ImageUploader), {
  ssr: false,
  loading: () => <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl text-xs text-gray-400 font-bold">Loading Image Uploader...</div>
});

// Dynamically import the heavy Product modal client-side to optimize route bundling size
const BudgetProductModal = dynamic(() => import("./BudgetProductModal"), {
  ssr: false,
  loading: () => <div className="p-4 text-xs font-bold text-gray-500">Loading Product Editor...</div>
});

export default function BudgetCollectionDetailPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [allBudgets, setAllBudgets] = useState<BudgetConfigItem[]>([]);
  const [budget, setBudget] = useState<BudgetConfigItem | null>(null);

  // Modal / Form States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BudgetProduct | null>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const config = await getBudgetsConfig();
      setAllBudgets(config);
      const found = config.find((b) => b.id === slug);
      if (found) {
        setBudget(found);
      } else {
        router.push("/87564/admin/budgets");
      }
    } catch (err) {
      console.error("Failed to load budget collection:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [slug]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const updatedList = allBudgets.map((b) => (b.id === budget.id ? budget : b));
      const res = await saveBudgetsConfig(updatedList);
      if (res.success) {
        setAllBudgets(updatedList);
        setSuccessMsg("Settings saved successfully!");
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEditProduct = (prod: BudgetProduct) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (!budget || !confirm("Are you sure you want to delete this product from this collection?")) return;
    setSaving(true);
    try {
      const updatedProducts = (budget.products || []).filter((p) => p.id !== prodId);
      const updatedBudget = { ...budget, products: updatedProducts };
      const updatedList = allBudgets.map((b) => (b.id === budget.id ? updatedBudget : b));
      
      const res = await saveBudgetsConfig(updatedList);
      if (res.success) {
        setBudget(updatedBudget);
        setAllBudgets(updatedList);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  return (
    <AdminShell 
      title={`Budget Collection: ${budget?.title || slug}`} 
      subtitle={`Configure collection metadata settings and manage catalog products for the ${budget?.title || slug} price tier.`}
    >
      <div className="space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#F5C2C2] pb-4">
          <button 
            onClick={() => router.push("/87564/admin/budgets")}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#C62828] hover:text-[#D32F2F] hover:bg-[#FDECEC] px-3 py-1.5 rounded-lg border border-[#F5C2C2] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collections
          </button>
          
          <span className="text-xs font-bold text-gray-400">
            System Code: <strong className="text-gray-600 font-mono">{slug}</strong>
          </span>
        </div>

        {loading || !budget ? (
          <div className="flex h-60 items-center justify-center rounded-xl border border-[#F5C2C2] bg-[#FFFDF8]">
            <Loader2 className="h-5 w-5 animate-spin text-[#D32F2F] mr-2" />
            <span className="text-xs font-black uppercase tracking-wider text-[#6B6B63]">Loading details...</span>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Section A: Collection Settings */}
            <div className="lg:col-span-1 space-y-6">
              <form onSubmit={handleSaveSettings} className="rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-5 shadow-sm text-left space-y-4">
                <div className="flex items-center gap-2 border-b border-[#F5C2C2] pb-3 mb-1">
                  <Settings className="w-4 h-4 text-[#D32F2F]" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#2B2B2B]">Collection Settings</h3>
                </div>

                <label className="block text-xs font-bold text-[#C62828]">
                  Collection Title
                  <input 
                    required 
                    type="text" 
                    value={budget.title || ""} 
                    onChange={(e) => setBudget({ ...budget, title: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Subtitle Tagline
                  <input 
                    type="text" 
                    value={budget.subtitle || ""} 
                    onChange={(e) => setBudget({ ...budget, subtitle: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    placeholder="e.g. Premium Swag Hampers"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Description
                  <textarea 
                    value={budget.description || ""} 
                    onChange={(e) => setBudget({ ...budget, description: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    rows={3}
                  />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label className="block text-xs font-bold text-[#C62828]">
                    Explore Button Text
                    <input 
                      type="text" 
                      value={budget.buttonText || "Explore Collection"} 
                      onChange={(e) => setBudget({ ...budget, buttonText: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    />
                  </label>

                  <label className="block text-xs font-bold text-[#C62828]">
                    Display Order
                    <input 
                      type="number" 
                      value={budget.displayOrder || 0} 
                      onChange={(e) => setBudget({ ...budget, displayOrder: parseInt(e.target.value) || 0 })}
                      className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-[#C62828] cursor-pointer pt-1">
                  <input 
                    type="checkbox" 
                    checked={budget.active !== false} 
                    onChange={(e) => setBudget({ ...budget, active: e.target.checked })}
                    className="rounded border-[#CFC5B7]"
                  />
                  Active (Show on landing grid and side navigation lists)
                </label>

                <div className="pt-2">
                  <ImageUploader 
                    label="Cover Image Thumbnail"
                    value={budget.image || ""}
                    publicIds={budget.publicId || ""}
                    multiple={false}
                    folder="pacmyproduct/budgets"
                    disabled={saving || isUploading}
                    onUploadStart={() => setIsUploading(true)}
                    onUploadEnd={() => setIsUploading(false)}
                    onChange={(url, id) => {
                      setBudget({
                        ...budget,
                        image: url as string,
                        publicId: id as string
                      });
                    }}
                  />
                </div>

                <div className="pt-2">
                  <ImageUploader 
                    label="Header Banner Image"
                    value={budget.bannerImage || ""}
                    publicIds={budget.bannerPublicId || ""}
                    multiple={false}
                    folder="pacmyproduct/budgets/banners"
                    disabled={saving || isUploading}
                    onUploadStart={() => setIsUploading(true)}
                    onUploadEnd={() => setIsUploading(false)}
                    onChange={(url, id) => {
                      setBudget({
                        ...budget,
                        bannerImage: url as string,
                        bannerPublicId: id as string
                      });
                    }}
                  />
                </div>

                {errorMsg && <div className="text-xs font-bold text-red-700 bg-red-50 p-2 border border-red-200 rounded-lg">{errorMsg}</div>}
                {successMsg && <div className="text-xs font-bold text-green-700 bg-green-50 p-2 border border-green-200 rounded-lg">{successMsg}</div>}

                <button 
                  type="submit" 
                  disabled={saving || isUploading}
                  className="w-full bg-[#D32F2F] hover:bg-[#C62828] disabled:opacity-60 text-white rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {saving ? "Saving Changes..." : "Save Settings"}
                </button>
              </form>
            </div>

            {/* Section B: Budget Products */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#D32F2F]" />
                  <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">
                    Budget Products
                  </h3>
                  <span className="text-xs font-bold text-[#D32F2F] bg-[#FAF9F6] border border-[#F5C2C2] px-2.5 py-0.5 rounded-full inline-block">
                    Total: {(budget.products || []).length}
                  </span>
                </div>
                
                <button 
                  onClick={handleOpenAddProduct}
                  className="inline-flex items-center gap-1 bg-[#D32F2F] hover:bg-[#C62828] text-white rounded-lg px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Budget Product
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                    <thead className="bg-[#FAF9F6] text-xs uppercase tracking-wider text-[#6B6B63] border-b border-[#F5C2C2]">
                      <tr>
                        <th className="px-4 py-3 font-bold">Image</th>
                        <th className="px-4 py-3 font-bold">Display Name</th>
                        <th className="px-4 py-3 font-bold">Category</th>
                        <th className="px-4 py-3 font-bold text-center">MOQ</th>
                        <th className="px-4 py-3 font-bold text-center">Price</th>
                        <th className="px-4 py-3 font-bold text-center">Sort Order</th>
                        <th className="px-4 py-3 font-bold">Status</th>
                        <th className="px-4 py-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5C2C2] text-[#2B2B2B]">
                      {(budget.products || []).length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-gray-400 font-bold italic">
                            No budget products added to this collection yet. Click "+ Add Budget Product" above to populate the catalog.
                          </td>
                        </tr>
                      ) : (
                        (budget.products || []).map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#FAF9F6] transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              {prod.featuredImage ? (
                                <img src={encodeURI(prod.featuredImage)} alt={prod.displayName} className="h-10 w-10 object-cover rounded border border-gray-200" />
                              ) : (
                                <div className="h-10 w-10 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                  <ImagePlus className="w-3.5 h-3.5 text-gray-300" />
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 font-bold text-[#C62828] truncate max-w-[150px]">{prod.displayName}</td>
                            <td className="px-4 py-3 text-xs text-gray-500 font-semibold">{prod.category || "—"}</td>
                            <td className="px-4 py-3 text-center font-bold">{prod.moq} Units</td>
                            <td className="px-4 py-3 text-center font-bold text-[#8A6A3B]">{prod.price ? `₹${prod.price}` : "Quote"}</td>
                            <td className="px-4 py-3 text-center font-semibold text-gray-600">{prod.order || 1}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {prod.active !== false ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase">
                                  <Eye className="w-3 h-3" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-500 uppercase">
                                  <EyeOff className="w-3 h-3" /> Hidden
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              <div className="flex justify-end gap-1.5">
                                <button 
                                  onClick={() => handleOpenEditProduct(prod)}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C62828] hover:text-[#D32F2F] hover:bg-[#FDECEC] px-2 py-1 rounded border border-[#F5C2C2] transition-colors cursor-pointer"
                                >
                                  <Pencil className="w-3 h-3" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-900 hover:bg-amber-50 px-2 py-1 rounded border border-[#EAD7C8] transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <BudgetProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingProduct={editingProduct}
        budget={budget as BudgetConfigItem}
        allBudgets={allBudgets}
        onSaveSuccess={(updatedBudget, updatedList) => {
          setBudget(updatedBudget);
          setAllBudgets(updatedList);
        }}
      />
    </AdminShell>
  );
}
