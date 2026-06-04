import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-black">Admin Login</h1>
            <p className="text-sm text-slate-500">Protected endpoint: /api/admin/auth/login</p>
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
