export function DataTable({ columns, rows }: { columns: string[]; rows: Array<Array<string | number | boolean | undefined>> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-bold">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-slate-500" colSpan={columns.length}>No records yet.</td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className="text-slate-700">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3">{String(cell ?? "")}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
