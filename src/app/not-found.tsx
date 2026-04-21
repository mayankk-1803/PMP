"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fef2f2]">
      <h2 className="text-4xl font-extrabold text-[#dc2626] mb-4">404 - Not Found</h2>
      <p className="text-lg text-[#dc2626]/70 mb-8">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-[#dc2626] text-white rounded-lg font-bold">
        Return Home
      </Link>
    </div>
  );
}
