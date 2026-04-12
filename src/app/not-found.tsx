"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F9FAFB]">
      <h2 className="text-4xl font-extrabold text-[#1E3A5F] mb-4">404 - Not Found</h2>
      <p className="text-lg text-[#1E3A5F]/70 mb-8">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-[#1E3A5F] text-white rounded-lg font-bold">
        Return Home
      </Link>
    </div>
  );
}
