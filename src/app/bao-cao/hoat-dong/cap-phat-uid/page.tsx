"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const statCards = [
  { label: "Tổng UID đã cấp", value: "1,284,560", color: "text-blue-600" },
  { label: "Đã sử dụng", value: "1,102,340", color: "text-green-600" },
  { label: "Chưa sử dụng", value: "182,220", color: "text-amber-600" },
  { label: "Tỷ lệ sử dụng", value: "85.8%", color: "text-purple-600" },
];

const categoryData = [
  { category: "Nông sản", uid: 420000, color: "#22c55e" },
  { category: "Thủy sản", uid: 310000, color: "#3b82f6" },
  { category: "Thực phẩm", uid: 280000, color: "#f59e0b" },
  { category: "Đồ uống", uid: 195000, color: "#8b5cf6" },
  { category: "Hàng nhập khẩu", uid: 79560, color: "#ef4444" },
];

const allocationBatches = [
  { id: "CP001", ten_dot: "Gạo ST25 hữu cơ - Q1/2026", danh_muc: "Nông sản", so_uid: 48200, da_su_dung: 45100, con_lai: 3100, ngay_cap: "02/01/2026", trang_thai: "active" },
  { id: "CP002", ten_dot: "Tôm sú đông lạnh - Q1/2026", danh_muc: "Thủy sản", so_uid: 120400, da_su_dung: 118900, con_lai: 1500, ngay_cap: "03/01/2026", trang_thai: "active" },
  { id: "CP003", ten_dot: "Cà phê Arabica - Lô xuất khẩu", danh_muc: "Nông sản", so_uid: 31800, da_su_dung: 28400, con_lai: 3400, ngay_cap: "05/01/2026", trang_thai: "active" },
  { id: "CP004", ten_dot: "Nước mắm Phú Quốc - Đợt 4", danh_muc: "Thực phẩm", so_uid: 75000, da_su_dung: 72000, con_lai: 3000, ngay_cap: "10/01/2026", trang_thai: "active" },
  { id: "CP005", ten_dot: "Xoài cát Hòa Lộc - Mùa vụ 2026", danh_muc: "Nông sản", so_uid: 28500, da_su_dung: 27900, con_lai: 600, ngay_cap: "15/01/2026", trang_thai: "depleted" },
  { id: "CP006", ten_dot: "Cá tra phi-lê - EU Export", danh_muc: "Thủy sản", so_uid: 95600, da_su_dung: 91000, con_lai: 4600, ngay_cap: "18/01/2026", trang_thai: "active" },
  { id: "CP007", ten_dot: "Nước dừa Bến Tre - Nhật Bản", danh_muc: "Đồ uống", so_uid: 210000, da_su_dung: 205000, con_lai: 5000, ngay_cap: "20/01/2026", trang_thai: "active" },
  { id: "CP008", ten_dot: "Sữa Mộc Châu - Tháng 1/2026", danh_muc: "Thực phẩm", so_uid: 380000, da_su_dung: 376000, con_lai: 4000, ngay_cap: "22/01/2026", trang_thai: "active" },
  { id: "CP009", ten_dot: "Bia Sài Gòn đặc sản - Tết", danh_muc: "Đồ uống", so_uid: 520000, da_su_dung: 520000, con_lai: 0, ngay_cap: "25/01/2026", trang_thai: "depleted" },
  { id: "CP010", ten_dot: "Bò Úc nhập khẩu - Lô 1/2026", danh_muc: "Hàng nhập khẩu", so_uid: 67800, da_su_dung: 60000, con_lai: 7800, ngay_cap: "01/02/2026", trang_thai: "active" },
  { id: "CP011", ten_dot: "Mật ong Kon Tum - Xuất khẩu EU", danh_muc: "Nông sản", so_uid: 9800, da_su_dung: 7200, con_lai: 2600, ngay_cap: "05/02/2026", trang_thai: "active" },
  { id: "CP012", ten_dot: "Vải thiều Bắc Giang - TQ Export", danh_muc: "Nông sản", so_uid: 41200, da_su_dung: 38000, con_lai: 3200, ngay_cap: "10/02/2026", trang_thai: "active" },
  { id: "CP013", ten_dot: "Tiêu đen Gia Lai - EU Export", danh_muc: "Nông sản", so_uid: 12400, da_su_dung: 10100, con_lai: 2300, ngay_cap: "15/02/2026", trang_thai: "active" },
  { id: "CP014", ten_dot: "Cá ngừ Đà Nẵng đóng hộp", danh_muc: "Thủy sản", so_uid: 89000, da_su_dung: 83000, con_lai: 6000, ngay_cap: "18/02/2026", trang_thai: "active" },
  { id: "CP015", ten_dot: "Nước ép cam Vinamilk - Q1", danh_muc: "Đồ uống", so_uid: 145000, da_su_dung: 138000, con_lai: 7000, ngay_cap: "22/02/2026", trang_thai: "active" },
];

const columns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "ten_dot", label: "Tên đợt cấp phát" },
  {
    key: "danh_muc",
    label: "Danh mục",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, "success" | "info" | "warning" | "neutral" | "danger"> = {
        "Nông sản": "success", "Thủy sản": "info", "Thực phẩm": "warning",
        "Đồ uống": "neutral", "Hàng nhập khẩu": "danger",
      };
      return <Badge variant={map[row.danh_muc as string] ?? "neutral"}>{row.danh_muc as string}</Badge>;
    },
  },
  { key: "so_uid", label: "Tổng UID", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.so_uid as number).toLocaleString()}</span> },
  { key: "da_su_dung", label: "Đã sử dụng", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{(row.da_su_dung as number).toLocaleString()}</span> },
  { key: "con_lai", label: "Còn lại", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{(row.con_lai as number).toLocaleString()}</span> },
  { key: "ngay_cap", label: "Ngày cấp" },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "active" ? "success" : "neutral"}>
        {row.trang_thai === "active" ? "Còn UID" : "Đã dùng hết"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Cấp phát UID</h1>
        <p className="text-sm text-gray-500 mt-1">Thống kê cấp phát mã định danh UID theo danh mục sản phẩm</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[13px] text-gray-500 mb-1">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">UID cấp phát theo danh mục sản phẩm</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} UID`, "Số lượng"]} />
            <Bar dataKey="uid" radius={[4, 4, 0, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Danh sách đợt cấp phát UID</h2>
        <DataTable columns={columns} data={allocationBatches} searchable searchKeys={["id", "ten_dot", "danh_muc"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
