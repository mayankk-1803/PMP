import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5EF] px-4 text-[#2B2B2B]">
      <div className="w-full max-w-md rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#6E7757]">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-black">Admin Login</h1>
            <p className="text-sm text-[#6B6B63]">Protected endpoint: /api/admin/auth/login</p>
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
