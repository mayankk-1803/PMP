import React from "react";

export function MetricCard({ label, value, note, icon }: { label: string; value: string | number; note: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          {icon}
        </div>
        <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
      </div>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  );
}
