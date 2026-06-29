"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/87564/admin/dashboard");
      router.refresh();
      return;
    }

    const result = await response.json().catch(() => ({ message: "Unable to login" }));
    setMessage(result.message || "Invalid credentials");
    setStatus("error");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-semibold">
        Email
        <input
          className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] outline-none focus:border-[#D32F2F]"
          placeholder="Admin email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input
          type="password"
          className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] outline-none focus:border-[#D32F2F]"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {message && <p className="rounded-lg bg-[#F3E7D7] px-3 py-2 text-sm text-[#8A4B22]">{message}</p>}
      <button disabled={status === "submitting"} className="w-full rounded-lg bg-[#D32F2F] px-4 py-3 text-sm font-black text-white disabled:opacity-60" type="submit">
        {status === "submitting" ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
