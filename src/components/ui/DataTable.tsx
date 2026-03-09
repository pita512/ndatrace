"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type SortDir = "asc" | "desc" | null;

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
}

function smartCompare(a: unknown, b: unknown): number {
  // Numeric
  const na = Number(a), nb = Number(b);
  if (!isNaN(na) && !isNaN(nb)) return na - nb;
  // Date strings (dd/mm/yyyy hh:mm or yyyy-mm-dd)
  const da = new Date(String(a)), db = new Date(String(b));
  if (!isNaN(da.getTime()) && !isNaN(db.getTime())) return da.getTime() - db.getTime();
  // Locale string (alphabetical, supports Vietnamese)
  return String(a ?? "").localeCompare(String(b ?? ""), "vi", { sensitivity: "base" });
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = true,
  searchKeys = [],
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const perPage = 10;

  // Cycle: null → asc → desc → null
  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  const filtered = query
    ? data.filter((row) =>
        searchKeys.some((k) =>
          String(row[k] ?? "").toLowerCase().includes(query.toLowerCase())
        )
      )
    : data;

  const sorted =
    sortKey && sortDir
      ? [...filtered].sort((a, b) => {
          const cmp = smartCompare(a[sortKey], b[sortKey]);
          return sortDir === "asc" ? cmp : -cmp;
        })
      : filtered;

  const total = sorted.length;
  const pages = Math.ceil(total / perPage);
  const slice = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Tìm kiếm..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-gray-200 transition-colors"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
              {columns.map((col) => {
                const key = String(col.key);
                const isActive = sortKey === key;
                const isSortable = col.sortable !== false; // sortable by default

                return (
                  <th
                    key={key}
                    style={{ width: col.width }}
                    className={`text-left px-5 py-3 ${isSortable ? "cursor-pointer select-none" : ""}`}
                    onClick={() => isSortable && handleSort(key)}
                  >
                    <div className="flex items-center gap-1.5 group">
                      <span className={`text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                        isActive ? "text-brand-600 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {col.label}
                      </span>
                      {isSortable && (
                        <span className={`transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                          {!isActive || sortDir === null ? (
                            <ArrowUpDown size={12} className="text-gray-400" />
                          ) : sortDir === "asc" ? (
                            <ArrowUp size={12} className="text-brand-500" />
                          ) : (
                            <ArrowDown size={12} className="text-brand-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-5 py-3.5 text-gray-700 dark:text-gray-300">
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {slice.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-gray-400 text-sm">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-[13px] text-gray-500">
            {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} / {total} bản ghi
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`min-w-[28px] h-7 rounded-lg text-[13px] font-medium transition-colors ${
                  p === page ? "bg-brand-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
