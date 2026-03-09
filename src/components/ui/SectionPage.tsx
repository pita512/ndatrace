"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import { ReactNode } from "react";
import { Plus, Download, Filter } from "lucide-react";

interface SectionPageProps {
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string | number; variant?: "success" | "warning" | "danger" | "info" | "neutral" }[];
  tableColumns: { key: string; label: string; render?: (row: Record<string, unknown>) => ReactNode; width?: string }[];
  tableData: Record<string, unknown>[];
  searchKeys?: string[];
  addLabel?: string;
}

export default function SectionPage({
  title,
  subtitle,
  stats,
  tableColumns,
  tableData,
  searchKeys = [],
  addLabel = "Thêm mới",
}: SectionPageProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors">
            <Filter size={14} /> Lọc
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors">
            <Download size={14} /> Xuất
          </button>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl px-4 py-2 transition-colors">
            <Plus size={14} /> {addLabel}
          </button>
        </div>
      </div>

      {stats && (
        <div className="flex items-center gap-3 mb-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
              <p className="text-[13px] text-gray-500">{s.label}</p>
              <Badge variant={s.variant}>{s.value}</Badge>
            </div>
          ))}
        </div>
      )}

      <DataTable
        columns={tableColumns}
        data={tableData}
        searchable={searchKeys.length > 0}
        searchKeys={searchKeys as never[]}
      />
    </DashboardLayout>
  );
}
