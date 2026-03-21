"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { label: "Tổng vụ ngộ độc", value: "184", sub: "Lũy kế từ đầu năm", color: "text-red-600" },
  { label: "Người bị ảnh hưởng", value: "2,341", sub: "Trung bình 12.7 người/vụ", color: "text-orange-600" },
  { label: "Đã xử lý xong", value: "162", sub: "88.0% tổng số vụ", color: "text-green-600" },
  { label: "Đang điều tra", value: "22", sub: "Cần theo dõi sát", color: "text-amber-600" },
];

const byMonth = [
  { thang: "T10/25", vu: 24, nguoi: 298 },
  { thang: "T11/25", vu: 18, nguoi: 214 },
  { thang: "T12/25", vu: 31, nguoi: 412 },
  { thang: "T1/26", vu: 22, nguoi: 287 },
  { thang: "T2/26", vu: 19, nguoi: 243 },
  { thang: "T3/26", vu: 70, nguoi: 887 },
];

const data = [
  { tinh: "TP.HCM", so_vu: 42, nguoi_bi_anh: 518, da_xl: 38, nguyen_nhan: "Thực phẩm đường phố", trang_thai: "warning" },
  { tinh: "Hà Nội", so_vu: 36, nguoi_bi_anh: 441, da_xl: 32, nguyen_nhan: "Bếp ăn tập thể", trang_thai: "warning" },
  { tinh: "Đà Nẵng", so_vu: 18, nguoi_bi_anh: 224, da_xl: 16, nguyen_nhan: "Thực phẩm chế biến", trang_thai: "good" },
  { tinh: "Cần Thơ", so_vu: 14, nguoi_bi_anh: 178, da_xl: 12, nguyen_nhan: "Hải sản tươi sống", trang_thai: "good" },
  { tinh: "Lâm Đồng", so_vu: 12, nguoi_bi_anh: 154, da_xl: 11, nguyen_nhan: "Rau củ quả", trang_thai: "good" },
  { tinh: "Bình Dương", so_vu: 11, nguoi_bi_anh: 142, da_xl: 10, nguyen_nhan: "Bếp ăn tập thể", trang_thai: "good" },
  { tinh: "Nghệ An", so_vu: 10, nguoi_bi_anh: 131, da_xl: 9, nguyen_nhan: "Thực phẩm đường phố", trang_thai: "good" },
  { tinh: "Đồng Nai", so_vu: 9, nguoi_bi_anh: 118, da_xl: 9, nguyen_nhan: "Thực phẩm chế biến", trang_thai: "good" },
  { tinh: "Hải Phòng", so_vu: 8, nguoi_bi_anh: 102, da_xl: 7, nguyen_nhan: "Hải sản tươi sống", trang_thai: "good" },
  { tinh: "Khánh Hòa", so_vu: 7, nguoi_bi_anh: 89, da_xl: 6, nguyen_nhan: "Thực phẩm đường phố", trang_thai: "warning" },
];

const columns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "so_vu", label: "Số vụ", render: (row: Record<string, unknown>) => <span className="font-mono font-medium text-red-600">{String(row.so_vu)}</span> },
  { key: "nguoi_bi_anh", label: "Người bị ảnh hưởng", render: (row: Record<string, unknown>) => <span className="font-mono">{String(row.nguoi_bi_anh)}</span> },
  { key: "da_xl", label: "Đã xử lý", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{String(row.da_xl)}</span> },
  { key: "nguyen_nhan", label: "Nguyên nhân chính" },
  {
    key: "trang_thai", label: "Mức độ",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Kiểm soát" : "Cần chú ý"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo ngộ độc</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê tình hình ngộ độc thực phẩm và công tác xử lý</p>
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
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Diễn biến ngộ độc theo tháng</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={byMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorVu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F04438" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#F04438" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="thang" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="vu" name="Số vụ" stroke="#F04438" fill="url(#colorVu)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Chi tiết theo tỉnh / thành phố</h2>
        <DataTable columns={columns} data={data} searchable searchKeys={["tinh", "nguyen_nhan"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
