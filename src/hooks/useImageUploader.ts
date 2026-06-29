import { useState, useCallback, useEffect, useRef } from "react";
import { UPLOAD_CONFIG } from "@/lib/admin/uploadConfig";
import { uploadFile } from "@/lib/admin/uploadService";

export interface UploadTask {
  id: string; // unique ID
  name: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  url?: string;
  publicId?: string;
  file: File;
  previewUrl: string;
  cancelRef?: { abort?: () => void };
  hash?: string;
}

interface UseImageUploaderProps {
  multiple?: boolean;
  folder: string;
  existingUrls: string[];
  existingPublicIds: string[];
  onChange: (urls: string[], publicIds: string[]) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  onUploadError?: (message: string) => void;
  maxFiles?: number;
}

export function useImageUploader({
  multiple = false,
  folder,
  existingUrls,
  existingPublicIds,
  onChange,
  onUploadStart,
  onUploadEnd,
  onUploadError,
  maxFiles = 15,
}: UseImageUploaderProps) {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const activeUploadsCount = tasks.filter((t) => t.status === "uploading").length;
  const isUploading = tasks.some((t) => t.status === "uploading" || t.status === "pending");

  // Keep references to prevent outdated callback triggers
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const onUploadStartRef = useRef(onUploadStart);
  onUploadStartRef.current = onUploadStart;

  const onUploadEndRef = useRef(onUploadEnd);
  onUploadEndRef.current = onUploadEnd;

  // Track if all uploads are done to trigger callbacks
  useEffect(() => {
    if (isUploading) {
      onUploadStartRef.current?.();
    } else {
      onUploadEndRef.current?.();
    }
  }, [isUploading]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      tasks.forEach((t) => {
        if (t.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(t.previewUrl);
        }
      });
    };
  }, [tasks]);

  // Helper to compute SHA-256 of a file using Web Crypto API
  const computeFileHash = async (file: File): Promise<string> => {
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return `${file.name}-${file.size}-${file.lastModified}`;
    }
  };

  // Perform upload with exponential backoff retry support
  const performUpload = useCallback(
    async (task: UploadTask, retryAttempt = 0) => {
      const cancelRef: { abort?: () => void } = {};
      
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: "uploading", error: undefined, cancelRef } : t))
      );

      try {
        const result = await uploadFile(
          task.file,
          folder,
          (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? { ...t, progress: Math.min(progress, 99) } : t))
              );
            }
          },
          cancelRef
        );

        // Success
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: "success", progress: 100, url: result.url, publicId: result.publicId }
              : t
          )
        );

        // Notify parent of updated list
        if (multiple) {
          onChangeRef.current(
            [...existingUrls, result.url],
            [...existingPublicIds, result.publicId]
          );
        } else {
          onChangeRef.current([result.url], [result.publicId]);
        }
      } catch (error: any) {
        // Check if this was cancelled
        if (error.message === "Upload cancelled by user.") {
          setTasks((prev) => prev.filter((t) => t.id !== task.id));
          return;
        }

        // Automatic retry with exponential backoff (up to UPLOAD_CONFIG.RETRY_COUNT)
        if (retryAttempt < UPLOAD_CONFIG.RETRY_COUNT) {
          const delay = UPLOAD_CONFIG.RETRY_INITIAL_DELAY * Math.pow(2, retryAttempt);
          setTimeout(() => {
            performUpload(task, retryAttempt + 1);
          }, delay);
          return;
        }

        // Final failure
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: "error", error: error.message || UPLOAD_CONFIG.ERROR_MESSAGES.GENERIC_ERROR }
              : t
          )
        );
        onUploadError?.(error.message || UPLOAD_CONFIG.ERROR_MESSAGES.GENERIC_ERROR);
      }
    },
    [folder, existingUrls, existingPublicIds, multiple, onUploadError]
  );

  // Queue scheduler to process pending tasks up to concurrency limit
  useEffect(() => {
    const pendingTasks = tasks.filter((t) => t.status === "pending");
    if (pendingTasks.length === 0) return;

    const availableSlots = UPLOAD_CONFIG.MAX_CONCURRENT_UPLOADS - activeUploadsCount;
    if (availableSlots <= 0) return;

    // Start uploads for first N pending tasks
    pendingTasks.slice(0, availableSlots).forEach((task) => {
      performUpload(task);
    });
  }, [tasks, activeUploadsCount, performUpload]);

  // Main file upload trigger
  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      // Handle single file slot limit
      const currentCount = existingUrls.length + tasks.length;
      if (multiple && currentCount + files.length > maxFiles) {
        onUploadError?.(`You can only upload up to ${maxFiles} gallery images.`);
        return;
      }

      const newTasks: UploadTask[] = [];

      for (const file of files) {
        // Validation Checks
        if (file.size === 0) {
          onUploadError?.(`${file.name}: ${UPLOAD_CONFIG.ERROR_MESSAGES.EMPTY_FILE}`);
          continue;
        }
        if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
          onUploadError?.(`${file.name}: ${UPLOAD_CONFIG.ERROR_MESSAGES.FILE_TOO_LARGE}`);
          continue;
        }
        
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        if (
          !UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(file.type) &&
          !UPLOAD_CONFIG.ALLOWED_EXTENSIONS.includes(ext)
        ) {
          onUploadError?.(`${file.name}: ${UPLOAD_CONFIG.ERROR_MESSAGES.UNSUPPORTED_FORMAT}`);
          continue;
        }

        // Fast Duplicate Check (filename + size)
        const isFastDuplicate =
          tasks.some((t) => t.name === file.name && t.size === file.size) ||
          existingUrls.some((url) => {
            const decoded = decodeURIComponent(url);
            return decoded.includes(file.name);
          });

        if (isFastDuplicate) {
          // Deep Check: content-based hash check
          const fileHash = await computeFileHash(file);
          const isDeepDuplicate = tasks.some((t) => t.hash === fileHash);
          if (isDeepDuplicate) {
            onUploadError?.(`${file.name}: ${UPLOAD_CONFIG.ERROR_MESSAGES.DUPLICATE_CONTENT}`);
            continue;
          }
        }

        // Create Task
        const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
        const previewUrl = URL.createObjectURL(file);
        
        newTasks.push({
          id,
          name: file.name,
          size: file.size,
          progress: 0,
          status: "pending",
          file,
          previewUrl,
        });
      }

      if (newTasks.length > 0) {
        if (!multiple) {
          // For single uploader, clear previous uploads/existing lists immediately (Optimistic replacement)
          tasks.forEach((t) => t.cancelRef?.abort?.());
          setTasks([newTasks[0]]);
          onChangeRef.current([], []);
        } else {
          setTasks((prev) => [...prev, ...newTasks]);
        }
      }
    },
    [tasks, existingUrls, multiple, maxFiles, onUploadError]
  );

  const retryUpload = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (task && task.status === "error") {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: "pending", progress: 0, error: undefined } : t))
        );
      }
    },
    [tasks]
  );

  const cancelUpload = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        if (task.cancelRef?.abort) {
          task.cancelRef.abort();
        } else {
          setTasks((prev) => prev.filter((t) => t.id !== id));
        }
      }
    },
    [tasks]
  );

  const removeUpload = useCallback(
    (index: number) => {
      const newUrls = existingUrls.filter((_, i) => i !== index);
      const newIds = existingPublicIds.filter((_, i) => i !== index);
      onChangeRef.current(newUrls, newIds);
    },
    [existingUrls, existingPublicIds]
  );

  const replaceUpload = useCallback(
    async (index: number, file: File) => {
      if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        onUploadError?.(UPLOAD_CONFIG.ERROR_MESSAGES.FILE_TOO_LARGE);
        return;
      }
      
      // Perform immediate replacement upload
      const id = `replace-${index}-${Date.now()}`;
      const previewUrl = URL.createObjectURL(file);
      const tempTask: UploadTask = {
        id,
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading",
        file,
        previewUrl,
      };

      setTasks((prev) => [...prev, tempTask]);

      try {
        const result = await uploadFile(file, folder);
        
        // Remove replaced upload task
        setTasks((prev) => prev.filter((t) => t.id !== id));

        // Update arrays at specific index
        const updatedUrls = [...existingUrls];
        const updatedIds = [...existingPublicIds];
        updatedUrls[index] = result.url;
        updatedIds[index] = result.publicId;

        onChangeRef.current(updatedUrls, updatedIds);
      } catch (error: any) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: "error", error: error.message } : t))
        );
        onUploadError?.(error.message || "Replacement upload failed.");
      }
    },
    [folder, existingUrls, existingPublicIds, onUploadError]
  );

  return {
    tasks,
    isUploading,
    uploadFiles,
    retryUpload,
    cancelUpload,
    removeUpload,
    replaceUpload,
    clearTasks: () => setTasks([]),
  };
}
