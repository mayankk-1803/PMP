"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { getBudgetsConfig, saveBudgetsConfig, BudgetConfigItem, BudgetProduct } from "../actions";
import { ArrowLeft, Coins, Plus, Trash2, Pencil, Loader2, Check, X, ImagePlus, Eye, EyeOff, Package, Settings } from "lucide-react";

const emptyProduct: Omit<BudgetProduct, "id"> = {
  slug: "",
  displayName: "",
  category: "",
  description: "",
  moq: 50,
  brand: "PacMyProduct",
  price: "",
  buttonText: "Get Quote",
  specifications: {
    material: "",
    size: "",
    weight: "",
    colors: "",
    packaging: ""
  },
  brandingOptions: [],
  featuredImage: "",
  gallery: [],
  tags: [],
  order: 1,
  active: true
};

const defaultBrandingOptions = [
  "Screen Printing",
  "Laser Engraving",
  "Embroidery",
  "UV Printing",
  "Premium Embossing",
  "Digital Decal",
  "Sublimation"
];

const defaultCategories = [
  "Drinkware",
  "Electronics & Tech",
  "Office & Stationery",
  "Bags & Backpacks",
  "T-Shirts & Apparel",
  "Gift Sets & Hampers",
  "Home & Lifestyle",
  "Eco-Friendly Gifts"
];

export default function BudgetCollectionDetailPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [allBudgets, setAllBudgets] = useState<BudgetConfigItem[]>([]);
  const [budget, setBudget] = useState<BudgetConfigItem | null>(null);

  // Modal / Form States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BudgetProduct | null>(null);
  const [productForm, setProductForm] = useState<Omit<BudgetProduct, "id">>(emptyProduct);
  const [isUploading, setIsUploading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isDisplayNameEdited, setIsDisplayNameEdited] = useState(false);

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
    setIsDisplayNameEdited(false);
    setProductForm({
      ...emptyProduct,
      specifications: {
        material: "",
        size: "",
        weight: "",
        colors: "",
        packaging: ""
      },
      brandingOptions: []
    });
    setModalOpen(true);
  };

  const handleOpenEditProduct = (prod: BudgetProduct) => {
    setEditingProduct(prod);
    setIsDisplayNameEdited(true);
    setProductForm({
      slug: prod.slug || "",
      displayName: prod.displayName || "",
      category: prod.category || "",
      description: prod.description || "",
      moq: prod.moq || 50,
      brand: prod.brand || "PacMyProduct",
      price: prod.price || "",
      buttonText: prod.buttonText || "Get Quote",
      specifications: {
        material: prod.specifications?.material || "",
        size: prod.specifications?.size || "",
        weight: prod.specifications?.weight || "",
        colors: prod.specifications?.colors || "",
        packaging: prod.specifications?.packaging || ""
      },
      brandingOptions: prod.brandingOptions || [],
      featuredImage: prod.featuredImage || "",
      gallery: prod.gallery || [],
      tags: prod.tags || [],
      order: prod.order || 1,
      active: prod.active !== false
    });
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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    setSaving(true);

    try {
      let updatedProducts = [...(budget.products || [])];
      
      const slugified = productForm.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (editingProduct) {
        // Edit Mode
        updatedProducts = updatedProducts.map((p) => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              ...productForm,
              slug: slugified
            };
          }
          return p;
        });
      } else {
        // Create Mode
        const newProduct: BudgetProduct = {
          ...productForm,
          id: `bp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          slug: slugified
        };
        updatedProducts.push(newProduct);
      }

      // Sort products by order field
      updatedProducts.sort((a, b) => (a.order || 0) - (b.order || 0));

      const updatedBudget = { ...budget, products: updatedProducts };
      const updatedList = allBudgets.map((b) => (b.id === budget.id ? updatedBudget : b));

      const res = await saveBudgetsConfig(updatedList);
      if (res.success) {
        setBudget(updatedBudget);
        setAllBudgets(updatedList);
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Save product failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateProductField = (field: keyof Omit<BudgetProduct, "id">, value: any) => {
    setProductForm((prev) => {
      const next = { ...prev, [field]: value };
      
      if (field === "category" && !editingProduct && !isDisplayNameEdited) {
        next.displayName = value;
      }
      
      if (field === "displayName") {
        setIsDisplayNameEdited(true);
      }
      
      return next;
    });
  };

  const updateSpecField = (specKey: string, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [specKey]: value
      }
    }));
  };

  const toggleBrandingOption = (option: string) => {
    const current = productForm.brandingOptions || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updateProductField("brandingOptions", updated);
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
                    disabled={saving}
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
                    disabled={saving}
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
                                <img src={prod.featuredImage} alt={prod.displayName} className="h-10 w-10 object-cover rounded border border-gray-200" />
                              ) : (
                                <div className="h-10 w-10 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                  <ImagePlus className="w-3.5 h-3.5" />
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

      {/* Budget Product Add/Edit Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4 overflow-y-auto backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl text-left flex flex-col max-h-[92vh]">
            
            <div className="flex items-center justify-between border-b border-[#F5C2C2] pb-4 mb-4">
              <h3 className="text-lg font-black flex items-center gap-2 text-[#D32F2F]">
                <Package className="w-5 h-5" /> {editingProduct ? "Edit Budget Product" : "Add Product to Collection"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-gray-200 hover:bg-gray-50 p-1 text-gray-500 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 overflow-y-auto flex-1 pr-1.5 scrollbar-thin">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-xs font-bold text-[#C62828]">
                  Display Name *
                  <input 
                    required 
                    type="text" 
                    value={productForm.displayName} 
                    onChange={(e) => updateProductField("displayName", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    placeholder="e.g. Executive Metallic Pen Set"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Category *
                  <select 
                    required 
                    value={productForm.category} 
                    onChange={(e) => updateProductField("category", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                  >
                    <option value="">Select Category</option>
                    {defaultCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block text-xs font-bold text-[#C62828]">
                  Brand Partner
                  <input 
                    type="text" 
                    value={productForm.brand || ""} 
                    onChange={(e) => updateProductField("brand", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    placeholder="e.g. PacMyProduct"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Minimum Order Qty (MOQ) *
                  <input 
                    required 
                    type="number" 
                    value={productForm.moq} 
                    onChange={(e) => updateProductField("moq", parseInt(e.target.value) || 0)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Base Price (₹) (Optional)
                  <input 
                    type="text" 
                    value={productForm.price || ""} 
                    onChange={(e) => updateProductField("price", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                    placeholder="e.g. 150 (Leave blank for Custom Quote)"
                  />
                </label>
              </div>

              <label className="block text-xs font-bold text-[#C62828]">
                Product Description
                <textarea 
                  value={productForm.description} 
                  onChange={(e) => updateProductField("description", e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#D32F2F]"
                  rows={3}
                  placeholder="Describe the product specifications, utility, gift context, etc."
                />
              </label>

              {/* Branding Options capabilities */}
              <div className="border-t border-[#F5C2C2] pt-4">
                <span className="block text-xs font-bold text-[#C62828] mb-2">Available Branding Methods</span>
                <div className="flex flex-wrap gap-2">
                  {defaultBrandingOptions.map((opt) => {
                    const isChecked = (productForm.brandingOptions || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleBrandingOption(opt)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isChecked 
                            ? "bg-[#D32F2F] text-white border-[#D32F2F]" 
                            : "bg-[#FFFDF8] text-gray-600 border-[#F5C2C2] hover:bg-[#FAF9F6]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specifications Sub-fields */}
              <div className="border-t border-[#F5C2C2] pt-4 space-y-3">
                <span className="block text-xs font-bold text-[#C62828]">Product Specifications</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="block text-[10px] font-bold text-[#C62828]">
                    Material
                    <input 
                      type="text" 
                      value={productForm.specifications?.material || ""} 
                      onChange={(e) => updateSpecField("material", e.target.value)}
                      className="mt-1 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none bg-white"
                      placeholder="e.g. Aluminium Alloy"
                    />
                  </label>
                  <label className="block text-[10px] font-bold text-[#C62828]">
                    Dimensions / Size
                    <input 
                      type="text" 
                      value={productForm.specifications?.size || ""} 
                      onChange={(e) => updateSpecField("size", e.target.value)}
                      className="mt-1 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none bg-white"
                      placeholder="e.g. 14cm x 2cm"
                    />
                  </label>
                  <label className="block text-[10px] font-bold text-[#C62828]">
                    Weight / Capacity
                    <input 
                      type="text" 
                      value={productForm.specifications?.weight || ""} 
                      onChange={(e) => updateSpecField("weight", e.target.value)}
                      className="mt-1 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none bg-white"
                      placeholder="e.g. 350ml / 45g"
                    />
                  </label>
                  <label className="block text-[10px] font-bold text-[#C62828]">
                    Available Colors
                    <input 
                      type="text" 
                      value={productForm.specifications?.colors || ""} 
                      onChange={(e) => updateSpecField("colors", e.target.value)}
                      className="mt-1 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none bg-white"
                      placeholder="e.g. Matte Black, Rose Gold"
                    />
                  </label>
                  <label className="block text-[10px] font-bold text-[#C62828]">
                    Packaging Box
                    <input 
                      type="text" 
                      value={productForm.specifications?.packaging || ""} 
                      onChange={(e) => updateSpecField("packaging", e.target.value)}
                      className="mt-1 w-full rounded border border-gray-200 px-2 py-1 text-xs text-gray-800 focus:outline-none bg-white"
                      placeholder="e.g. Premium Magnetic Gift Box"
                    />
                  </label>
                </div>
              </div>

              {/* Status and sorting */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#F5C2C2] pt-4">
                <label className="block text-xs font-bold text-[#C62828]">
                  Button Call-to-action
                  <input 
                    type="text" 
                    value={productForm.buttonText || "Get Quote"} 
                    onChange={(e) => updateProductField("buttonText", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none"
                  />
                </label>

                <label className="block text-xs font-bold text-[#C62828]">
                  Sort Order Number
                  <input 
                    type="number" 
                    value={productForm.order} 
                    onChange={(e) => updateProductField("order", parseInt(e.target.value) || 0)}
                    className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm text-gray-800 focus:outline-none"
                  />
                </label>

                <label className="flex items-center gap-2 pt-6 text-xs font-bold text-[#C62828] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={productForm.active !== false} 
                    onChange={(e) => updateProductField("active", e.target.checked)}
                    className="rounded border-[#CFC5B7]"
                  />
                  Publish Product Status
                </label>
              </div>

              {/* Media Image Uploaders */}
              <div className="border-t border-[#F5C2C2] pt-4 space-y-4">
                <ImageUploader 
                  label="Featured Image (Primary)"
                  value={productForm.featuredImage}
                  publicIds=""
                  multiple={false}
                  folder="pacmyproduct/budgets/products"
                  disabled={saving}
                  onUploadStart={() => setIsUploading(true)}
                  onUploadEnd={() => setIsUploading(false)}
                  onChange={(url) => updateProductField("featuredImage", url as string)}
                />

                <ImageUploader 
                  label="Gallery Images (Multiple)"
                  value={productForm.gallery || []}
                  publicIds={[]}
                  multiple={true}
                  folder="pacmyproduct/budgets/products/gallery"
                  disabled={saving}
                  onUploadStart={() => setIsUploading(true)}
                  onUploadEnd={() => setIsUploading(false)}
                  onChange={(urls) => updateProductField("gallery", Array.isArray(urls) ? urls : [urls])}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-[#F5C2C2] pt-4">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)} 
                  className="rounded-lg border border-[#F5C2C2] px-4 py-2 text-sm font-bold text-[#C62828] hover:bg-[#FAF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving || isUploading}
                  className="rounded-lg bg-[#D32F2F] px-5 py-2 text-sm font-black text-white hover:bg-[#C62828] disabled:opacity-60 flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
