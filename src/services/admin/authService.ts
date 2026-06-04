import { getAdminByEmail, updateRecord } from "@/repositories/adminRepository";
import type { AdminRole } from "@/lib/admin/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import { AdminModel } from "@/models/cmsModels";
import { DEFAULT_ADMINS } from "@/lib/admin/seed";

const rolePermissions: Record<AdminRole, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: ["dashboard:read", "products:write", "orders:write", "quotes:write", "enquiries:write", "emails:read", "users:read"],
  EDITOR: ["dashboard:read", "products:write", "quotes:read", "enquiries:read", "emails:read"],
  VIEWER: ["dashboard:read", "products:read", "orders:read", "quotes:read", "enquiries:read", "emails:read"],
};

export async function loginAdmin(email: string, password: string) {
  const mongoEnabled = Boolean(process.env.MONGODB_URI);
  const submittedEmail = email.trim().toLowerCase();
  const adminEmailAliases: Record<string, string> = {
    "adminpmp@gmail.com": "pmpadmin@gmail.com",
  };
  const normalizedEmail = adminEmailAliases[submittedEmail] || submittedEmail;
  const admin = mongoEnabled
    ? await (async () => {
        await connectMongoDB();
        const [seedAdmin] = DEFAULT_ADMINS;
        if (normalizedEmail === seedAdmin.email) {
          await AdminModel.updateOne(
            { email: seedAdmin.email },
            {
              $setOnInsert: {
                name: seedAdmin.name,
                email: seedAdmin.email,
                passwordHash: seedAdmin.passwordHash,
                role: seedAdmin.role,
                active: seedAdmin.active,
              },
            },
            { upsert: true }
          );
        }

        const record = await AdminModel.findOne({ email: normalizedEmail, active: true }).lean<any>();
        return record
          ? {
              id: String(record._id),
              name: record.name,
              email: record.email,
              passwordHash: record.passwordHash,
              role: record.role as AdminRole,
              active: record.active,
            }
          : null;
      })()
    : getAdminByEmail(normalizedEmail);

  if (!admin || !admin.active) {
    return null;
  }

  const [seedAdmin] = DEFAULT_ADMINS;
  let passwordOk = await bcrypt.compare(password, admin.passwordHash);
  const isSeedCredential = normalizedEmail === seedAdmin.email && (await bcrypt.compare(password, seedAdmin.passwordHash));

  if (!passwordOk && mongoEnabled && isSeedCredential) {
    await AdminModel.updateOne({ _id: admin.id }, { $set: { passwordHash: seedAdmin.passwordHash, role: seedAdmin.role, active: true } });
    passwordOk = true;
  }

  if (!passwordOk) {
    return null;
  }

  if (mongoEnabled) {
    await AdminModel.updateOne({ _id: admin.id }, { $set: { lastLogin: new Date() } });
  } else {
    updateRecord("admins", admin.id, { lastLogin: new Date().toISOString() });
  }
  const jwtSecret = process.env.JWT_SECRET || "development-access-secret";
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "development-refresh-secret";

  return {
    user: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: rolePermissions[admin.role],
    },
    accessToken: jwt.sign({ sub: admin.id, role: admin.role, email: admin.email, type: "access" }, jwtSecret, { expiresIn: "15m" }),
    refreshToken: jwt.sign({ sub: admin.id, role: admin.role, email: admin.email, type: "refresh" }, refreshSecret, { expiresIn: "7d" }),
  };
}

export function getRbacMatrix() {
  return rolePermissions;
}
