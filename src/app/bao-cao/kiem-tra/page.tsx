"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { label: "Tổng đợt kiểm tra", value: "3,142", sub: "Lũy kế từ đầu năm", color: "text-blue-600" },
  { label: "Đạt yêu cầu", value: "2,718", sub: "86.5% tổng đợt kiểm tra", color: "text-green-600" },
  { label: "Vi phạm phát hiện", value: "312", sub: "9.9% tổng đợt kiểm tra", color: "text-red-600" },
  { label: "Đang xử lý", value: "112", sub: "Chờ kết quả xử phạt", color: "text-amber-600" },
];

const byMonth = [
  { thang: "T10/25", dat: 398, vi_pham: 42, dang_xl: 18 },
  { thang: "T11/25", dat: 421, vi_pham: 38, dang_xl: 22 },
  { thang: "T12/25", dat: 387, vi_pham: 51, dang_xl: 15 },
  { thang: "T1/26", dat: 445, vi_pham: 29, dang_xl: 31 },
  { thang: "T2/26", dat: 412, vi_pham: 35, dang_xl: 19 },
  { thang: "T3/26", dat: 655, vi_pham: 117, dang_xl: 7 },
];

const data = [
  { tinh: "TP.HCM", tong: 712, dat: 618, vi_pham: 72, xu_phat: 42, trang_thai: "good" },
  { tinh: "Hà Nội", tong: 634, dat: 551, vi_pham: 58, xu_phat: 31, trang_thai: "good" },
  { tinh: "Đà Nẵng", tong: 312, dat: 267, vi_pham: 31, xu_phat: 18, trang_thai: "good" },
  { tinh: "Cần Thơ", tong: 248, dat: 201, vi_pham: 28, xu_phat: 14, trang_thai: "warning" },
  { tinh: "Lâm Đồng", tong: 198, dat: 172, vi_pham: 18, xu_phat: 9, trang_thai: "good" },
  { tinh: "Bình Dương", tong: 187, dat: 158, vi_pham: 22, xu_phat: 12, trang_thai: "warning" },
  { tinh: "Nghệ An", tong: 162, dat: 138, vi_pham: 15, xu_phat: 7, trang_thai: "good" },
  { tinh: "Đồng Nai", tong: 144, dat: 125, vi_pham: 12, xu_phat: 6, trang_thai: "good" },
  { tinh: "Hải Phòng", tong: 132, dat: 113, vi_pham: 13, xu_phat: 5, trang_thai: "good" },
  { tinh: "Khánh Hòa", tong: 118, dat: 98, vi_pham: 11, xu_phat: 4, trang_thai: "warning" },
];

const columns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "tong", label: "Tổng đợt", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{String(row.tong)}</span> },
  { key: "dat", label: "Đạt yêu cầu", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{String(row.dat)}</span> },
  { key: "vi_pham", label: "Vi phạm", render: (row: Record<string, unknown>) => <span className="font-mono text-red-600">{String(row.vi_pham)}</span> },
  { key: "xu_phat", label: "Đã xử phạt", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{String(row.xu_phat)}</span> },
  {
    key: "ty_le", label: "Tỷ lệ đạt",
    render: (row: Record<string, unknown>) => {
      const pct = Math.round(((row.dat as number) / (row.tong as number)) * 100);
      return <Badge variant={pct >= 85 ? "success" : pct >= 75 ? "warning" : "danger"}>{pct}%</Badge>;
    },
  },
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
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo kiểm tra</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê kết quả kiểm tra an toàn thực phẩm theo địa bàn</p>
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
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Xu hướng kiểm tra theo tháng</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={byMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="thang" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="dat" name="Đạt yêu cầu" stroke="#17B26A" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="vi_pham" name="Vi phạm" stroke="#F04438" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="dang_xl" name="Đang xử lý" stroke="#F79009" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Chi tiết theo tỉnh / thành phố</h2>
        <DataTable columns={columns} data={data} searchable searchKeys={["tinh"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
