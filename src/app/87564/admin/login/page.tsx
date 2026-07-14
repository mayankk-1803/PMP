import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import Image from "next/image";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4 text-[#2B2B2B]">
      <div className="w-full max-w-md rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="relative w-[220px] h-[70px]">
            <Image
              src="/pacmyproductlogo1.png"
              alt="PacMyProduct Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <div className="ml-auto text-right">
            <h1 className="text-xl font-black text-[#D32F2F]">Admin Login</h1>
            <p className="text-xs text-[#6B6B63]">Protected portal</p>
          </div>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
