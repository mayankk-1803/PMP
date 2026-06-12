// @ts-nocheck
{
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

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

function publicIdFromCloudinaryUrl(url) {
  if (!url || !url.includes("res.cloudinary.com")) return "";
  try {
    const parsed = new URL(url);
    const uploadIndex = parsed.pathname.indexOf("/upload/");
    if (uploadIndex === -1) return "";
    const afterUpload = parsed.pathname.slice(uploadIndex + "/upload/".length).split("/").filter(Boolean);
    const versionIndex = afterUpload.findIndex((part) => /^v\d+$/.test(part));
    const publicParts = afterUpload.slice(versionIndex >= 0 ? versionIndex + 1 : 0);
    if (!publicParts.length) return "";
    const publicPath = publicParts.join("/");
    return decodeURIComponent(publicPath.replace(/\.[a-zA-Z0-9]+$/, ""));
  } catch {
    return "";
  }
}

async function backfillCollection(db, collectionName, imageField) {
  const report = { collection: collectionName, updated: 0, skipped: 0, failed: 0, failures: [] };
  const docs = await db.collection(collectionName).find({
    [imageField]: { $type: "string", $regex: "res\\.cloudinary\\.com" },
    $or: [{ cloudinaryPublicId: { $exists: false } }, { cloudinaryPublicId: null }, { cloudinaryPublicId: "" }],
  }).toArray();

  for (const doc of docs) {
    const publicId = publicIdFromCloudinaryUrl(doc[imageField]);
    if (!publicId) {
      report.skipped += 1;
      continue;
    }

    try {
      await db.collection(collectionName).updateOne({ _id: doc._id }, { $set: { cloudinaryPublicId: publicId } });
      report.updated += 1;
    } catch (error) {
      report.failed += 1;
      report.failures.push({ id: String(doc._id), message: error.message || String(error) });
    }
  }

  return report;
}

async function main() {
  loadEnv();
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });

  const db = mongoose.connection.db;
  const results = {
    generatedAt: new Date().toISOString(),
    categories: await backfillCollection(db, "categories", "image"),
    subcategories: await backfillCollection(db, "subcategories", "image"),
  };

  await mongoose.disconnect();
  fs.writeFileSync(path.join(process.cwd(), "cloudinary-public-id-backfill-report.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
}
