"use client";

import { ArrowDown, ArrowUp, ImagePlus, Pencil, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory: string;
  brand?: string;
  featuredImage?: string;
  galleryImages?: string[];
  images: string[];
  moq: number;
  featured: boolean;
  active: boolean;
}

interface OptionRecord {
  name: string;
  slug: string;
}

const emptyProduct = {
  title: "",
  slug: "",
  description: "",
  shortDescription: "",
  category: "",
  subcategory: "",
  brand: "",
  moq: 50,
  status: "PUBLISHED",
  featured: false,
  featuredImage: "",
  galleryImages: [] as string[],
};

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ProductManager() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<OptionRecord[]>([]);
  const [subcategories, setSubcategories] = useState<OptionRecord[]>([]);
  const [brands, setBrands] = useState<OptionRecord[]>([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"featured" | "gallery" | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    const [productRes, categoryRes, subcategoryRes, brandRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/catalog/categories"),
      fetch("/api/catalog/subcategories"),
      fetch("/api/catalog/brands"),
    ]);
    const [productData, categoryData, subcategoryData, brandData] = await Promise.all([
      productRes.json(),
      categoryRes.json(),
      subcategoryRes.json(),
      brandRes.json(),
    ]);
    setProducts(productData.data ?? []);
    setCategories(categoryData.data ?? []);
    setSubcategories(subcategoryData.data ?? []);
    setBrands(brandData.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const openEdit = (product: ProductRecord) => {
    const images = product.galleryImages?.length ? product.galleryImages : product.images || [];
    const featuredImage = product.featuredImage || images[0] || "";
    setEditingId(product.id);
    setForm({
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription || "",
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand || "",
      moq: product.moq,
      status: product.active ? "PUBLISHED" : "HIDDEN",
      featured: product.featured,
      featuredImage,
      galleryImages: images.filter((image) => image !== featuredImage),
    });
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const updateForm = (field: keyof typeof emptyProduct, value: string | boolean | number | string[]) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "title" && !editingId) next.slug = slugify(String(value));
      return next;
    });
  };

  const validateFiles = (files: File[]) => {
    const invalid = files.find((file) => !allowedTypes.includes(file.type));
    if (invalid) return "Only jpg, jpeg, png, and webp images are allowed.";
    const tooLarge = files.find((file) => file.size > maxImageSize);
    if (tooLarge) return "Each image must be 5MB or smaller.";
    return "";
  };

  const uploadFiles = async (files: File[], target: "featured" | "gallery") => {
    setUploadError("");
    setUploadSuccess("");
    const validationError = validateFiles(files);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploading(target);
    const body = new FormData();
    files.forEach((file) => body.append("files", file));

    const response = await fetch("/api/admin/upload?folder=pacmyproduct/products", {
      method: "POST",
      body,
    });
    const result = await response.json();
    setUploading(null);

    if (!response.ok || !result.success) {
      setUploadError(result.message || "Upload failed.");
      return;
    }

    const urls = result.data.map((item: { secure_url: string }) => item.secure_url);
    if (target === "featured") {
      updateForm("featuredImage", urls[0]);
    } else {
      updateForm("galleryImages", [...form.galleryImages, ...urls]);
    }
    setUploadSuccess(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded successfully.`);
  };

  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const galleryImages = [form.featuredImage, ...form.galleryImages].filter(Boolean);
    const payload = {
      name: form.title,
      title: form.title,
      slug: form.slug,
      description: form.description,
      shortDescription: form.shortDescription,
      category: form.category,
      subcategory: form.subcategory,
      brand: form.brand,
      moq: Number(form.moq),
      status: form.status,
      featured: form.featured,
      featuredImage: form.featuredImage,
      galleryImages,
    };

    await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setModalOpen(false);
    await load();
  };

  const deleteProduct = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/products/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    await load();
  };

  const removeGalleryImage = (url: string) => {
    updateForm("galleryImages", form.galleryImages.filter((image) => image !== url));
  };

  const moveGalleryImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= form.galleryImages.length) return;
    const next = [...form.galleryImages];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    updateForm("galleryImages", next);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {["Thumbnail", "Product", "Slug", "Category", "Subcategory", "Brand", "MOQ", "Active", "Actions"].map((column) => (
                  <th key={column} className="px-4 py-3 font-bold">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td className="px-4 py-5 text-slate-500" colSpan={9}>Loading products from MongoDB...</td></tr>
              ) : products.length === 0 ? (
                <tr><td className="px-4 py-5 text-slate-500" colSpan={9}>No products yet.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="text-slate-700">
                    <td className="px-4 py-3">
                      {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="h-12 w-12 rounded-md object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-400"><ImagePlus className="h-4 w-4" /></div>}
                    </td>
                    <td className="px-4 py-3 font-bold">{product.title}</td>
                    <td className="px-4 py-3">{product.slug}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.subcategory}</td>
                    <td className="px-4 py-3">{product.brand}</td>
                    <td className="px-4 py-3">{product.moq}</td>
                    <td className="px-4 py-3">{product.active ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(product)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button onClick={() => setDeleteTarget(product)} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50">
                          <Trash2 className="h-3 w-3" /> Delete
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setModalOpen(false)} className="rounded-md p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={saveProduct} className="grid gap-4 md:grid-cols-2">
              <Input label="Product Name" value={form.title} onChange={(value) => updateForm("title", value)} required />
              <Input label="Slug" value={form.slug} onChange={(value) => updateForm("slug", value)} required />
              <TextArea label="Short Description" value={form.shortDescription} onChange={(value) => updateForm("shortDescription", value)} />
              <TextArea label="Description" value={form.description} onChange={(value) => updateForm("description", value)} />
              <Select label="Category" value={form.category} options={categories} onChange={(value) => updateForm("category", value)} />
              <Select label="Subcategory" value={form.subcategory} options={subcategories} onChange={(value) => updateForm("subcategory", value)} />
              <Select label="Brand" value={form.brand} options={brands} onChange={(value) => updateForm("brand", value)} />
              <Input label="MOQ" type="number" value={String(form.moq)} onChange={(value) => updateForm("moq", Number(value))} />
              <Select label="Status" value={form.status} options={[{ name: "Published", slug: "PUBLISHED" }, { name: "Draft", slug: "DRAFT" }, { name: "Hidden", slug: "HIDDEN" }]} onChange={(value) => updateForm("status", value)} />
              <label className="flex items-center gap-2 pt-7 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={form.featured} onChange={(event) => updateForm("featured", event.target.checked)} />
                Featured Product
              </label>

              <div className="md:col-span-2">
                <FileDropzone
                  label="Featured Image Upload"
                  multiple={false}
                  uploading={uploading === "featured"}
                  onFiles={(files) => uploadFiles(files, "featured")}
                />
                {form.featuredImage && (
                  <div className="mt-3 relative h-44 w-44 overflow-hidden rounded-lg border border-slate-200">
                    <img src={form.featuredImage} alt="Featured product preview" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => updateForm("featuredImage", "")} className="absolute right-2 top-2 rounded-md bg-white/90 p-1 text-slate-700 shadow"><X className="h-4 w-4" /></button>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <FileDropzone
                  label="Gallery Image Upload"
                  multiple
                  uploading={uploading === "gallery"}
                  onFiles={(files) => uploadFiles(files, "gallery")}
                />
                {form.galleryImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {form.galleryImages.map((url, index) => (
                      <div key={url} className="relative overflow-hidden rounded-lg border border-slate-200">
                        <img src={url} alt="Gallery product preview" className="h-32 w-full object-cover" />
                        <div className="absolute inset-x-2 top-2 flex justify-between">
                          <button type="button" onClick={() => moveGalleryImage(index, -1)} className="rounded bg-white/90 p-1 text-slate-700 shadow disabled:opacity-30" disabled={index === 0}><ArrowUp className="h-3 w-3" /></button>
                          <button type="button" onClick={() => moveGalleryImage(index, 1)} className="rounded bg-white/90 p-1 text-slate-700 shadow disabled:opacity-30" disabled={index === form.galleryImages.length - 1}><ArrowDown className="h-3 w-3" /></button>
                          <button type="button" onClick={() => removeGalleryImage(url)} className="rounded bg-white/90 p-1 text-slate-700 shadow"><X className="h-3 w-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {(uploadError || uploadSuccess) && (
                <div className={`md:col-span-2 rounded-lg px-3 py-2 text-sm font-bold ${uploadError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                  {uploadError || uploadSuccess}
                </div>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button disabled={saving || Boolean(uploading)} type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500 disabled:opacity-60">
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl">
            <h2 className="text-lg font-black">Are you sure you want to delete this product?</h2>
            <p className="mt-2 text-sm text-slate-500">{deleteTarget.title}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={deleteProduct} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FileDropzone({ label, multiple, uploading, onFiles }: { label: string; multiple: boolean; uploading: boolean; onFiles: (files: File[]) => void }) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    onFiles(Array.from(fileList));
  };

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
        dragging ? "border-red-400 bg-red-50" : "border-slate-300 bg-slate-50 hover:bg-white"
      }`}
    >
      <UploadCloud className="mb-2 h-6 w-6 text-red-600" />
      <span className="text-sm font-black text-slate-950">{uploading ? "Uploading..." : label}</span>
      <span className="mt-1 text-xs font-semibold text-slate-500">Drag files here or click to upload. JPG, PNG, WEBP. Max 5MB each.</span>
      <input className="hidden" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple={multiple} onChange={(event) => handleFiles(event.target.files)} />
    </label>
  );
}

function Input({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-red-400" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-red-400" />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: OptionRecord[]; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-red-400">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>{option.name}</option>
        ))}
      </select>
    </label>
  );
}
