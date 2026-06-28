export function DataTable({ columns, rows }: { columns: string[]; rows: Array<Array<string | number | boolean | undefined>> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#DDD5C8] bg-[#FFFDF8] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-[#F8F5EF] text-xs uppercase tracking-wider text-[#6B6B63]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-bold">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD5C8]">
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-[#6B6B63]" colSpan={columns.length}>No records yet.</td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className="text-[#4E583F]">
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
