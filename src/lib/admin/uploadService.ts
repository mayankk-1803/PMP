import { UPLOAD_CONFIG } from "./uploadConfig";

export interface UploadResult {
  url: string;
  publicId: string;
}

export function uploadFile(
  file: File,
  folder: string,
  onProgress?: (event: ProgressEvent) => void,
  cancelRef?: { abort?: () => void }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Set up cancellation hook if provided
    if (cancelRef) {
      cancelRef.abort = () => {
        xhr.abort();
      };
    }

    xhr.open("POST", `/api/admin/upload?folder=${encodeURIComponent(folder)}`);

    // Add upload timeout
    xhr.timeout = UPLOAD_CONFIG.UPLOAD_TIMEOUT;

    if (onProgress) {
      xhr.upload.onprogress = onProgress;
    }

    xhr.ontimeout = () => {
      reject(new Error(UPLOAD_CONFIG.ERROR_MESSAGES.UPLOAD_TIMEOUT));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.success && res.data && res.data.length > 0) {
            resolve({
              url: res.data[0].secure_url,
              publicId: res.data[0].public_id,
            });
          } else {
            reject(new Error(res.message || UPLOAD_CONFIG.ERROR_MESSAGES.GENERIC_ERROR));
          }
        } catch {
          reject(new Error("Failed to parse server response."));
        }
      } else {
        try {
          const res = JSON.parse(xhr.responseText);
          reject(new Error(res.message || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("A network error occurred. Please check your connection."));
    };

    xhr.onabort = () => {
      reject(new Error("Upload cancelled by user."));
    };

    const formData = new FormData();
    formData.append("files", file);
    xhr.send(formData);
  });
}

export async function deleteFile(publicId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/upload`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicIds: [publicId] }),
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}

export async function deleteUnusedFiles(publicIds: string[]): Promise<boolean> {
  if (publicIds.length === 0) return true;
  try {
    const res = await fetch(`/api/admin/upload`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicIds }),
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}
