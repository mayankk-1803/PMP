"use client";

import { ImagePlus, Pencil, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "categories" | "subcategories" | "brands";

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentGroup?: string;
  image?: string;
  active: boolean;
  createdAt?: string;
}

interface SubcategoryRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  parentGroup?: string;
  image?: string;
  active: boolean;
  createdAt?: string;
}

type TaxonomyRecord = CategoryRecord | SubcategoryRecord;

interface BrandRecord {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  active: boolean;
  createdAt?: string;
}

type ManagerRecord = TaxonomyRecord | BrandRecord;

interface OptionRecord {
  name: string;
  slug: string;
}

interface TaxonomyForm {
  name: string;
  slug: string;
  description: string;
  category: string;
  parentGroup: string;
  image: string;
  logo: string;
  active: boolean;
}

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyCategory: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  active: true,
};

const emptySubcategory: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  active: true,
};

const emptyBrand: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  active: true,
};

export function TaxonomyManager({ mode }: { mode: Mode }) {
  const isSubcategory = mode === "subcategories";
  const isBrand = mode === "brands";
  const [records, setRecords] = useState<ManagerRecord[]>([]);
  const [categories, setCategories] = useState<OptionRecord[]>([]);
  const [form, setForm] = useState<TaxonomyForm>(isBrand ? emptyBrand : isSubcategory ? emptySubcategory : emptyCategory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagerRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    const requests = [fetch(`/api/admin/${mode}`)];
    if (isSubcategory) requests.push(fetch("/api/catalog/categories"));
    const responses = await Promise.all(requests);
    const payloads = await Promise.all(responses.map((response) => response.json()));
    setRecords(payloads[0].data ?? []);
    if (isSubcategory) setCategories(payloads[1].data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [mode]);

  const openCreate = () => {
    setEditingId(null);
    setForm(isBrand ? emptyBrand : isSubcategory ? emptySubcategory : emptyCategory);
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const openEdit = (record: ManagerRecord) => {
    setEditingId(record.id);
    setForm({
      name: record.name,
      slug: record.slug,
      description: "description" in record ? record.description || "" : "",
      category: "category" in record ? record.category : "",
      parentGroup: "parentGroup" in record ? record.parentGroup || "" : "",
      image: "image" in record ? record.image || "" : "",
      logo: "logo" in record ? record.logo || "" : "",
      active: record.active,
    });
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const updateForm = (field: keyof TaxonomyForm, value: string | boolean) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "name" && !editingId) next.slug = slugify(String(value));
      return next;
    });
  };

  const uploadImage = async (files: File[]) => {
    setUploadError("");
    setUploadSuccess("");
    const invalid = files.find((file) => !allowedTypes.includes(file.type));
    if (invalid) {
      setUploadError("Only jpg, jpeg, png, and webp images are allowed.");
      return;
    }
    const tooLarge = files.find((file) => file.size > maxImageSize);
    if (tooLarge) {
      setUploadError("Each image must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    const body = new FormData();
    files.slice(0, 1).forEach((file) => body.append("files", file));
    const response = await fetch(`/api/admin/upload?folder=pacmyproduct/${mode}`, {
      method: "POST",
      body,
    });
    const result = await response.json();
    setUploading(false);

    if (!response.ok || !result.success) {
      setUploadError(result.message || "Upload failed.");
      return;
    }

    updateForm(isBrand ? "logo" : "image", result.data[0].secure_url);
    setUploadSuccess("Image uploaded successfully.");
  };

  const saveRecord = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      slug: form.slug,
      description: "description" in form ? form.description : undefined,
      category: "category" in form ? form.category : undefined,
      parentGroup: form.parentGroup,
      image: isBrand ? undefined : form.image,
      logo: isBrand ? form.logo : undefined,
      active: form.active,
    };

    await fetch(editingId ? `/api/admin/${mode}/${editingId}` : `/api/admin/${mode}`, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setModalOpen(false);
    await load();
  };

  const deleteRecord = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/${mode}/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    await load();
  };

  const addLabel = isBrand ? "Add Brand" : isSubcategory ? "Add Subcategory" : "Add Category";
  const entityLabel = isBrand ? "brand" : isSubcategory ? "subcategory" : "category";

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {(isBrand ? ["Logo", "Name", "Slug", "Active", "Actions"] : isSubcategory ? ["Image", "Name", "Slug", "Category", "Parent Group", "Active", "Actions"] : ["Image", "Name", "Slug", "Parent Group", "Active", "Actions"]).map((column) => (
                  <th key={column} className="px-4 py-3 font-bold">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td className="px-4 py-5 text-slate-500" colSpan={isSubcategory ? 7 : isBrand ? 5 : 6}>Loading {mode} from MongoDB...</td></tr>
              ) : records.length === 0 ? (
                <tr><td className="px-4 py-5 text-slate-500" colSpan={isSubcategory ? 7 : isBrand ? 5 : 6}>No {mode} yet.</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="text-slate-700">
                    <td className="px-4 py-3">
                      {("logo" in record ? record.logo : "image" in record ? record.image : "") ? <img src={"logo" in record ? record.logo : "image" in record ? record.image : ""} alt={record.name} className="h-12 w-12 rounded-md object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-400"><ImagePlus className="h-4 w-4" /></div>}
                    </td>
                    <td className="px-4 py-3 font-bold">{record.name}</td>
                    <td className="px-4 py-3">{record.slug}</td>
                    {isSubcategory && <td className="px-4 py-3">{"category" in record ? record.category : ""}</td>}
                    {!isBrand && <td className="px-4 py-3">{"parentGroup" in record ? record.parentGroup : ""}</td>}
                    <td className="px-4 py-3">{record.active ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(record)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button onClick={() => setDeleteTarget(record)} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50">
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
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">{editingId ? `Edit ${entityLabel}` : addLabel}</h2>
              <button onClick={() => setModalOpen(false)} className="rounded-md p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={saveRecord} className="grid gap-4 md:grid-cols-2">
              <Input label="Name" value={form.name} onChange={(value) => updateForm("name", value)} required />
              <Input label="Slug" value={form.slug} onChange={(value) => updateForm("slug", value)} required />
              {isSubcategory ? (
                <Select label="Category" value={"category" in form ? form.category : ""} options={categories} onChange={(value) => updateForm("category", value)} required />
              ) : (
                <TextArea label="Description" value={"description" in form ? form.description : ""} onChange={(value) => updateForm("description", value)} />
              )}
              {!isBrand && <Input label="Parent Group" value={form.parentGroup} onChange={(value) => updateForm("parentGroup", value)} />}
              <label className="flex items-center gap-2 pt-7 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={form.active} onChange={(event) => updateForm("active", event.target.checked)} />
                Active
              </label>

              <div className="md:col-span-2">
                <FileDropzone label={isBrand ? "Brand Logo Upload" : isSubcategory ? "Subcategory Image Upload" : "Category Image Upload"} uploading={uploading} onFiles={uploadImage} />
                {(isBrand ? form.logo : form.image) && (
                  <div className="mt-3 relative h-44 w-44 overflow-hidden rounded-lg border border-slate-200">
                    <img src={isBrand ? form.logo : form.image} alt={`${entityLabel} preview`} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => updateForm(isBrand ? "logo" : "image", "")} className="absolute right-2 top-2 rounded-md bg-white/90 p-1 text-slate-700 shadow"><X className="h-4 w-4" /></button>
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
                <button disabled={saving || uploading} type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500 disabled:opacity-60">
                  {saving ? "Saving..." : editingId ? "Save Changes" : addLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl">
            <h2 className="text-lg font-black">Are you sure you want to delete this {entityLabel}?</h2>
            <p className="mt-2 text-sm text-slate-500">{deleteTarget.name}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={deleteRecord} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-500">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FileDropzone({ label, uploading, onFiles }: { label: string; uploading: boolean; onFiles: (files: File[]) => void }) {
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
      <span className="mt-1 text-xs font-semibold text-slate-500">Drag file here or click to upload. JPG, PNG, WEBP. Max 5MB.</span>
      <input className="hidden" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(event) => handleFiles(event.target.files)} />
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

function Select({ label, value, options, onChange, required = false }: { label: string; value: string; options: OptionRecord[]; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-slate-700">
      {label}
      <select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-950 outline-none focus:border-red-400">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>{option.name}</option>
        ))}
      </select>
    </label>
  );
}
