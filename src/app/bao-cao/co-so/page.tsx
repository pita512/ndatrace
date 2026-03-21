"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const kpis = [
  { label: "Tổng cơ sở", value: "1,248", sub: "Đang hoạt động trên hệ thống", color: "text-blue-600" },
  { label: "Đã chứng nhận ATTP", value: "892", sub: "71.5% tổng số cơ sở", color: "text-green-600" },
  { label: "Chờ xét duyệt", value: "134", sub: "Đang xử lý hồ sơ", color: "text-amber-600" },
  { label: "Vi phạm / đình chỉ", value: "38", sub: "Cần xử lý ưu tiên", color: "text-red-600" },
];

const byProvince = [
  { tinh: "TP.HCM", so_co_so: 312, da_cn: 241, cho_duyet: 38, vi_pham: 12 },
  { tinh: "Hà Nội", so_co_so: 287, da_cn: 198, cho_duyet: 31, vi_pham: 9 },
  { tinh: "Đà Nẵng", so_co_so: 142, da_cn: 110, cho_duyet: 18, vi_pham: 4 },
  { tinh: "Cần Thơ", so_co_so: 98, da_cn: 74, cho_duyet: 12, vi_pham: 3 },
  { tinh: "Lâm Đồng", so_co_so: 86, da_cn: 61, cho_duyet: 10, vi_pham: 2 },
  { tinh: "Bình Dương", so_co_so: 78, da_cn: 58, cho_duyet: 8, vi_pham: 3 },
  { tinh: "Nghệ An", so_co_so: 64, da_cn: 44, cho_duyet: 9, vi_pham: 2 },
  { tinh: "Đồng Nai", so_co_so: 58, da_cn: 42, cho_duyet: 5, vi_pham: 1 },
  { tinh: "Hải Phòng", so_co_so: 52, da_cn: 35, cho_duyet: 3, vi_pham: 2 },
  { tinh: "Khác", so_co_so: 71, da_cn: 29, cho_duyet: 0, vi_pham: 0 },
];

const chartData = byProvince.map((r) => ({ name: r.tinh, "Đã chứng nhận": r.da_cn, "Chờ duyệt": r.cho_duyet, "Vi phạm": r.vi_pham }));

const loaiCoSo = [
  { loai: "Sản xuất thực phẩm", so_luong: 438, ty_le: "35.1%", trang_thai: "good" },
  { loai: "Kinh doanh thực phẩm", so_luong: 312, ty_le: "25.0%", trang_thai: "good" },
  { loai: "Dịch vụ ăn uống", so_luong: 254, ty_le: "20.4%", trang_thai: "good" },
  { loai: "Nhập khẩu thực phẩm", so_luong: 124, ty_le: "9.9%", trang_thai: "warning" },
  { loai: "Chế biến thủy sản", so_luong: 82, ty_le: "6.6%", trang_thai: "good" },
  { loai: "Chế biến nông sản", so_luong: 38, ty_le: "3.0%", trang_thai: "warning" },
];

const tableColumns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "so_co_so", label: "Tổng cơ sở", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{(row.so_co_so as number).toLocaleString()}</span> },
  { key: "da_cn", label: "Đã chứng nhận", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{(row.da_cn as number).toLocaleString()}</span> },
  { key: "cho_duyet", label: "Chờ duyệt", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{(row.cho_duyet as number).toLocaleString()}</span> },
  { key: "vi_pham", label: "Vi phạm", render: (row: Record<string, unknown>) => <span className="font-mono text-red-700">{(row.vi_pham as number).toLocaleString()}</span> },
  {
    key: "ty_le",
    label: "Tỷ lệ CN",
    render: (row: Record<string, unknown>) => {
      const pct = Math.round(((row.da_cn as number) / (row.so_co_so as number)) * 100);
      return <Badge variant={pct >= 75 ? "success" : pct >= 60 ? "warning" : "danger"}>{pct}%</Badge>;
    },
  },
];

const loaiColumns = [
  { key: "loai", label: "Loại cơ sở" },
  { key: "so_luong", label: "Số lượng", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{(row.so_luong as number).toLocaleString()}</span> },
  { key: "ty_le", label: "Tỷ lệ" },
  {
    key: "trang_thai",
    label: "Đánh giá",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Ổn định" : "Cần chú ý"}
      </Badge>
    ),
  },
];

const COLORS = ["#1570EF", "#F79009", "#F04438"];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo cơ sở</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê tình trạng cơ sở thực phẩm toàn quốc</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <p className="text-[14px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-[14px] text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Phân bổ cơ sở theo tỉnh / thành phố</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            {["Đã chứng nhận", "Chờ duyệt", "Vi phạm"].map((key, i) => (
              <Bar key={key} dataKey={key} stackId="a" fill={COLORS[i]} radius={i === 2 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Theo tỉnh / thành phố</h2>
          <DataTable columns={tableColumns} data={byProvince} />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Theo loại cơ sở</h2>
          <DataTable columns={loaiColumns} data={loaiCoSo} />
        </div>
      </div>
    </DashboardLayout>
  );
}
