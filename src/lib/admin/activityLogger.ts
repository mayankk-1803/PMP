import { connectMongoDB } from "@/lib/mongodb";
import { ActivityLogModel, AdminModel } from "@/models/cmsModels";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface AdminUserPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export async function getCurrentAdmin(): Promise<AdminUserPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("pmp_admin_access")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-access-secret") as {
      sub: string;
      role: string;
      email?: string;
    };

    await connectMongoDB();
    const admin = await AdminModel.findById(decoded.sub).lean<any>();
    return {
      id: decoded.sub,
      email: decoded.email || admin?.email || "",
      role: decoded.role || admin?.role || "VIEWER",
      name: admin?.name || "System Admin",
    };
  } catch {
    return null;
  }
}

export async function logActivity(options: {
  action: string;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  oldValue?: any;
  newValue?: any;
  req?: Request;
}) {
  try {
    await connectMongoDB();
    const admin = await getCurrentAdmin();
    
    let ipAddress = "127.0.0.1";
    if (options.req) {
      const forwarded = options.req.headers.get("x-forwarded-for");
      if (forwarded) {
        ipAddress = forwarded.split(",")[0].trim();
      }
    }

    await ActivityLogModel.create({
      userId: admin ? admin.id : undefined,
      userName: admin ? admin.name : "Anonymous",
      action: options.action,
      entityType: options.entityType,
      entityId: options.entityId,
      entityName: options.entityName,
      oldValue: options.oldValue,
      newValue: options.newValue,
      ipAddress,
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}
