"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Search, ArrowLeft, ArrowRight, Loader2, Info } from "lucide-react";

interface LogRecord {
  id: string;
  userId?: string;
  userName: string;
  action: string;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress: string;
  createdAt: string;
}

interface FilterOptions {
  actions: string[];
  users: string[];
  entityTypes: string[];
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(20);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    actions: [],
    users: [],
    entityTypes: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<LogRecord | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        user: selectedUser,
        action: selectedAction,
        entityType: selectedEntityType,
        startDate,
        endDate,
      });

      const res = await fetch(`/api/admin/activity-logs?${params.toString()}`);
      const result = await res.json();
      if (result.success && result.data) {
        setLogs(result.data.logs);
        setTotal(result.data.total);
        setPages(result.data.pages);
        setFilterOptions(result.data.filters);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedUser, selectedAction, selectedEntityType, startDate, endDate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const handleReset = () => {
    setSearch("");
    setSelectedUser("");
    setSelectedAction("");
    setSelectedEntityType("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <AdminShell title="System Activity Logs" subtitle="Security audit trail tracking user changes, login/logout sessions, imports/exports, and catalog operations.">
      <div className="space-y-6">
        
        {/* Filters Panel */}
        <div className="rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-5 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
            
            {/* Search Input */}
            <div className="xl:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Search Logs</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#9A9387]" />
                <input
                  type="text"
                  placeholder="Search user, action, entity name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] pl-9 pr-3 py-2 text-sm outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F]"
                />
              </div>
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">User</label>
              <select
                value={selectedUser}
                onChange={(e) => { setSelectedUser(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]"
              >
                <option value="">All Users</option>
                {filterOptions.users.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* Action Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Action</label>
              <select
                value={selectedAction}
                onChange={(e) => { setSelectedAction(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]"
              >
                <option value="">All Actions</option>
                {filterOptions.actions.map((act) => (
                  <option key={act} value={act}>{act}</option>
                ))}
              </select>
            </div>

            {/* Entity Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Type</label>
              <select
                value={selectedEntityType}
                onChange={(e) => { setSelectedEntityType(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]"
              >
                <option value="">All Types</option>
                {filterOptions.entityTypes.map((et) => (
                  <option key={et} value={et}>{et}</option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">From Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">To Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]"
              />
            </div>

          </form>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleReset}
              className="rounded-lg border border-[#F5C2C2] px-4 py-2 text-xs font-bold text-[#C62828] hover:bg-[#FAF9F6]"
            >
              Reset Filters
            </button>
            <button
              onClick={handleSearchSubmit}
              className="rounded-lg bg-[#C62828] px-4 py-2 text-xs font-bold text-white hover:bg-[#3F4734]"
            >
              Apply Search
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-hidden rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#FAF9F6] text-xs uppercase tracking-wider text-[#6B6B63]">
                <tr>
                  <th className="px-5 py-4 font-bold">Timestamp</th>
                  <th className="px-5 py-4 font-bold">User</th>
                  <th className="px-5 py-4 font-bold">Action</th>
                  <th className="px-5 py-4 font-bold">Entity Type</th>
                  <th className="px-5 py-4 font-bold">Entity Name</th>
                  <th className="px-5 py-4 font-bold">IP Address</th>
                  <th className="px-5 py-4 font-bold">Changes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E1D5]">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-[#9A9387]">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-[#D32F2F]" />
                        <span>Querying activity log database...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-[#9A9387]">
                      No matching audit records found.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAF9F6]/70 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-[#6B6B63]">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-[#2B2B2B]">
                        {log.userName}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                          log.action.includes("CREATE") ? "bg-[#FDECEC] text-[#D32F2F] border border-[#F5C2C2]" :
                          log.action.includes("DELETE") ? "bg-[#F3E7D7] text-[#8A4B22] border border-[#EAD7C8]" :
                          log.action.includes("RESTORE") ? "bg-cyan-50 text-cyan-700 border border-cyan-100" :
                          "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-[#6B6B63] font-medium">{log.entityType || "-"}</td>
                      <td className="px-5 py-4 text-[#2B2B2B] font-semibold">{log.entityName || "-"}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-[#6B6B63]">{log.ipAddress}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {(log.oldValue || log.newValue) ? (
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-2.5 py-1.5 text-xs font-bold text-[#C62828] hover:bg-[#FAF9F6] shadow-sm"
                          >
                            <Info className="h-3.5 w-3.5 text-[#8A6A3B]" /> View JSON
                          </button>
                        ) : (
                          <span className="text-[#9A9387] text-xs">No payload</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && pages > 1 && (
            <div className="flex items-center justify-between border-t border-[#F5C2C2] bg-[#FAF9F6] px-5 py-4">
              <span className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider">
                Total Logs: {total} (Page {page} of {pages})
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1.5 text-xs font-bold text-[#C62828] shadow-sm hover:bg-[#FAF9F6] disabled:opacity-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </button>
                <button
                  disabled={page === pages}
                  onClick={() => setPage(p => Math.min(pages, p + 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1.5 text-xs font-bold text-[#C62828] shadow-sm hover:bg-[#FAF9F6] disabled:opacity-50"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* JSON Payload Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E5DED2] pb-3">
              <div>
                <h3 className="text-base font-black text-[#2B2B2B]">Audit Log Payload Detail</h3>
                <p className="text-xs text-[#6B6B63] mt-1">{selectedLog.action} &bull; {selectedLog.userName}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg border border-[#F5C2C2] p-2 text-xs font-bold hover:bg-[#FAF9F6]"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-4 text-xs font-mono">
              {selectedLog.oldValue != null && (
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#D32F2F]">Previous State (oldValue):</div>
                  <pre className="rounded-lg bg-[#FAF9F6] p-4 overflow-x-auto text-[#C62828] border border-[#E9E1D5] max-h-56">
                    {JSON.stringify(selectedLog.oldValue, null, 2)}
                  </pre>
                </div>
              )}
              {selectedLog.newValue != null && (
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#D32F2F]">New State (newValue):</div>
                  <pre className="rounded-lg bg-[#FAF9F6] p-4 overflow-x-auto text-[#C62828] border border-[#E9E1D5] max-h-56">
                    {JSON.stringify(selectedLog.newValue, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
