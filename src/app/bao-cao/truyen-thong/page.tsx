"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { label: "Tổng chiến dịch", value: "248", sub: "Triển khai từ đầu năm", color: "text-blue-600" },
  { label: "Đang triển khai", value: "42", sub: "Trên toàn quốc", color: "text-green-600" },
  { label: "Lượt tiếp cận", value: "4.2M", sub: "Tổng lượt xem / nghe", color: "text-purple-600" },
  { label: "Đã hoàn thành", value: "198", sub: "79.8% tổng chiến dịch", color: "text-teal-600" },
];

const byMonth = [
  { thang: "T10/25", chien_dich: 38, luot_tiep_can: 620 },
  { thang: "T11/25", chien_dich: 42, luot_tiep_can: 710 },
  { thang: "T12/25", chien_dich: 35, luot_tiep_can: 580 },
  { thang: "T1/26", chien_dich: 44, luot_tiep_can: 750 },
  { thang: "T2/26", chien_dich: 39, luot_tiep_can: 660 },
  { thang: "T3/26", chien_dich: 50, luot_tiep_can: 880 },
];

const data = [
  { tinh: "TP.HCM", so_cd: 54, dang_trien_khai: 10, da_hoan_thanh: 42, luot_tiep_can: "890K", kenh: "TV, Mạng xã hội", trang_thai: "good" },
  { tinh: "Hà Nội", so_cd: 48, dang_trien_khai: 9, da_hoan_thanh: 37, luot_tiep_can: "780K", kenh: "TV, Báo điện tử", trang_thai: "good" },
  { tinh: "Đà Nẵng", so_cd: 28, dang_trien_khai: 5, da_hoan_thanh: 22, luot_tiep_can: "420K", kenh: "Radio, Mạng xã hội", trang_thai: "good" },
  { tinh: "Cần Thơ", so_cd: 22, dang_trien_khai: 4, da_hoan_thanh: 17, luot_tiep_can: "310K", kenh: "TV, Tờ rơi", trang_thai: "good" },
  { tinh: "Lâm Đồng", so_cd: 18, dang_trien_khai: 3, da_hoan_thanh: 14, luot_tiep_can: "240K", kenh: "Radio, Tờ rơi", trang_thai: "warning" },
  { tinh: "Bình Dương", so_cd: 16, dang_trien_khai: 3, da_hoan_thanh: 12, luot_tiep_can: "198K", kenh: "Mạng xã hội", trang_thai: "good" },
  { tinh: "Nghệ An", so_cd: 14, dang_trien_khai: 2, da_hoan_thanh: 11, luot_tiep_can: "176K", kenh: "TV, Radio", trang_thai: "good" },
  { tinh: "Đồng Nai", so_cd: 12, dang_trien_khai: 2, da_hoan_thanh: 10, luot_tiep_can: "154K", kenh: "Báo điện tử", trang_thai: "good" },
  { tinh: "Hải Phòng", so_cd: 10, dang_trien_khai: 2, da_hoan_thanh: 8, luot_tiep_can: "132K", kenh: "TV, Tờ rơi", trang_thai: "warning" },
  { tinh: "Khánh Hòa", so_cd: 9, dang_trien_khai: 1, da_hoan_thanh: 7, luot_tiep_can: "118K", kenh: "Radio, Mạng xã hội", trang_thai: "good" },
];

const columns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "so_cd", label: "Tổng chiến dịch", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{String(row.so_cd)}</span> },
  { key: "dang_trien_khai", label: "Đang triển khai", render: (row: Record<string, unknown>) => <span className="font-mono text-blue-600">{String(row.dang_trien_khai)}</span> },
  { key: "da_hoan_thanh", label: "Hoàn thành", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{String(row.da_hoan_thanh)}</span> },
  { key: "luot_tiep_can", label: "Lượt tiếp cận" },
  { key: "kenh", label: "Kênh truyền thông" },
  {
    key: "trang_thai", label: "Đánh giá",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Hiệu quả" : "Cần tăng cường"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo truyền thông</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê hiệu quả truyền thông an toàn thực phẩm</p>
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
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Chiến dịch và lượt tiếp cận theo tháng (nghìn lượt)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="thang" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar yAxisId="left" dataKey="chien_dich" name="Chiến dịch" fill="#1570EF" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="luot_tiep_can" name="Lượt tiếp cận (K)" fill="#17B26A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Chi tiết theo tỉnh / thành phố</h2>
        <DataTable columns={columns} data={data} searchable searchKeys={["tinh", "kenh"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
