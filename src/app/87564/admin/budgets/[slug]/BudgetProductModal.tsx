"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Package } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveBudgetsConfig, BudgetConfigItem, BudgetProduct } from "../actions";

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
  "Electronics",
  "Bags",
  "Office Utility",
  "Diaries & Notebooks",
  "Caps",
  "Pens",
  "Keychains",
  "T-Shirts",
  "Apparel & Bags",
  "Festive Hampers",
  "Welcome Kits"
];

interface BudgetProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: BudgetProduct | null;
  budget: BudgetConfigItem;
  allBudgets: BudgetConfigItem[];
  onSaveSuccess: (updatedBudget: BudgetConfigItem, updatedList: BudgetConfigItem[]) => void;
}

export default function BudgetProductModal({
  isOpen,
  onClose,
  editingProduct,
  budget,
  allBudgets,
  onSaveSuccess
}: BudgetProductModalProps) {
  const [productForm, setProductForm] = useState<Omit<BudgetProduct, "id">>(emptyProduct);
  const [isDisplayNameEdited, setIsDisplayNameEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setIsDisplayNameEdited(true);
      setProductForm({
        slug: editingProduct.slug || "",
        displayName: editingProduct.displayName || "",
        category: editingProduct.category || "",
        description: editingProduct.description || "",
        moq: editingProduct.moq || 50,
        brand: editingProduct.brand || "PacMyProduct",
        price: editingProduct.price || "",
        buttonText: editingProduct.buttonText || "Get Quote",
        specifications: {
          material: editingProduct.specifications?.material || "",
          size: editingProduct.specifications?.size || "",
          weight: editingProduct.specifications?.weight || "",
          colors: editingProduct.specifications?.colors || "",
          packaging: editingProduct.specifications?.packaging || ""
        },
        brandingOptions: editingProduct.brandingOptions || [],
        featuredImage: editingProduct.featuredImage || "",
        gallery: editingProduct.gallery || [],
        tags: editingProduct.tags || [],
        order: editingProduct.order || 1,
        active: editingProduct.active !== false
      });
    } else {
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
    }
  }, [editingProduct, isOpen]);

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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setLocalError("");

    try {
      let updatedProducts = [...(budget.products || [])];
      
      const slugified = productForm.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (editingProduct) {
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
        const newProduct: BudgetProduct = {
          ...productForm,
          id: `bp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          slug: slugified
        };
        updatedProducts.push(newProduct);
      }

      updatedProducts.sort((a, b) => (a.order || 0) - (b.order || 0));

      const updatedBudget = { ...budget, products: updatedProducts };
      const updatedList = allBudgets.map((b) => (b.id === budget.id ? updatedBudget : b));

      const res = await saveBudgetsConfig(updatedList);
      if (res && res.success) {
        onSaveSuccess(updatedBudget, updatedList);
        onClose();
      } else {
        setLocalError("Failed to save product.");
      }
    } catch (err: any) {
      console.error("Save product failed:", err);
      setLocalError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4 overflow-y-auto backdrop-blur-xs">
      <div className="w-full max-w-3xl rounded-2xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl text-left flex flex-col max-h-[92vh]">
        
        <div className="flex items-center justify-between border-b border-[#F5C2C2] pb-4 mb-4">
          <h3 className="text-lg font-black flex items-center gap-2 text-[#D32F2F]">
            <Package className="w-5 h-5" /> {editingProduct ? "Edit Budget Product" : "Add Product to Collection"}
          </h3>
          <button onClick={onClose} className="rounded-lg border border-gray-200 hover:bg-gray-50 p-1 text-gray-500 cursor-pointer">✕</button>
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
              disabled={saving || isUploading}
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
              disabled={saving || isUploading}
              onUploadStart={() => setIsUploading(true)}
              onUploadEnd={() => setIsUploading(false)}
              onChange={(urls) => updateProductField("gallery", Array.isArray(urls) ? urls : [urls])}
            />
          </div>

          {localError && (
            <div className="text-xs font-bold text-red-700 bg-red-50 p-2.5 border border-red-200 rounded-lg">
              {localError}
            </div>
          )}

          <div className="flex justify-end gap-2 border-t border-[#F5C2C2] pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={saving || isUploading}
              className="rounded-lg border border-[#F5C2C2] px-4 py-2 text-sm font-bold text-[#C62828] hover:bg-[#FAF9F6] cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving || isUploading}
              className="rounded-lg bg-[#D32F2F] hover:bg-[#C62828] px-4 py-2 text-sm font-black text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
