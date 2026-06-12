// @ts-nocheck
{
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

async function cloudinaryAssetExists(publicId) {
  try {
    await cloudinary.api.resource(publicId, { resource_type: "image" });
    return true;
  } catch (error) {
    if (error?.http_code === 404 || error?.error?.http_code === 404) return false;
    throw error;
  }
}

async function listCloudinaryAssets(prefix) {
  const resources = [];
  let nextCursor;
  do {
    const response = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
    });
    resources.push(...(response.resources || []));
    nextCursor = response.next_cursor;
  } while (nextCursor);
  return resources;
}

async function collectReferences(db) {
  const configs = [
    { collection: "products", urlFields: ["featuredImage", "galleryImages", "images"], publicIdFields: ["cloudinaryPublicId", "galleryPublicIds"] },
    { collection: "categories", urlFields: ["image"], publicIdFields: ["cloudinaryPublicId"] },
    { collection: "subcategories", urlFields: ["image", "featuredImage"], publicIdFields: ["cloudinaryPublicId"] },
    { collection: "brands", urlFields: ["logo"], publicIdFields: ["cloudinaryPublicId"] },
  ];
  const publicIds = new Map();
  const missingPublicIds = [];

  for (const config of configs) {
    const docs = await db.collection(config.collection).find({}).toArray();
    for (const doc of docs) {
      const record = { collection: config.collection, id: String(doc._id), name: doc.title || doc.name || doc.slug };
      for (const field of config.publicIdFields) {
        const value = doc[field];
        const ids = Array.isArray(value) ? value : value ? [value] : [];
        for (const id of ids) {
          if (!publicIds.has(id)) publicIds.set(id, []);
          publicIds.get(id).push(record);
        }
      }

      const hasCloudinaryUrl = config.urlFields.some((field) => {
        const value = doc[field];
        const values = Array.isArray(value) ? value : value ? [value] : [];
        return values.some((url) => typeof url === "string" && url.includes("res.cloudinary.com"));
      });
      const hasPublicId = config.publicIdFields.some((field) => {
        const value = doc[field];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
      });
      if (hasCloudinaryUrl && !hasPublicId) missingPublicIds.push(record);
    }
  }

  return { publicIds, missingPublicIds };
}

async function main() {
  loadEnv();
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not configured");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  const db = mongoose.connection.db;
  const { publicIds, missingPublicIds } = await collectReferences(db);

  const brokenReferences = [];
  for (const publicId of publicIds.keys()) {
    if (!(await cloudinaryAssetExists(publicId))) {
      brokenReferences.push({ publicId, records: publicIds.get(publicId) });
    }
  }

  const cloudAssets = await listCloudinaryAssets("pacmyproduct/");
  const orphanAssets = cloudAssets
    .filter((asset) => !publicIds.has(asset.public_id))
    .map((asset) => ({
      publicId: asset.public_id,
      url: asset.secure_url,
      bytes: asset.bytes,
      createdAt: asset.created_at,
    }));

  await mongoose.disconnect();

  const report = {
    generatedAt: new Date().toISOString(),
    referencedPublicIds: publicIds.size,
    cloudinaryAssetsScanned: cloudAssets.length,
    missingPublicIds,
    brokenReferences,
    orphanAssets,
    summary: {
      missingPublicIds: missingPublicIds.length,
      brokenReferences: brokenReferences.length,
      orphanAssets: orphanAssets.length,
    },
  };

  fs.writeFileSync(path.join(process.cwd(), "cloudinary-asset-audit-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
}
