"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { label: "Tổng giấy ATTP", value: "892", sub: "Đã cấp toàn quốc", color: "text-blue-600" },
  { label: "Còn hiệu lực", value: "714", sub: "80.0% tổng số giấy", color: "text-green-600" },
  { label: "Sắp hết hạn (30 ngày)", value: "98", sub: "Cần gia hạn sớm", color: "text-amber-600" },
  { label: "Đã hết hạn", value: "80", sub: "Cần thu hồi hoặc gia hạn", color: "text-red-600" },
];

const byMonth = [
  { thang: "T10/25", cap_moi: 42, gia_han: 18, thu_hoi: 3 },
  { thang: "T11/25", cap_moi: 38, gia_han: 22, thu_hoi: 5 },
  { thang: "T12/25", cap_moi: 51, gia_han: 15, thu_hoi: 2 },
  { thang: "T1/26", cap_moi: 29, gia_han: 31, thu_hoi: 4 },
  { thang: "T2/26", cap_moi: 35, gia_han: 19, thu_hoi: 6 },
  { thang: "T3/26", cap_moi: 44, gia_han: 27, thu_hoi: 3 },
];

const data = [
  { tinh: "TP.HCM", cap_moi: 241, gia_han: 58, thu_hoi: 12, con_hl: 198, het_han: 19, trang_thai: "good" },
  { tinh: "Hà Nội", cap_moi: 198, gia_han: 44, thu_hoi: 9, con_hl: 162, het_han: 14, trang_thai: "good" },
  { tinh: "Đà Nẵng", cap_moi: 110, gia_han: 21, thu_hoi: 4, con_hl: 91, het_han: 8, trang_thai: "good" },
  { tinh: "Cần Thơ", cap_moi: 74, gia_han: 18, thu_hoi: 3, con_hl: 60, het_han: 7, trang_thai: "warning" },
  { tinh: "Lâm Đồng", cap_moi: 61, gia_han: 12, thu_hoi: 2, con_hl: 50, het_han: 6, trang_thai: "good" },
  { tinh: "Bình Dương", cap_moi: 58, gia_han: 10, thu_hoi: 3, con_hl: 46, het_han: 5, trang_thai: "good" },
  { tinh: "Nghệ An", cap_moi: 44, gia_han: 9, thu_hoi: 2, con_hl: 35, het_han: 4, trang_thai: "warning" },
  { tinh: "Đồng Nai", cap_moi: 42, gia_han: 8, thu_hoi: 1, con_hl: 37, het_han: 3, trang_thai: "good" },
];

const columns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "cap_moi", label: "Cấp mới", render: (row: Record<string, unknown>) => <span className="font-mono">{String(row.cap_moi)}</span> },
  { key: "gia_han", label: "Gia hạn", render: (row: Record<string, unknown>) => <span className="font-mono">{String(row.gia_han)}</span> },
  { key: "thu_hoi", label: "Thu hồi", render: (row: Record<string, unknown>) => <span className="font-mono text-red-600">{String(row.thu_hoi)}</span> },
  { key: "con_hl", label: "Còn hiệu lực", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{String(row.con_hl)}</span> },
  { key: "het_han", label: "Hết hạn", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{String(row.het_han)}</span> },
  {
    key: "trang_thai", label: "Đánh giá",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Tốt" : "Cần chú ý"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo giấy ATTP</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê cấp phát và hiệu lực giấy chứng nhận an toàn thực phẩm</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <p className="text-[14px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-[14px] text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Biến động giấy ATTP theo tháng</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="thang" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="cap_moi" name="Cấp mới" fill="#1570EF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gia_han" name="Gia hạn" fill="#17B26A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="thu_hoi" name="Thu hồi" fill="#F04438" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Chi tiết theo tỉnh / thành phố</h2>
        <DataTable columns={columns} data={data} searchable searchKeys={["tinh"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
