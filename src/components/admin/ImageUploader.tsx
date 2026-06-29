"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X, Loader2, RefreshCw, Trash2, Eye, Plus, ArrowLeftRight, ImagePlus } from "lucide-react";
import { useImageUploader, UploadTask } from "@/hooks/useImageUploader";
import { UPLOAD_CONFIG } from "@/lib/admin/uploadConfig";

interface ImageUploaderProps {
  value: string | string[];
  publicIds: string | string[];
  multiple?: boolean;
  folder: string;
  label: string;
  disabled?: boolean;
  onChange: (urls: string | string[], ids: string | string[]) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  maxFiles?: number;
}

export function ImageUploader({
  value,
  publicIds,
  multiple = false,
  folder,
  label,
  disabled = false,
  onChange,
  onUploadStart,
  onUploadEnd,
  maxFiles = 15,
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [uploadErrorMsg, setUploadErrorMsg] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number | null>(null);

  // Normalize existing URLs and IDs to arrays
  const existingUrls = Array.isArray(value) ? value : value ? [value] : [];
  const existingPublicIds = Array.isArray(publicIds) ? publicIds : publicIds ? [publicIds] : [];

  const handleUrlsChange = (newUrls: string[], newIds: string[]) => {
    if (multiple) {
      onChange(newUrls, newIds);
    } else {
      onChange(newUrls[0] || "", newIds[0] || "");
    }
  };

  const handleUploaderError = (msg: string) => {
    setUploadErrorMsg(msg);
    setAnnouncement(`Upload error: ${msg}`);
  };

  const {
    tasks,
    isUploading,
    uploadFiles,
    retryUpload,
    cancelUpload,
    removeUpload,
    replaceUpload,
  } = useImageUploader({
    multiple,
    folder,
    existingUrls,
    existingPublicIds,
    onChange: handleUrlsChange,
    onUploadStart,
    onUploadEnd,
    onUploadError: handleUploaderError,
    maxFiles,
  });

  // Track task progress announcements
  useEffect(() => {
    const activeTasks = tasks.filter((t) => t.status === "uploading");
    if (activeTasks.length > 0) {
      const summary = activeTasks
        .map((t) => `${t.name}: ${t.progress}%`)
        .join(", ");
      setAnnouncement(`Uploading: ${summary}`);
    }
  }, [tasks]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadErrorMsg(null);
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag-and-Drop Event Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled || isUploading) return;
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;
    
    setUploadErrorMsg(null);
    const files = Array.from(e.dataTransfer.files || []);
    uploadFiles(files);
  };

  // Clipboard Paste Support
  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled || isUploading) return;
    const items = Array.from(e.clipboardData.items || []);
    const files: File[] = [];

    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    if (files.length > 0) {
      setUploadErrorMsg(null);
      uploadFiles(files);
    }
  };

  // Replace Event Trigger
  const triggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    if (replaceInputRef.current) {
      replaceInputRef.current.click();
    }
  };

  const handleReplaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const index = replaceIndexRef.current;
    if (file && index !== null) {
      setUploadErrorMsg(null);
      replaceUpload(index, file);
    }
    if (replaceInputRef.current) replaceInputRef.current.value = "";
    replaceIndexRef.current = null;
  };

  // Drag-and-Drop Reordering (native HTML5)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDropReorder = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndexRaw = e.dataTransfer.getData("text/plain");
    const sourceIndex = parseInt(sourceIndexRaw, 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const reorderedUrls = [...existingUrls];
    const reorderedIds = [...existingPublicIds];

    const [movedUrl] = reorderedUrls.splice(sourceIndex, 1);
    const [movedId] = reorderedIds.splice(sourceIndex, 1);

    reorderedUrls.splice(targetIndex, 0, movedUrl);
    reorderedIds.splice(targetIndex, 0, movedId);

    handleUrlsChange(reorderedUrls, reorderedIds);
    setAnnouncement("Gallery images reordered successfully.");
  };

  const handleDragOverReorder = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4 text-left" onPaste={handlePaste}>
      {/* Screen Reader announcements */}
      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>

      <div className="flex items-center justify-between">
        <span className="block text-sm font-bold text-[#C62828]">{label}</span>
        {multiple && existingUrls.length > 0 && (
          <span className="text-xs text-[#6B6B63] font-bold">
            {existingUrls.length} of {maxFiles} files uploaded
          </span>
        )}
      </div>

      {/* Main Drag & Drop Zone */}
      {(!multiple && existingUrls.length > 0) ? null : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDragOver
              ? "border-[#D32F2F] bg-[#FDECEC] scale-[1.01]"
              : "border-[#CFC5B7] bg-[#FAF9F6] hover:bg-[#FFFDF8] hover:border-[#8A6A3B]"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={UPLOAD_CONFIG.ALLOWED_MIME_TYPES.join(",")}
            onChange={handleFileInputChange}
            disabled={disabled}
            className="hidden"
          />
          <UploadCloud className={`h-10 w-10 mb-3 ${isDragOver ? "text-[#D32F2F] animate-bounce" : "text-[#9A9387]"}`} />
          <p className="text-xs font-bold text-[#3F4734] uppercase tracking-wide">
            Drag & Drop or <span className="text-[#D32F2F]">Browse Files</span>
          </p>
          <p className="text-[10px] text-[#8A9080] font-semibold mt-1">
            PNG, JPG, WEBP, GIF, SVG, BMP, AVIF, or TIFF. Max 10MB.
          </p>
          {multiple && (
            <p className="text-[9px] text-[#D32F2F] font-bold mt-1.5 uppercase tracking-wider">
              Ctrl+V to paste screenshot
            </p>
          )}
        </div>
      )}

      {/* Hidden file input for replacement */}
      <input
        ref={replaceInputRef}
        type="file"
        accept={UPLOAD_CONFIG.ALLOWED_MIME_TYPES.join(",")}
        onChange={handleReplaceInputChange}
        className="hidden"
      />

      {/* Display errors if any */}
      {uploadErrorMsg && (
        <div className="rounded-lg bg-[#FDECEC] border border-[#F5C2C2] px-3.5 py-2.5 text-xs font-bold text-[#D32F2F] flex items-center justify-between">
          <span>{uploadErrorMsg}</span>
          <button onClick={() => setUploadErrorMsg(null)} className="p-0.5 text-[#D32F2F] hover:text-[#2B2B2B]">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Active Tasks Upload Progress Grid */}
      {tasks.length > 0 && (
        <div className="space-y-2 border-t border-[#E9E1D5] pt-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D32F2F] block">
            Background Queue Uploads ({tasks.length})
          </span>
          <div className="grid gap-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 bg-white border border-[#E5DED2] rounded-xl p-3 shadow-xs text-xs font-semibold relative overflow-hidden"
              >
                {/* Micro Progress Bar background */}
                <div
                  className="absolute bottom-0 left-0 h-1 bg-[#D32F2F]/20 transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />

                {/* Optimistic Preview Thumbnail */}
                <div className="h-10 w-10 rounded-lg overflow-hidden border border-[#FAF9F6] bg-gray-50 flex-shrink-0 relative">
                  <img src={task.previewUrl} alt="preview" className="h-full w-full object-cover" />
                  {task.status === "uploading" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-[#2B2B2B] truncate pr-2">{task.name}</span>
                    <span className="text-[10px] text-[#6B6B63] font-bold">
                      {(task.size / 1024).toFixed(0)} KB
                    </span>
                  </div>

                  {/* Task Status indicators */}
                  <div className="flex items-center gap-2">
                    {task.status === "pending" && (
                      <span className="text-[10px] text-[#8A6A3B] uppercase font-black tracking-wider flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8A6A3B] animate-ping" /> Queued
                      </span>
                    )}
                    {task.status === "uploading" && (
                      <span className="text-[10px] text-[#D32F2F] uppercase font-black tracking-wider flex items-center gap-1">
                        Uploading ({task.progress}%)
                      </span>
                    )}
                    {task.status === "error" && (
                      <span className="text-[10px] text-[#C62828] font-bold">
                        Failed: {task.error || "Network error"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex items-center gap-1.5">
                  {task.status === "error" && (
                    <button
                      type="button"
                      onClick={() => retryUpload(task.id)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-[#D32F2F]"
                      title="Retry upload"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {(task.status === "uploading" || task.status === "pending") && (
                    <button
                      type="button"
                      onClick={() => cancelUpload(task.id)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-[#6B6B63]"
                      title="Cancel upload"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded/Saved Image Display Grid */}
      {existingUrls.length > 0 && (
        <div className="space-y-2">
          {multiple && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A9387] block">
              Active Media Gallery (Drag to Reorder)
            </span>
          )}

          <div
            className={
              multiple
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                : "relative w-full max-w-sm"
            }
          >
            {existingUrls.map((url, index) => (
              <div
                key={existingPublicIds[index] || url}
                draggable={multiple}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOverReorder}
                onDrop={(e) => handleDropReorder(e, index)}
                className={`group relative rounded-xl overflow-hidden border border-[#F5C2C2] bg-white transition-all shadow-xs ${
                  multiple
                    ? "aspect-square cursor-grab active:cursor-grabbing hover:border-[#D32F2F]/40 hover:shadow-md"
                    : "h-48 w-48"
                }`}
              >
                <img src={url} alt={`media-${index}`} className="h-full w-full object-cover" />

                {/* Overlays / Hover Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5">
                  {/* Preview Image Lightbox */}
                  <button
                    type="button"
                    onClick={() => setLightboxUrl(url)}
                    className="p-1.5 rounded-lg bg-white text-[#2B2B2B] hover:bg-[#D32F2F] hover:text-white transition-colors"
                    title="Fullscreen Preview"
                    aria-label={`Preview media item ${index + 1}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {/* Replace Image */}
                  <button
                    type="button"
                    onClick={() => triggerReplace(index)}
                    className="p-1.5 rounded-lg bg-white text-[#2B2B2B] hover:bg-[#D32F2F] hover:text-white transition-colors"
                    title="Replace Image"
                    aria-label={`Replace media item ${index + 1}`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Remove Image */}
                  <button
                    type="button"
                    onClick={() => removeUpload(index)}
                    className="p-1.5 rounded-lg bg-white text-[#C62828] hover:bg-[#D32F2F] hover:text-white transition-colors"
                    title="Remove Image"
                    aria-label={`Delete media item ${index + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Index badge */}
                {multiple && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-black/75 text-white tracking-widest pointer-events-none">
                    #{index + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-all duration-300"
          onClick={() => setLightboxUrl(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setLightboxUrl(null)}
            aria-label="Close fullscreen preview"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxUrl} alt="Fullscreen light-box view" className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
