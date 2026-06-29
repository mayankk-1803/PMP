export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_CONCURRENT_UPLOADS: 3,
  RETRY_COUNT: 3,
  RETRY_INITIAL_DELAY: 1000, // 1 second
  UPLOAD_TIMEOUT: 60000, // 60 seconds

  ALLOWED_MIME_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/svg+xml",
  ],

  ALLOWED_EXTENSIONS: ["jpg", "jpeg", "png", "webp", "avif", "gif", "bmp", "tiff", "svg"],

  FOLDERS: {
    PRODUCTS: "pacmyproduct/products",
    CATEGORIES: "pacmyproduct/categories",
    SUBCATEGORIES: "pacmyproduct/subcategories",
    BRANDS: "pacmyproduct/brands",
    ADMIN: "pacmyproduct/admin",
  } as const,

  ERROR_MESSAGES: {
    FILE_TOO_LARGE: "File size exceeds the 10MB limit.",
    UNSUPPORTED_FORMAT: "Format is not supported. Supported: JPG, JPEG, PNG, WEBP, AVIF, GIF, BMP, TIFF, SVG.",
    DUPLICATE_FILE: "This file has already been added to the upload list.",
    CORRUPTED_FILE: "The image file appears to be corrupted or invalid.",
    EMPTY_FILE: "The selected file is empty.",
    UPLOAD_TIMEOUT: "The upload timed out. Please check your connection and try again.",
    DUPLICATE_CONTENT: "Duplicate content detected! An identical image is already uploaded.",
    GENERIC_ERROR: "Something went wrong during the upload. Please try again.",
  },
};
