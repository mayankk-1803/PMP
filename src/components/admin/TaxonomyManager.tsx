"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImagePlus, Pencil, Plus, Trash2, UploadCloud, X, GripVertical, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Mode = "categories" | "subcategories" | "brands";

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentGroup?: string;
  image?: string;
  cloudinaryPublicId?: string;
  active: boolean;
  order?: number;
  createdAt?: string;
}

interface SubcategoryRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  parentGroup?: string;
  image?: string;
  cloudinaryPublicId?: string;
  active: boolean;
  order?: number;
  createdAt?: string;
}

interface BrandRecord {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  cloudinaryPublicId?: string;
  industry?: string;
  category?: string;
  description?: string;
  active: boolean;
  order?: number;
  createdAt?: string;
}

type ManagerRecord = CategoryRecord | SubcategoryRecord | BrandRecord;

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
  cloudinaryPublicId: string;
  active: boolean;
  order: number;
}

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024; // 5MB
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyCategory: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  cloudinaryPublicId: "",
  active: true,
  order: 0,
};

const emptySubcategory: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  cloudinaryPublicId: "",
  active: true,
  order: 0,
};

const emptyBrand: TaxonomyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  parentGroup: "",
  image: "",
  logo: "",
  cloudinaryPublicId: "",
  active: true,
  order: 0,
};

export function TaxonomyManager({ mode }: { mode: Mode }) {
  const isSubcategory = mode === "subcategories";
  const isBrand = mode === "brands";
  
  const [mounted, setMounted] = useState(false);
  const [records, setRecords] = useState<ManagerRecord[]>([]);
  const [categories, setCategories] = useState<OptionRecord[]>([]);
  const [form, setForm] = useState<TaxonomyForm>(isBrand ? emptyBrand : isSubcategory ? emptySubcategory : emptyCategory);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagerRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // File Upload State (Preview before upload)
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const requests = [fetch(`/api/admin/${mode}`)];
    if (isSubcategory) requests.push(fetch("/api/catalog/categories"));
    const responses = await Promise.all(requests);
    const payloads = await Promise.all(responses.map((response) => response.json()));
    
    // Sort by order field
    const fetchedRecords = payloads[0].data ?? [];
    fetchedRecords.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    setRecords(fetchedRecords);
    if (isSubcategory) setCategories(payloads[1].data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
    load();
  }, [mode]);

  const openCreate = () => {
    setEditingId(null);
    setForm(isBrand ? emptyBrand : isSubcategory ? emptySubcategory : emptyCategory);
    setPendingFile(null);
    setPreviewUrl("");
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
      category: "category" in record ? record.category || "" : "",
      parentGroup: "industry" in record ? record.industry || "" : "parentGroup" in record ? record.parentGroup || "" : "",
      image: "image" in record ? record.image || "" : "",
      logo: "logo" in record ? record.logo || "" : "",
      cloudinaryPublicId: record.cloudinaryPublicId || "",
      active: record.active,
      order: "order" in record ? Number(record.order) || 0 : 0,
    });
    setPendingFile(null);
    setPreviewUrl("");
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const updateForm = (field: keyof TaxonomyForm, value: string | boolean | number) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "name" && !editingId) next.slug = slugify(String(value));
      return next;
    });
  };

  // 1. IMAGE PREVIEW BEFORE UPLOAD HANDLERS
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    setUploadSuccess("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Only jpg, jpeg, png, and webp images are allowed.");
      return;
    }
    if (file.size > maxImageSize) {
      setUploadError("The file must be 5MB or smaller.");
      return;
    }

    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removePendingFile = () => {
    setPendingFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Helper upload function
  const uploadImageToServer = async (file: File): Promise<{ url: string; publicId: string }> => {
    const body = new FormData();
    body.append("files", file);

    const response = await fetch(`/api/admin/upload?folder=pacmyproduct/${mode}`, {
      method: "POST",
      body,
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Upload failed");
    }
    return { url: result.data[0].secure_url, publicId: result.data[0].public_id };
  };

  const saveRecord = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      let finalImageUrl = isBrand ? form.logo : form.image;
      let finalCloudinaryPublicId = form.cloudinaryPublicId;
      if (pendingFile) {
        const uploaded = await uploadImageToServer(pendingFile);
        finalImageUrl = uploaded.url;
        finalCloudinaryPublicId = uploaded.publicId;
      }

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        category: isSubcategory ? form.category : undefined,
        parentGroup: form.parentGroup,
        image: isBrand ? undefined : finalImageUrl,
        logo: isBrand ? finalImageUrl : undefined,
        cloudinaryPublicId: finalCloudinaryPublicId,
        industry: isBrand ? form.parentGroup : undefined,
        active: form.active,
        order: Number(form.order) || 0,
      };

      const res = await fetch(editingId ? `/api/admin/${mode}/${editingId}` : `/api/admin/${mode}`, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to save record");
      }

      setSaving(false);
      setModalOpen(false);
      setPendingFile(null);
      setPreviewUrl("");
      await load();
    } catch (err: any) {
      setUploadError(err.message || "An error occurred while saving the record.");
      setSaving(false);
    }
  };

  const deleteRecord = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/${mode}/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    await load();
  };

  // 2. DRAG & DROP REORDERPERSISTENCE
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(records);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    // Save local state immediately
    setRecords(reordered.map((item, index) => ({ ...item, order: index + 1 })));

    const ids = reordered.map((r) => r.id);
    const entityType = mode === "categories" ? "Category" : mode === "subcategories" ? "Subcategory" : "Brand";
    
    await fetch("/api/admin/catalog/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entityType, ids }),
    });
  };

  const addLabel = isBrand ? "Add Brand" : isSubcategory ? "Add Subcategory" : "Add Category";
  const entityLabel = isBrand ? "brand" : isSubcategory ? "subcategory" : "category";

  if (!mounted) return null;

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[#6E7757] px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#4E583F] shadow-md">
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>

      {/* Drag & Drop Reordering Table */}
      <div className="overflow-hidden rounded-xl border border-[#DDD5C8] bg-[#FFFDF8] shadow-sm">
        <div className="overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="taxonomy-list">
              {(provided) => (
                <table className="w-full min-w-[860px] border-collapse text-left text-sm" ref={provided.innerRef} {...provided.droppableProps}>
                  <thead className="bg-[#F8F5EF] text-xs uppercase tracking-wider text-[#6B6B63] border-b border-[#DDD5C8]">
                    <tr>
                      <th className="px-4 py-3 font-bold w-12 text-center">Move</th>
                      {(isBrand 
                        ? ["Logo", "Name", "Industry", "Category", "Active", "Actions"] 
                        : isSubcategory 
                          ? ["Image", "Name", "Slug", "Category", "Parent Group", "Active", "Actions"] 
                          : ["Image", "Name", "Slug", "Parent Group", "Active", "Actions"]
                      ).map((column) => (
                        <th key={column} className="px-4 py-3 font-bold">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD5C8]">
                    {loading ? (
                      <tr><td className="px-4 py-8 text-center text-[#6B6B63]" colSpan={isSubcategory ? 9 : isBrand ? 8 : 8}><Loader2 className="h-5 w-5 animate-spin mx-auto text-[#6E7757] mb-2" />Loading records from MongoDB...</td></tr>
                    ) : records.length === 0 ? (
                      <tr><td className="px-4 py-8 text-center text-[#9A9387] font-bold" colSpan={isSubcategory ? 9 : isBrand ? 8 : 8}>No records found. Click add above.</td></tr>
                    ) : (
                      records.map((record, idx) => {
                        const thumb = "logo" in record ? record.logo : "image" in record ? record.image : "";
                        return (
                          <Draggable key={record.id} draggableId={record.id} index={idx}>
                            {(dragProvided) => (
                              <tr ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="text-[#4E583F] hover:bg-[#F8F5EF]/70 transition">
                                <td className="px-4 py-3 text-center" {...dragProvided.dragHandleProps}>
                                  <GripVertical className="h-4 w-4 text-[#9A9387] hover:text-[#4E583F] mx-auto cursor-grab" />
                                </td>
                                <td className="px-4 py-3">
                                  {thumb ? (
                                    <img src={thumb} alt={record.name} className="h-10 w-10 rounded-lg object-cover border border-[#E5DED2]" />
                                  ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFE7DB] text-[#9A9387]"><ImagePlus className="h-4 w-4" /></div>
                                  )}
                                </td>
                                <td className="px-4 py-3 font-bold text-[#2B2B2B]">{record.name}</td>
                                {isBrand ? (
                                  <>
                                    <td className="px-4 py-3">{"industry" in record ? record.industry : ""}</td>
                                    <td className="px-4 py-3 font-semibold text-[#6B6B63]">{"category" in record ? record.category : ""}</td>
                                  </>
                                ) : (
                                  <td className="px-4 py-3 text-xs font-mono">{record.slug}</td>
                                )}
                                {isSubcategory && <td className="px-4 py-3"><span className="rounded bg-[#EFE7DB] px-2 py-0.5 text-xs text-[#5F6752] font-semibold">{"category" in record ? record.category : ""}</span></td>}
                                {!isBrand && <td className="px-4 py-3 text-[#6B6B63] font-medium">{"parentGroup" in record ? record.parentGroup : ""}</td>}
                                <td className="px-4 py-3">
                                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${record.active ? "bg-emerald-50 text-emerald-700" : "bg-[#EFE7DB] text-[#6B6B63]"}`}>
                                    {record.active ? "Active" : "Hidden"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button onClick={() => openEdit(record)} className="inline-flex items-center gap-1 rounded-md border border-[#DDD5C8] bg-[#FFFDF8] px-2 py-1 text-xs font-bold text-[#4E583F] hover:bg-[#F8F5EF] shadow-sm">
                                      <Pencil className="h-3 w-3" /> Edit
                                    </button>
                                    <button onClick={() => setDeleteTarget(record)} className="inline-flex items-center gap-1 rounded-md border border-[#EAD7C8] bg-[#FFFDF8] px-2 py-1 text-xs font-bold text-[#8A4B22] hover:bg-[#F3E7D7] shadow-sm">
                                      <Trash2 className="h-3 w-3" /> Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        );
                      })
                    )}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* CRUD Creation/Edit Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#DDD5C8] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E9E1D5] pb-3">
              <h2 className="text-xl font-black">{editingId ? `Edit ${entityLabel}` : addLabel}</h2>
              <button onClick={() => setModalOpen(false)} className="rounded-md p-1.5 hover:bg-[#EFE7DB]"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveRecord} className="grid gap-4 md:grid-cols-2 text-left">
              
              <Input label="Name" value={form.name} onChange={(value) => updateForm("name", value)} required />
              <Input label="Slug" value={form.slug} onChange={(value) => updateForm("slug", value)} required />
              
              {isBrand ? (
                <>
                  <Input label="Industry" value={form.parentGroup} onChange={(value) => updateForm("parentGroup", value)} />
                  <Input label="Brand Category" value={form.category} onChange={(value) => updateForm("category", value)} />
                </>
              ) : isSubcategory ? (
                <>
                  <Select label="Category" value={"category" in form ? form.category : ""} options={categories} onChange={(value) => updateForm("category", value)} required />
                  <Input label="Parent Group" value={form.parentGroup} onChange={(value) => updateForm("parentGroup", value)} />
                </>
              ) : (
                <Input label="Parent Group" value={form.parentGroup} onChange={(value) => updateForm("parentGroup", value)} />
              )}

              <div className="md:col-span-2">
                <TextArea label="Description" value={form.description} onChange={(value) => updateForm("description", value)} />
              </div>

              <label className="flex items-center gap-2 pt-6 text-sm font-bold text-[#4E583F] cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(event) => updateForm("active", event.target.checked)} />
                Publish Status (Active)
              </label>

              {/* 3. IMAGE PREVIEW BEFORE UPLOAD FILE DROPAREA */}
              <div className="md:col-span-2 border-t border-[#E9E1D5] pt-4">
                <span className="block text-sm font-bold text-[#4E583F] mb-2">Image Upload</span>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#CFC5B7] bg-[#F8F5EF] px-4 py-3 hover:bg-[#FFFDF8] hover:border-[#8A6A3B] transition">
                    <UploadCloud className="h-5 w-5 text-[#6E7757]" />
                    <span className="text-xs font-black uppercase text-[#3F4734]">Select Image</span>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  {/* Pre-existing preview */}
                  {(isBrand ? form.logo : form.image) && !previewUrl && (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-[#DDD5C8]">
                      <img src={isBrand ? form.logo : form.image} alt="Pre-existing" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => updateForm(isBrand ? "logo" : "image", "")} className="absolute right-1 top-1 bg-[#FFFDF8]/90 p-0.5 rounded shadow text-[#5F6752] hover:text-[#6E7757]"><X className="h-3 w-3" /></button>
                    </div>
                  )}

                  {/* Pending upload preview */}
                  {previewUrl && (
                    <div className="flex items-center gap-3 bg-[#F3E7D7]/40 border border-[#EAD7C8] rounded-lg p-2 max-w-sm">
                      <img src={previewUrl} alt="Pending upload" className="h-14 w-14 rounded object-cover" />
                      <div className="min-w-0 text-left">
                        <div className="text-xs font-bold text-[#2B2B2B] truncate">{pendingFile?.name}</div>
                        <div className="text-[10px] text-[#6B6B63] font-semibold">{pendingFile ? (pendingFile.size / 1024).toFixed(1) : 0} KB</div>
                        <button type="button" onClick={removePendingFile} className="text-[10px] text-[#6E7757] hover:text-[#2B2B2B] font-black uppercase mt-1.5 block">Remove File</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(uploadError || uploadSuccess) && (
                <div className={`md:col-span-2 rounded-lg px-3 py-2 text-xs font-bold ${uploadError ? "bg-[#F3E7D7] text-[#8A4B22]" : "bg-emerald-50 text-emerald-700"}`}>
                  {uploadError || uploadSuccess}
                </div>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 border-t border-[#E9E1D5] pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg border border-[#DDD5C8] px-4 py-2 text-sm font-bold text-[#4E583F] hover:bg-[#F8F5EF]">Cancel</button>
                <button disabled={saving} type="submit" className="rounded-lg bg-[#6E7757] px-5 py-2 text-sm font-black text-white hover:bg-[#4E583F] disabled:opacity-60 flex items-center gap-1.5 uppercase tracking-wide">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    editingId ? "Save Changes" : addLabel
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete soft confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#DDD5C8] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl text-left">
            <h2 className="text-lg font-black text-[#2B2B2B]">Archive {entityLabel}?</h2>
            <p className="mt-2 text-sm text-[#6B6B63]">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? It will be moved to the Trash Bin and hidden from the store.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-[#DDD5C8] px-4 py-2 text-sm font-bold text-[#4E583F] hover:bg-[#F8F5EF]">Cancel</button>
              <button onClick={deleteRecord} className="rounded-lg bg-[#8A6A3B] px-4 py-2 text-sm font-black text-white hover:bg-[#6E5330]">Confirm Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-[#4E583F]">
      {label}
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] outline-none focus:border-[#6E7757]" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm font-bold text-[#4E583F]">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] outline-none focus:border-[#6E7757]" />
    </label>
  );
}

function Select({ label, value, options, onChange, required = false }: { label: string; value: string; options: OptionRecord[]; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block text-sm font-bold text-[#4E583F]">
      {label}
      <select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] outline-none focus:border-[#6E7757]">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>{option.name}</option>
        ))}
      </select>
    </label>
  );
}
