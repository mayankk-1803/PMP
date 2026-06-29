import React from "react";

export function MetricCard({ label, value, note, icon }: { label: string; value: string | number; note: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B6B63]">{label}</p>
          {icon}
        </div>
        <p className="mt-3 text-3xl font-black text-[#2B2B2B]">{value}</p>
      </div>
      <p className="mt-2 text-xs text-[#6B6B63]">{note}</p>
    </div>
  );
}
