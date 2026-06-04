import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { cloudinary, assertCloudinaryConfigured } from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

const allowedMimeTypes = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error("Only jpg, jpeg, png, and webp images are allowed"));
      return;
    }
    cb(null, true);
  },
});

type MulterRequest = NextApiRequest & { files?: Express.Multer.File[] };

const runMiddleware = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) => {
    upload.array("files", 10)(req as any, res as any, (result: any) => {
      if (result instanceof Error) reject(result);
      else resolve();
    });
  });

const uploadBuffer = (file: Express.Multer.File, folder: string) =>
  new Promise<{ secure_url: string; public_id: string; width: number; height: number; bytes: number }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
          return;
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        });
      }
    );

    stream.end(file.buffer);
  });

export default async function handler(req: MulterRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    assertCloudinaryConfigured();
    await runMiddleware(req, res);

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const folder = typeof req.query.folder === "string" ? req.query.folder : "pacmyproduct/admin";
    const uploads = await Promise.all(files.map((file) => uploadBuffer(file, folder)));

    return res.status(200).json({ success: true, data: uploads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return res.status(400).json({ success: false, message });
  }
}
